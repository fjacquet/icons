import { act, renderHook } from '@testing-library/react';

import { useIconFilter } from './useIconFilter';

describe('useIconFilter', () => {
  it('returns all icons when query is empty and library is all', () => {
    const { result } = renderHook(() => useIconFilter());
    expect(result.current.filteredIcons.length).toBeGreaterThan(0);
  });

  it('filters icons by query (case-insensitive)', () => {
    const { result } = renderHook(() => useIconFilter());
    const total = result.current.filteredIcons.length;

    act(() => result.current.setQuery('home'));
    const filtered = result.current.filteredIcons;
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.length).toBeLessThan(total);
    for (const entry of filtered) {
      expect(entry.name.toLowerCase()).toContain('home');
    }
  });

  it('filters icons by library', () => {
    const { result } = renderHook(() => useIconFilter());

    act(() => result.current.setLibraryFilter('md'));
    const filtered = result.current.filteredIcons;
    expect(filtered.length).toBeGreaterThan(0);
    for (const entry of filtered) {
      expect(entry.libraryId).toBe('md');
    }
  });

  it('returns empty when query matches nothing', () => {
    const { result } = renderHook(() => useIconFilter());
    act(() => result.current.setQuery('zzzzthisshouldmatchnothing'));
    expect(result.current.filteredIcons).toHaveLength(0);
  });
});
