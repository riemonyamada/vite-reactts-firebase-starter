import { useCallback } from 'react';

import { useSetAtom } from 'jotai';
import { atomWithStorage, useAtomValue } from 'jotai/utils';

const colorModeAtom = atomWithStorage<'light' | 'dark'>('darkMode', 'dark');

export function useToggleColorMode() {
  const setColorMode = useSetAtom(colorModeAtom);
  return useCallback(() => {
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, [setColorMode]);
}

export function useColorMode() {
  return useAtomValue(colorModeAtom);
}
