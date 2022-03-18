/* eslint-disable import/no-extraneous-dependencies, import/no-default-export */
import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  define: { APP_VERSION: JSON.stringify(process.env.npm_package_version) },
  resolve: {
    // use @src instead of @ until the below change will be marged.
    // https://github.com/import-js/eslint-plugin-import/pull/2334
    alias: [
      {
        find: '@src',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
});
