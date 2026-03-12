import { useCallback, useState } from 'react';

import { entryKey } from '../lib/icons/catalog';
import type { IconEntry } from '../types/icons';

export interface UseIconSelectionReturn {
  selectedIcons: Set<string>;
  activeIcon: IconEntry | null;
  toggleSelection: (entry: IconEntry) => void;
  clearSelection: () => void;
  setActiveIcon: (entry: IconEntry) => void;
}

export function useIconSelection(): UseIconSelectionReturn {
  const [selectedIcons, setSelectedIcons] = useState<Set<string>>(new Set());
  const [activeIcon, setActiveIcon] = useState<IconEntry | null>(null);

  const toggleSelection = useCallback((entry: IconEntry) => {
    const key = entryKey(entry);
    setSelectedIcons((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIcons(new Set());
  }, []);

  return {
    selectedIcons,
    activeIcon,
    toggleSelection,
    clearSelection,
    setActiveIcon,
  };
}
