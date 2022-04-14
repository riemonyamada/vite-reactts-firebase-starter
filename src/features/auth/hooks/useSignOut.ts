import { getAuth, signOut as _signOut } from 'firebase/auth';
import { useState } from 'react';

export function useSignOut() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const signOut = () => {
    setError(null);
    setLoading(true);

    const auth = getAuth();
    return _signOut(auth)
      .catch(() => {
        setError(Error('問題が発生しました。'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    signOut,
    loading,
    error,
  };
}
