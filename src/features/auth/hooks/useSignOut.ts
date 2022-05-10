import { useCallback, useState } from 'react';

import { signOut as _signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

import { getAppAuth } from '@src/lib/firebase';

export function useSignOut() {
  const { t } = useTranslation('auth');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const signOut = useCallback(() => {
    setError(null);
    setLoading(true);

    const auth = getAppAuth();
    return _signOut(auth)
      .catch(() => {
        setError(Error(t('useSignOut.unexpectedError')));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [t]);

  return {
    signOut,
    loading,
    error,
  };
}
