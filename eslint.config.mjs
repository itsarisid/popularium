import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: ['dist'] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ['**/ui/**/*.ts', '**/ui/**/*.tsx', '**/context/theme-provider.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  }
];

export default eslintConfig;
