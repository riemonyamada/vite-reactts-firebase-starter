import { ReactElement, useEffect } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { AppCheck, initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { defaultConfig } from '@src/lib/firebase';

function createInitializationFunction() {
  let app: FirebaseApp;
  let appCheck: AppCheck;

  function initializeFirebaseApp() {
    if (app) {
      return app;
    }
    app = initializeApp(defaultConfig.firebaseOptions);
    return app;
  }

  function initializeFirebaseAppCheck() {
    if (appCheck) {
      return appCheck;
    }
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line max-len
      window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = defaultConfig.firebaseAppCheckDebugToken;
    }
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(defaultConfig.reCaptchaSiteKey),
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

const initializationFunctions = createInitializationFunction();

function useInitializeFirebase() {
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

type FirebaseRootProps = {
  children: ReactElement;
};

export function FirebaseRoot({ children }: FirebaseRootProps) {
  useInitializeFirebase();
  return children;
}
