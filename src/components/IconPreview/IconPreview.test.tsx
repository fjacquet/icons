import { render, screen } from '@testing-library/react';

import { IconPreview } from './IconPreview';
import type { IconSettings } from '../../types/icons';

const settings: IconSettings = { size: 64, color: '#000000', background: null };

describe('IconPreview', () => {
  it('shows placeholder when no icon is selected', () => {
    render(<IconPreview entry={null} settings={settings} onExportSingle={jest.fn()} />);
    expect(screen.getByText(/select an icon/i)).toBeInTheDocument();
  });

  it('shows download button when icon is selected', () => {
    const entry = { name: 'FaBeer', libraryId: 'fa6' as const, libraryLabel: 'Font Awesome 6' };
    render(<IconPreview entry={entry} settings={settings} onExportSingle={jest.fn()} />);
    expect(screen.getByRole('button', { name: /download svg/i })).toBeInTheDocument();
  });

  it('shows icon name when icon is selected', () => {
    const entry = { name: 'FaBeer', libraryId: 'fa6' as const, libraryLabel: 'Font Awesome 6' };
    render(<IconPreview entry={entry} settings={settings} onExportSingle={jest.fn()} />);
    expect(screen.getByText('FaBeer')).toBeInTheDocument();
  });
});
