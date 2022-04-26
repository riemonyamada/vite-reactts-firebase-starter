import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { atom } from 'jotai';
import { useAtomValue } from 'jotai/utils';

import type { AuthUser } from '../types';

type AuthUserOrNull = AuthUser | null;

export const authUserAtom = atom<Promise<AuthUserOrNull> | AuthUserOrNull>(null);

authUserAtom.onMount = (setAtom) => {
  const initialValue = new Promise<AuthUserOrNull>((_resolve, reject) => {
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
        const { uid, email, displayName, metadata } = user;
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
    setAtom(null);
  };
};

export function useAuthUser() {
  return useAtomValue(authUserAtom);
}
