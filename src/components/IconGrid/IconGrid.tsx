import React, { useState } from 'react';

import { entryKey } from '../../lib/icons/catalog';
import type { IconEntry, IconSettings } from '../../types/icons';
import { IconCard } from '../IconCard/IconCard';
import './IconGrid.css';

const PAGE_SIZE = 200;

interface Props {
  icons: IconEntry[];
  settings: IconSettings;
  selectedIcons: Set<string>;
  activeIcon: IconEntry | null;
  onToggleSelection: (entry: IconEntry) => void;
  onActivate: (entry: IconEntry) => void;
}

export function IconGrid({
  icons,
  settings,
  selectedIcons,
  activeIcon,
  onToggleSelection,
  onActivate,
}: Props): React.ReactElement {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = icons.slice(0, visibleCount);
  const hasMore = icons.length > visibleCount;

  return (
    <div className="icon-grid__wrapper">
      <p className="icon-grid__count">
        {icons.length.toLocaleString()} icons
        {visibleCount < icons.length ? ` (showing ${visibleCount})` : ''}
      </p>
      <div className="icon-grid">
        {visible.map((entry) => {
          const key = entryKey(entry);
          return (
            <IconCard
              key={key}
              entry={entry}
              settings={settings}
              isSelected={selectedIcons.has(key)}
              isActive={
                activeIcon?.libraryId === entry.libraryId && activeIcon?.name === entry.name
              }
              onSelect={() => onToggleSelection(entry)}
              onActivate={() => onActivate(entry)}
            />
          );
        })}
      </div>
      {hasMore && (
        <button
          className="icon-grid__show-more"
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
        >
          Show more ({icons.length - visibleCount} remaining)
        </button>
      )}
    </div>
  );
}
