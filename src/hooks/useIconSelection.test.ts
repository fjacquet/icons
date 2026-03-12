import { act, renderHook } from '@testing-library/react';

import { useIconSelection } from './useIconSelection';
import type { IconEntry } from '../types/icons';

const entry1: IconEntry = { name: 'FaBeer', libraryId: 'fa6', libraryLabel: 'Font Awesome 6' };
const entry2: IconEntry = { name: 'MdHome', libraryId: 'md', libraryLabel: 'Material Design' };

describe('useIconSelection', () => {
  it('starts with empty selection and no active icon', () => {
    const { result } = renderHook(() => useIconSelection());
    expect(result.current.selectedIcons.size).toBe(0);
    expect(result.current.activeIcon).toBeNull();
  });

  it('toggleSelection adds an entry', () => {
    const { result } = renderHook(() => useIconSelection());
    act(() => result.current.toggleSelection(entry1));
    expect(result.current.selectedIcons.has('fa6:FaBeer')).toBe(true);
  });

  it('toggleSelection removes an already-selected entry', () => {
    const { result } = renderHook(() => useIconSelection());
    act(() => result.current.toggleSelection(entry1));
    act(() => result.current.toggleSelection(entry1));
    expect(result.current.selectedIcons.has('fa6:FaBeer')).toBe(false);
  });

  it('clearSelection empties the set', () => {
    const { result } = renderHook(() => useIconSelection());
    act(() => result.current.toggleSelection(entry1));
    act(() => result.current.toggleSelection(entry2));
    act(() => result.current.clearSelection());
    expect(result.current.selectedIcons.size).toBe(0);
  });

  it('setActiveIcon updates activeIcon', () => {
    const { result } = renderHook(() => useIconSelection());
    act(() => result.current.setActiveIcon(entry1));
    expect(result.current.activeIcon).toEqual(entry1);
  });
});
