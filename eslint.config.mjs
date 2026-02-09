import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "DOC/**",
  ]),

  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/ds/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/ds/*", "@/ds/**"],
              message: "Import UI only from '@/ds' (single public entry).",
            },
          ],
        },
      ],
    },
  },

  {
    files: ["src/ds/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='style']",
          message: "Do not use inline styles in DS. Use CSS classes + CSS variables set via refs if needed.",
        },
      ],
    },
  },
]);

export default eslintConfig;
