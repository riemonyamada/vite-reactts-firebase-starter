/* eslint-disable import/no-extraneous-dependencies, import/no-default-export */
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import viteSentry from 'vite-plugin-sentry';
import reactRefresh from '@vitejs/plugin-react-refresh';
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
      reactRefresh(),
      react({
        jsxImportSource: '@emotion/react',
        babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] },
      }),
      VitePWA({
        includeAssets: ['favicon.svg', 'robots.txt'],
        manifest: {
          name: 'vite-reactts-firebase-starter',
          short_name: 'vite-reactts-firebase-starter',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png', // <== don't add slash, for testing
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png', // <== don't remove slash, for testing
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png', // <== don't add slash, for testing
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),
      viteSentry({
        authToken: env.SENTRY_AUTH_TOKEN,
        org: env.SENTRY_ORG,
        project: env.VITE_SENTRY_PROJECT,
        release: `${env.VITE_SENTRY_PROJECT}@${process.env.npm_package_version}`,
        deploy: {
          env: env.NODE_ENV,
        },
        setCommits: {},
        sourceMaps: {
          include: ['./dist'],
        },
      }),
      visualizer({
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
