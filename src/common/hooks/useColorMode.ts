import { useSetAtom } from 'jotai';
import { atomWithStorage, useAtomValue } from 'jotai/utils';
import { useCallback } from 'react';

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
