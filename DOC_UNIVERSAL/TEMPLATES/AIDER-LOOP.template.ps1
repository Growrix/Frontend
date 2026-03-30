$TaskFile = if ($env:TASK_FILE) { $env:TASK_FILE } else { "docs/TASKS.md" }
$TaskQueueFile = if ($env:TASK_QUEUE_FILE) { $env:TASK_QUEUE_FILE } else { "" }
$VerifyCommand = if ($env:VERIFY_COMMAND) { $env:VERIFY_COMMAND } else { "npm run verify" }
$SleepSeconds = if ($env:SLEEP_SECONDS) { [int]$env:SLEEP_SECONDS } else { 300 }
$AllowMain = if ($env:ALLOW_MAIN) { $env:ALLOW_MAIN -eq "true" } else { $false }
$CommitPrefix = if ($env:COMMIT_PREFIX) { $env:COMMIT_PREFIX } else { "chore(ai): complete" }

function Get-TaskFiles {
    if ($TaskQueueFile) {
        return Get-Content $TaskQueueFile | Where-Object {
            $_.Trim() -and -not $_.Trim().StartsWith("#")
        }
    }

    return @($TaskFile)
}

function Get-NextTaskInfo {
    param([string]$Path)

    $currentTask = $null
    $currentTitle = $null
    $currentStatus = $null

    foreach ($line in Get-Content $Path) {
        if ($line -match '^##\s+(T\d+)\s+-\s+(.*)$') {
            if ($currentTask -and $currentStatus -and $currentStatus -ne 'done') {
                return [pscustomobject]@{ Id = $currentTask; Title = $currentTitle; Status = $currentStatus }
            }

            $currentTask = $matches[1]
            $currentTitle = $matches[2].Trim()
            $currentStatus = $null
            continue
        }

        if ($line -match '^- Status: `([^`]+)`' -and $currentTask) {
            $currentStatus = $matches[1]
        }
    }

    if ($currentTask -and $currentStatus -and $currentStatus -ne 'done') {
        return [pscustomobject]@{ Id = $currentTask; Title = $currentTitle; Status = $currentStatus }
    }

    return $null
}

function Get-TaskStatus {
    param(
        [string]$Path,
        [string]$TaskId
    )

    $currentTask = $null
    foreach ($line in Get-Content $Path) {
        if ($line -match '^##\s+(T\d+)\s+-\s+(.*)$') {
            $currentTask = $matches[1]
            continue
        }

        if ($currentTask -eq $TaskId -and $line -match '^- Status: `([^`]+)`') {
            return $matches[1]
        }
    }

    return $null
}

$branch = (git branch --show-current).Trim()

if (-not $branch) {
    Write-Host "No active git branch found."
    exit 1
}

if ($branch -eq "main" -and -not $AllowMain) {
    Write-Host "Refusing to run on main. Use a feature branch or set ALLOW_MAIN=true intentionally."
    exit 1
}

git diff --quiet
$workingTreeClean = ($LASTEXITCODE -eq 0)
git diff --cached --quiet
$indexClean = ($LASTEXITCODE -eq 0)

if (-not $workingTreeClean -or -not $indexClean) {
    Write-Host "Working tree is not clean. Commit, stash, or discard changes before starting the loop."
    exit 1
}

foreach ($CurrentTaskFile in Get-TaskFiles) {
    if (-not (Test-Path $CurrentTaskFile)) {
        Write-Host "Task file not found: $CurrentTaskFile"
        exit 1
    }

    while ($true) {
        $NextTask = Get-NextTaskInfo -Path $CurrentTaskFile
        if (-not $NextTask) {
            Write-Host "Task file complete: $CurrentTaskFile"
            break
        }

        if ($NextTask.Status -eq 'blocked') {
            Write-Host "Next task is blocked in $CurrentTaskFile: $($NextTask.Id)"
            exit 1
        }

        $AiderPrompt = @"
Read the task file: $CurrentTaskFile
Implement exactly task $($NextTask.Id): $($NextTask.Title)
Follow DOC_UNIVERSAL core rules.
Respect the protected Design System and assume DS policy is consume-only unless the task explicitly approves a DS change.
Complete the task fully, update the task notes, and mark it done only if the done criteria and verification are satisfied.
If the task cannot be completed safely, mark it blocked and explain why.
"@

        Write-Host "Running Aider on $CurrentTaskFile :: $($NextTask.Id)"
        aider --message $AiderPrompt
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Aider command failed. Stopping for manual review."
            exit 1
        }

        cmd /c $VerifyCommand
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Verification failed. Asking Aider to repair the failing build or quality gates for $($NextTask.Id)."

            aider --message "Fix the failing build or verification gates for task $($NextTask.Id) in $CurrentTaskFile. Preserve DOC_UNIVERSAL rules, the route map, the API map, and the protected DS policy."
            if ($LASTEXITCODE -ne 0) {
                Write-Host "Aider repair command failed. Stopping for manual review."
                exit 1
            }

            cmd /c $VerifyCommand
            if ($LASTEXITCODE -ne 0) {
                Write-Host "Verification still failing after repair attempt. Stopping for manual review."
                exit 1
            }
        }

        $UpdatedStatus = Get-TaskStatus -Path $CurrentTaskFile -TaskId $NextTask.Id
        if ($UpdatedStatus -eq 'blocked') {
            Write-Host "Task $($NextTask.Id) is blocked after execution. Stopping for manual review."
            exit 1
        }

        if ($UpdatedStatus -ne 'done') {
            Write-Host "Task $($NextTask.Id) was not marked done after execution. Stopping for manual review."
            exit 1
        }

        git add -A
        git diff --cached --quiet
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Task $($NextTask.Id) was marked done but no staged changes were found. Stopping for manual review."
            exit 1
        }

        git commit -m "$CommitPrefix $($NextTask.Id)"
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Git commit failed. Stopping for manual review."
            exit 1
        }

        Write-Host "Committed local progress for $($NextTask.Id) from $CurrentTaskFile."
        Write-Host "No push will happen automatically. Perform visual review before any manual push."
        Start-Sleep -Seconds $SleepSeconds
    }
}