import React from 'react';

import { resolveIconComponent } from '../../lib/icons/catalog';
import type { IconEntry, IconSettings } from '../../types/icons';
import './IconPreview.css';

interface Props {
  entry: IconEntry | null;
  settings: IconSettings;
  onExportSingle: () => void;
}

export function IconPreview({ entry, settings, onExportSingle }: Props): React.ReactElement {
  if (!entry) {
    return (
      <div className="icon-preview icon-preview--empty">
        <p>Select an icon to preview</p>
      </div>
    );
  }

  const IconComp = resolveIconComponent(entry);
  const bgStyle: React.CSSProperties = settings.background
    ? { backgroundColor: settings.background }
    : {};

  return (
    <div className="icon-preview">
      <div className="icon-preview__canvas" style={bgStyle}>
        {IconComp ? (
          <IconComp size={settings.size} color={settings.color} aria-hidden="true" />
        ) : (
          <span className="icon-preview__fallback">?</span>
        )}
      </div>
      <p className="icon-preview__name">{entry.name}</p>
      <p className="icon-preview__library">{entry.libraryLabel}</p>
      <button className="icon-preview__download-btn" onClick={onExportSingle} disabled={!IconComp}>
        Download SVG
      </button>
    </div>
  );
}
