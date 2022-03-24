import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { AppCheck } from 'firebase/app-check';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

let app: FirebaseApp;
let appCheck: AppCheck;

const projectId = import.meta.env.VITE_FB_PROJECT_ID;
const firebaseOptions: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
};
const firebaseAppCheckDebugToken = import.meta.env.VITE_FB_APPCHECK_DEBUG_TOKEN || true;
const reCaptchaSiteKey = import.meta.env.VITE_FB_RECAPTCHA_SITE_KEY;

export function initializeFirebaseApp() {
  if (app) {
    return app;
  }
  app = initializeApp(firebaseOptions);
  return app;
}

export function initializeFirebaseAppCheck() {
  if (appCheck) {
    return appCheck;
  }
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line max-len
    window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = firebaseAppCheckDebugToken;
  }
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(reCaptchaSiteKey),
    isTokenAutoRefreshEnabled: true,
  });
  return appCheck;
}

export async function initializeFirebasePerformance() {
  const { initializePerformance } = await import('firebase/performance');
  initializePerformance(app);
}

export async function initializeFirebaseAnalytics() {
  const { getAnalytics } = await import('firebase/analytics');
  return getAnalytics();
}
