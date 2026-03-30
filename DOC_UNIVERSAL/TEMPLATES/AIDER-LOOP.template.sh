#!/usr/bin/env bash

set -euo pipefail

TASK_FILE="${TASK_FILE:-docs/TASKS.md}"
TASK_QUEUE_FILE="${TASK_QUEUE_FILE:-}"
VERIFY_COMMAND="${VERIFY_COMMAND:-npm run verify}"
SLEEP_SECONDS="${SLEEP_SECONDS:-300}"
ALLOW_MAIN="${ALLOW_MAIN:-false}"
COMMIT_PREFIX="${COMMIT_PREFIX:-chore(ai): complete}"

get_task_files() {
  if [[ -n "$TASK_QUEUE_FILE" ]]; then
    while IFS= read -r line; do
      [[ -z "$line" ]] && continue
      [[ "$line" =~ ^[[:space:]]*# ]] && continue
      printf '%s\n' "$line"
    done < "$TASK_QUEUE_FILE"
  else
    printf '%s\n' "$TASK_FILE"
  fi
}

get_next_task_info() {
  awk '
    /^## T[0-9]+ - / {
      if (task != "" && status != "" && status != "done") {
        print task "|" status "|" title
        exit
      }
      task = $2
      title = $0
      sub(/^## T[0-9]+ - /, "", title)
      status = ""
      next
    }
    /^- Status: `/ {
      if (task != "") {
        split($0, parts, "`")
        status = parts[2]
      }
    }
    END {
      if (task != "" && status != "" && status != "done") {
        print task "|" status "|" title
      }
    }
  ' "$1"
}

get_task_status() {
  awk -v target="$2" '
    /^## T[0-9]+ - / {
      task = $2
      next
    }
    /^- Status: `/ {
      if (task == target) {
        split($0, parts, "`")
        print parts[2]
        exit
      }
    }
  ' "$1"
}

read -r -d '' AIDER_PROMPT <<'EOF' || true
Read the active TASKS file and implement exactly the next unfinished task.
Follow DOC_UNIVERSAL core rules.
Respect the protected Design System and assume DS policy is consume-only unless the task explicitly approves a DS change.
Update the task notes with what changed and what verification passed.
Stop if the task is ambiguous, blocked, or would broaden scope.
EOF

branch="$(git branch --show-current)"

if [[ -z "$branch" ]]; then
  echo "No active git branch found."
  exit 1
fi

if [[ "$branch" == "main" && "$ALLOW_MAIN" != "true" ]]; then
  echo "Refusing to run on main. Use a feature branch or set ALLOW_MAIN=true intentionally."
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree is not clean. Commit, stash, or discard changes before starting the loop."
  exit 1
fi

mapfile -t task_files < <(get_task_files)

for current_task_file in "${task_files[@]}"; do
  if [[ ! -f "$current_task_file" ]]; then
    echo "Task file not found: $current_task_file"
    exit 1
  fi

  while true; do
    next_task_info="$(get_next_task_info "$current_task_file")"

    if [[ -z "$next_task_info" ]]; then
      echo "Task file complete: $current_task_file"
      break
    fi

    IFS='|' read -r task_id task_status task_title <<< "$next_task_info"

    if [[ "$task_status" == "blocked" ]]; then
      echo "Next task is blocked in $current_task_file: $task_id"
      exit 1
    fi

    current_prompt=$(cat <<EOF
Read the task file: $current_task_file
Implement exactly task $task_id: $task_title
Follow DOC_UNIVERSAL core rules.
Respect the protected Design System and assume DS policy is consume-only unless the task explicitly approves a DS change.
Complete the task fully, update the task notes, and mark it done only if the done criteria and verification are satisfied.
If the task cannot be completed safely, mark it blocked and explain why.
EOF
)

    echo "Running Aider on $current_task_file :: $task_id"
    aider --message "$current_prompt"

    if ! bash -lc "$VERIFY_COMMAND"; then
      echo "Verification failed. Asking Aider to repair the failing build or quality gates for $task_id."

      aider --message "Fix the failing build or verification gates for task $task_id in $current_task_file. Preserve DOC_UNIVERSAL rules, the route map, the API map, and the protected DS policy."

      if ! bash -lc "$VERIFY_COMMAND"; then
        echo "Verification still failing after repair attempt. Stopping for manual review."
        exit 1
      fi
    fi

    updated_status="$(get_task_status "$current_task_file" "$task_id")"

    if [[ "$updated_status" == "blocked" ]]; then
      echo "Task $task_id is blocked after execution. Stopping for manual review."
      exit 1
    fi

    if [[ "$updated_status" != "done" ]]; then
      echo "Task $task_id was not marked done after execution. Stopping for manual review."
      exit 1
    fi

    git add -A

    if git diff --cached --quiet; then
      echo "Task $task_id was marked done but no staged changes were found. Stopping for manual review."
      exit 1
    fi

    git commit -m "$COMMIT_PREFIX $task_id"
    echo "Committed local progress for $task_id from $current_task_file."
    echo "No push will happen automatically. Perform visual review before any manual push."

    sleep "$SLEEP_SECONDS"
  done
done