/* eslint-disable import/no-extraneous-dependencies, import/no-default-export */
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteSentry from 'vite-plugin-sentry';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import { visualizer } from 'rollup-plugin-visualizer';

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
        babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] },
      }),
      viteSentry({
        authToken: env.SENTRY_AUTH_TOKEN,
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        release: `${env.SENTRY_PROJECT}@${process.env.npm_package_version}`,
        deploy: {
          env: env.NODE_ENV,
        },
        setCommits: {},
        sourceMaps: {
          include: ['./dist'],
        },
      }),
      visualizer({
        open: true,
        filename: '.cache/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    build: {
      sourcemap: 'hidden',
    },
  };
});
