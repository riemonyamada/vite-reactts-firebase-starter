import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { AppCheck } from 'firebase/app-check';
import type { Auth } from 'firebase/auth';

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

let app: FirebaseApp;
export function initializeFirebaseApp() {
  if (app) {
    return app;
  }
  app = initializeApp(firebaseOptions);
  return app;
}

let appCheck: AppCheck;
export function initializeFirebaseAppCheck() {
  if (import.meta.env.MODE === 'emulators') {
    return null;
  }
  if (appCheck) {
    return appCheck;
  }
  if (process.env['NODE_ENV'] === 'development') {
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
  if (import.meta.env.MODE === 'emulators') {
    return null;
  }
  const { initializePerformance } = await import('firebase/performance');
  return initializePerformance(app);
}

export async function initializeFirebaseAnalytics() {
  if (import.meta.env.MODE === 'emulators') {
    return null;
  }
  const { getAnalytics } = await import('firebase/analytics');
  return getAnalytics();
}

let auth: Auth;
export function getAppAuth() {
  if (auth) {
    return auth;
  }
  auth = getAuth();

  if (import.meta.env.MODE === 'emulators') {
    // eslint-disable-next-line no-console
    console.log('connect auth emulator!');
    connectAuthEmulator(auth, 'http://localhost:9099');
  }
  return auth;
}
