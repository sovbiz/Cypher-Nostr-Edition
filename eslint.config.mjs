import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,vue}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
  // Global ignore patterns
  {
    ignores: [
      '**/node_modules/**',  // Ignore node_modules
      '**/dist/**',          // Ignore build directory
      '**/.nuxt/**',         // Ignore Nuxt build directory
      '**/public/**',        // Ignore public assets
      '**/*.min.js',         // Ignore all minified files
      '**/src/**/vendor.js',  // Ignore specific files in subdirectories
      '**/tailwind.config.js'
    ]
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];