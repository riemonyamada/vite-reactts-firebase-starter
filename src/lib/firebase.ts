import { FirebaseApp, initializeApp } from 'firebase/app';
import { AppCheck, initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { useEffect } from 'react';

function createInitializationFunction() {
  let app: FirebaseApp;
  let appCheck: AppCheck;

  function initializeFirebaseApp() {
    if (app) {
      return app;
    }
    const projectId = import.meta.env.VITE_FB_PROJECT_ID;
    app = initializeApp({
      apiKey: import.meta.env.VITE_FB_API_KEY,
      authDomain: `${projectId}.firebaseapp.com`,
      databaseURL: `https://${projectId}.firebaseio.com`,
      projectId,
      storageBucket: `${projectId}.appspot.com`,
      messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FB_APP_ID,
      measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID,
    });
    return app;
  }

  function initializeFirebaseAppCheck() {
    if (appCheck) {
      return appCheck;
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line max-len
      window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_FB_APPCHECK_DEBUG_TOKEN || true;
    }
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(import.meta.env.VITE_FB_RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
    return appCheck;
  }

  async function initializeFirebasePerformance() {
    const { initializePerformance } = await import('firebase/performance');
    initializePerformance(app);
  }

  async function initializeFirebaseAnalytics() {
    const { getAnalytics } = await import('firebase/analytics');
    return getAnalytics();
  }

  return {
    initializeFirebaseApp,
    initializeFirebaseAppCheck,
    initializeFirebasePerformance,
    initializeFirebaseAnalytics,
  };
}

export const initializationFunctions = createInitializationFunction();

export function useInitializeFirebase() {
  const {
    initializeFirebaseApp,
    initializeFirebaseAppCheck,
    initializeFirebasePerformance,
    initializeFirebaseAnalytics,
  } = initializationFunctions;

  initializeFirebaseApp();
  initializeFirebaseAppCheck();

  useEffect(() => {
    Promise.all([initializeFirebasePerformance(), initializeFirebaseAnalytics()]);
  }, [initializeFirebasePerformance, initializeFirebaseAnalytics]);
}
