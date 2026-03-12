import { fireEvent, render, screen } from '@testing-library/react';

import { SearchBar } from './SearchBar';

const defaultProps = {
  query: '',
  onQueryChange: jest.fn(),
  libraryFilter: 'all' as const,
  onLibraryFilterChange: jest.fn(),
  availableLibraries: ['fa6', 'md'] as Array<'fa6' | 'md'>,
};

describe('SearchBar', () => {
  it('renders search input and library select', () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls onQueryChange when input changes', () => {
    const onQueryChange = jest.fn();
    render(<SearchBar {...defaultProps} onQueryChange={onQueryChange} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'home' } });
    expect(onQueryChange).toHaveBeenCalledWith('home');
  });

  it('calls onLibraryFilterChange when select changes', () => {
    const onLibraryFilterChange = jest.fn();
    render(<SearchBar {...defaultProps} onLibraryFilterChange={onLibraryFilterChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'md' } });
    expect(onLibraryFilterChange).toHaveBeenCalledWith('md');
  });
});
