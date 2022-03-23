import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as _signOut,
} from 'firebase/auth';
import { atom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { useState } from 'react';
import { AuthUser } from '../types';

type AuthUserOrNull = AuthUser | null;

const authUserState = atom<Promise<AuthUserOrNull> | AuthUserOrNull>(null);

authUserState.onMount = (setAtom) => {
  const initialValue = new Promise<AuthUserOrNull>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Authentication Error: Authentication Timeout'));
    }, 10 * 1000);
  });
  setAtom(initialValue);

  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        const {
          uid, email, displayName, metadata,
        } = user;
        const authUser = {
          uid,
          email,
          displayName,
          metadata,
        };
        setAtom(authUser);
      } else {
        setAtom(null);
      }
    },
    (error) => {
      setAtom(null);
      throw error;
    },
  );

  return () => {
    unsubscribe();
  };
};

export function useAuthUser() {
  return useAtomValue(authUserState);
}

export function useSignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // eslint-disable-next-line max-len
  const signIn = (email: string, password: string) => {
    setError(null);
    setLoading(true);

    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .catch((e) => {
        // TODO: エラー処理
        setError(e instanceof Error ? e : Error('SignIn Error: Unecpected Error'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    signIn,
    loading,
    error,
  };
}

export function useSignOut() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const signOut = () => {
    setError(null);
    setLoading(true);

    const auth = getAuth();
    return _signOut(auth)
      .catch((e) => {
        // TODO: エラー処理
        setError(e instanceof Error ? e : Error('SignOut Error: Unecpected Error'));
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
