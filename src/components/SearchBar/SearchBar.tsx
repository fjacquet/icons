import React from 'react';

import { LIBRARY_LABELS } from '../../lib/icons/catalog';
import type { IconLibraryId } from '../../types/icons';
import './SearchBar.css';

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  libraryFilter: IconLibraryId | 'all';
  onLibraryFilterChange: (id: IconLibraryId | 'all') => void;
  availableLibraries: IconLibraryId[];
}

export function SearchBar({
  query,
  onQueryChange,
  libraryFilter,
  onLibraryFilterChange,
  availableLibraries,
}: Props): React.ReactElement {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search icons…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="search-bar__input"
        aria-label="Search icons"
      />
      <select
        value={libraryFilter}
        onChange={(e) => onLibraryFilterChange(e.target.value as IconLibraryId | 'all')}
        className="search-bar__select"
        aria-label="Filter by library"
      >
        <option value="all">All libraries</option>
        {availableLibraries.map((id) => (
          <option key={id} value={id}>
            {LIBRARY_LABELS[id]}
          </option>
        ))}
      </select>
    </div>
  );
}
