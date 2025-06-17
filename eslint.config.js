import js from "@eslint/js";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    rules: {
      "prettier/prettier": [
        "error",
        {
          trailingComma: "es5",
        },
      ],
    },
  },
  {
    ignores: ["node_modules", "dist", "build"],
  },
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.node },
  },
]);
