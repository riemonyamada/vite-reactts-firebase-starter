import { useCallback, useState } from 'react';

import { signOut as _signOut } from 'firebase/auth';

import { getAppAuth } from '@src/lib/firebase';

export function useSignOut() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const signOut = useCallback(() => {
    setError(null);
    setLoading(true);

    const auth = getAppAuth();
    return _signOut(auth)
      .catch(() => {
        setError(Error('問題が発生しました。'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    signOut,
    loading,
    error,
  };
}
