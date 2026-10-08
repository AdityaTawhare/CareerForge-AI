import { useEffect } from 'react';

/**
 * Register a keyboard shortcut.
 * @example useKeyboardShortcut('k', handler, { ctrlKey: true })
 */
export function useKeyboardShortcut(
  key: string,
  handler: (e: KeyboardEvent) => void,
  modifiers: { ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; altKey?: boolean } = {}
) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const ctrlOrMeta = modifiers.ctrlKey ? (e.ctrlKey || e.metaKey) : true;
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        ctrlOrMeta &&
        (!modifiers.shiftKey || e.shiftKey) &&
        (!modifiers.altKey || e.altKey)
      ) {
        e.preventDefault();
        handler(e);
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [key, handler, modifiers]);
}
