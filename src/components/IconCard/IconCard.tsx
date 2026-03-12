import React from 'react';

import { resolveIconComponent } from '../../lib/icons/catalog';
import type { IconEntry, IconSettings } from '../../types/icons';
import './IconCard.css';

interface Props {
  entry: IconEntry;
  settings: IconSettings;
  isSelected: boolean;
  isActive: boolean;
  onSelect: () => void;
  onActivate: () => void;
}

export function IconCard({
  entry,
  settings,
  isSelected,
  isActive,
  onSelect,
  onActivate,
}: Props): React.ReactElement {
  const IconComp = resolveIconComponent(entry);
  const classNames = [
    'icon-card',
    isSelected ? 'icon-card--selected' : '',
    isActive ? 'icon-card--active' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onActivate();
      }}
    >
      <label className="icon-card__checkbox-label" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          aria-label={`Select ${entry.name}`}
        />
      </label>
      <div className="icon-card__glyph">
        {IconComp ? (
          <IconComp size={32} color={settings.color} aria-hidden="true" />
        ) : (
          <span className="icon-card__fallback">?</span>
        )}
      </div>
      <span className="icon-card__name" title={entry.name}>
        {entry.name}
      </span>
    </div>
  );
}
