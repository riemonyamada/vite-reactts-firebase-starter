/* eslint-disable import/no-extraneous-dependencies, import/no-default-export */
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteSentry from 'vite-plugin-sentry';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), '') };

  return {
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
      viteSentry({
        authToken: env.SENTRY_AUTH_TOKEN,
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        release: `${env.SENTRY_PROJECT}@${process.env.npm_package_version}`,
        deploy: {
          env: env.MODE,
        },
        setCommits: {},
        sourceMaps: {
          include: ['./dist'],
        },
      }),
    ],
    build: {
      sourcemap: 'hidden',
    },
  };
});
