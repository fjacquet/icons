import React, { useCallback, useState } from 'react';

import { SearchBar } from '../../components/SearchBar/SearchBar';
import { IconGrid } from '../../components/IconGrid/IconGrid';
import { IconPreview } from '../../components/IconPreview/IconPreview';
import { SettingsPanel } from '../../components/SettingsPanel/SettingsPanel';
import { useIconFilter } from '../../hooks/useIconFilter';
import { useIconSelection } from '../../hooks/useIconSelection';
import { ICON_CATALOG, entryKey, resolveIconComponent } from '../../lib/icons/catalog';
import { renderIconToSvgString } from '../../lib/icons/renderIcon';
import { downloadSvg } from '../../lib/utils/download';
import { createAndDownloadZip } from '../../lib/utils/zip';
import type { IconSettings } from '../../types/icons';
import './Home.css';

const DEFAULT_SETTINGS: IconSettings = {
  size: 64,
  color: '#000000',
  background: null,
};

export function Home(): React.ReactElement {
  const [settings, setSettings] = useState<IconSettings>(DEFAULT_SETTINGS);

  const { query, setQuery, libraryFilter, setLibraryFilter, filteredIcons, availableLibraries } =
    useIconFilter();

  const { selectedIcons, activeIcon, toggleSelection, clearSelection, setActiveIcon } =
    useIconSelection();

  const handleExportSingle = useCallback(() => {
    if (!activeIcon) return;
    const comp = resolveIconComponent(activeIcon);
    if (!comp) return;
    downloadSvg(`${activeIcon.name}.svg`, renderIconToSvgString(comp, settings));
  }, [activeIcon, settings]);

  const handleExportBulk = useCallback(() => {
    const entries = ICON_CATALOG.filter((e) => selectedIcons.has(entryKey(e)));

    const zipEntries = entries.flatMap((entry) => {
      const comp = resolveIconComponent(entry);
      if (!comp) return [];
      return [{ filename: `${entry.name}.svg`, svgContent: renderIconToSvgString(comp, settings) }];
    });

    createAndDownloadZip('icons.zip', zipEntries);
  }, [selectedIcons, settings]);

  return (
    <div className="home">
      <div className="home__catalog">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          libraryFilter={libraryFilter}
          onLibraryFilterChange={setLibraryFilter}
          availableLibraries={availableLibraries}
        />
        <IconGrid
          icons={filteredIcons}
          settings={settings}
          selectedIcons={selectedIcons}
          activeIcon={activeIcon}
          onToggleSelection={toggleSelection}
          onActivate={setActiveIcon}
        />
      </div>
      <aside className="home__sidebar">
        <IconPreview entry={activeIcon} settings={settings} onExportSingle={handleExportSingle} />
        <hr className="home__divider" />
        <SettingsPanel settings={settings} onSettingsChange={setSettings} />
        {selectedIcons.size > 0 && (
          <div className="home__bulk">
            <button className="home__bulk-btn" onClick={handleExportBulk}>
              Download {selectedIcons.size} icon{selectedIcons.size !== 1 ? 's' : ''} as ZIP
            </button>
            <button className="home__clear-btn" onClick={clearSelection}>
              Clear selection
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
