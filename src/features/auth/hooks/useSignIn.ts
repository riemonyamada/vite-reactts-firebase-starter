import { useCallback, useState } from 'react';

import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { getAppAuth } from '@src/lib/firebase';

export function useSignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // eslint-disable-next-line max-len
  const signIn = useCallback((email: string, password: string) => {
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
            message = 'メールアドレスかパスワードが間違っています。';
          } else if (e.code === 'auth/too-many-requests') {
            message = '試行回数が上限に達しました。しばらくたってから再度サインインしてください。';
          } else if (e.code === 'auth/user-disabled') {
            message = 'ユーザー登録が完了していないか、ユーザーが無効にされています。';
          } else {
            message = '問題が発生しました。';
          }
        }

        setError(Error(message ?? '問題が発生しました。'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    signIn,
    loading,
    error,
  };
}
