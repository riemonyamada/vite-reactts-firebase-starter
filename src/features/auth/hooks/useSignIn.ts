import { useCallback, useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

import { getAppAuth } from '@src/lib/firebase';

export function useSignIn() {
  const { t } = useTranslation('auth');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // eslint-disable-next-line max-len
  const signIn = useCallback(
    (email: string, password: string) => {
      setError(null);
      setLoading(true);

      const auth = getAppAuth();
      return signInWithEmailAndPassword(auth, email, password)
        .catch((e: unknown) => {
          let message;
          if (e instanceof FirebaseError) {
            if (
              ['auth/invalid-email', 'auth/user-not-found', 'auth/wrong-password'].includes(e.code)
            ) {
              message = t('useSignin.invalidInput');
            } else if (e.code === 'auth/too-many-requests') {
              message = t('useSignin.tooManyRequests');
            } else if (e.code === 'auth/user-disabled') {
              message = t('useSignin.userDisabled');
            }
          }

          setError(Error(message ?? t('useSignin.unexpectedError')));
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [t],
  );

  return {
    signIn,
    loading,
    error,
  };
}
