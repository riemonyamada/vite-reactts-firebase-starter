import { ReactElement, useEffect } from 'react';
import {
  initializeFirebaseApp,
  initializeFirebaseAppCheck,
  initializeFirebasePerformance,
  initializeFirebaseAnalytics,
} from '@src/lib/firebase';

function useInitializeFirebase() {
  initializeFirebaseApp();
  initializeFirebaseAppCheck();

  useEffect(() => {
    Promise.all([initializeFirebasePerformance(), initializeFirebaseAnalytics()]);
  }, []);
}

type FirebaseRootProps = {
  children: ReactElement;
};

export function FirebaseRoot({ children }: FirebaseRootProps) {
  useInitializeFirebase();
  return children;
}
