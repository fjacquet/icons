import { useMemo, useState } from 'react';

import { AVAILABLE_LIBRARIES, ICON_CATALOG } from '../lib/icons/catalog';
import type { IconEntry, IconLibraryId } from '../types/icons';

type LibraryFilter = IconLibraryId | 'all';

export interface UseIconFilterReturn {
  query: string;
  setQuery: (q: string) => void;
  libraryFilter: LibraryFilter;
  setLibraryFilter: (id: LibraryFilter) => void;
  filteredIcons: IconEntry[];
  availableLibraries: IconLibraryId[];
}

export function useIconFilter(): UseIconFilterReturn {
  const [query, setQuery] = useState('');
  const [libraryFilter, setLibraryFilter] = useState<LibraryFilter>('all');

  const filteredIcons = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return ICON_CATALOG.filter((entry) => {
      const matchesQuery = entry.name.toLowerCase().includes(lowerQuery);
      const matchesLibrary = libraryFilter === 'all' || entry.libraryId === libraryFilter;
      return matchesQuery && matchesLibrary;
    });
  }, [query, libraryFilter]);

  return {
    query,
    setQuery,
    libraryFilter,
    setLibraryFilter,
    filteredIcons,
    availableLibraries: AVAILABLE_LIBRARIES,
  };
}
