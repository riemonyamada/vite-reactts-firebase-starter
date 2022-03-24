import type { FirebaseOptions } from 'firebase/app';

type DefaultConfig = {
  firebaseOptions: FirebaseOptions;
  firebaseAppCheckDebugToken: string | boolean;
  reCaptchaSiteKey: string;
};

const projectId = import.meta.env.VITE_FB_PROJECT_ID;
export const defaultConfig: DefaultConfig = {
  firebaseOptions: {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FB_APP_ID,
    measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
  },
  firebaseAppCheckDebugToken: import.meta.env.VITE_FB_APPCHECK_DEBUG_TOKEN || true,
  reCaptchaSiteKey: import.meta.env.VITE_FB_RECAPTCHA_SITE_KEY,
};
