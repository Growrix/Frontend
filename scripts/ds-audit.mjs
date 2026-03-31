import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();

const tokenFile = path.join(repoRoot, "src/ds/styles/ds.tokens.css");
const targets = [
  "src/ds/styles/ds.components.css",
  "src/ds/styles/ds.base.css",
  "src/ds/styles/ds.utilities.css",
  "src/ds/styles/ds.theme.css",
].map((p) => path.join(repoRoot, p));

const rules = [
  {
    id: "hardcoded-hex",
    description: "Hex colors should be tokens (except in ds.tokens.css).",
    pattern: /#[0-9a-fA-F]{3,8}/g,
  },
  {
    id: "hardcoded-rgb",
    description: "rgb()/rgba() should be token-driven (prefer var() / color-mix()) unless explicitly documented.",
    pattern: /\brgba?\(/g,
  },
];

function isTokenDrivenRgbCall(text, index) {
  // Allow token-driven patterns like: rgb(var(--ds-color-accent-rgb) / 0.16)
  // and also tolerate optional whitespace.
  const window = text.slice(index, index + 40);
  return /^rgba?\(\s*var\(--/i.test(window);
}

function getLineNumber(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (text.charCodeAt(i) === 10) line++;
  }
  return line;
}

const tokenText = await fs.readFile(tokenFile, "utf8");
const definedTokens = new Set(Array.from(tokenText.matchAll(/(--ds-[a-z0-9-]+)\s*:/gi), (match) => match[1]));

function reportFinding(rel, line, ruleId, snippet) {
  hasFindings = true;
  console.log(`${rel}:${line} [${ruleId}] ${snippet}`);
}

let hasFindings = false;

for (const filePath of targets) {
  const rel = path.relative(repoRoot, filePath).replaceAll("\\", "/");
  const text = await fs.readFile(filePath, "utf8");

  for (const rule of rules) {
    for (const match of text.matchAll(rule.pattern)) {
      const idx = match.index ?? 0;

      if (rule.id === "hardcoded-rgb" && isTokenDrivenRgbCall(text, idx)) {
        continue;
      }

      const line = getLineNumber(text, idx);
      const snippet = (match[0] ?? "").slice(0, 80);
      reportFinding(rel, line, rule.id, snippet);
    }
  }

  for (const match of text.matchAll(/var\(\s*(--ds-[a-z0-9-]+)/gi)) {
    const tokenName = match[1];
    if (definedTokens.has(tokenName)) {
      continue;
    }

    const idx = match.index ?? 0;
    const line = getLineNumber(text, idx);
    reportFinding(rel, line, "undefined-token", tokenName);
  }
}

if (hasFindings) {
  process.exitCode = 1;
}
