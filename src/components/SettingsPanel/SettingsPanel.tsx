import React from 'react';

import type { IconSettings } from '../../types/icons';
import './SettingsPanel.css';

const PRESET_COLORS = ['#000000', '#ffffff', '#0070f3', '#e53e3e', '#38a169', '#dd6b20'];

interface Props {
  settings: IconSettings;
  onSettingsChange: (s: IconSettings) => void;
}

export function SettingsPanel({ settings, onSettingsChange }: Props): React.ReactElement {
  const update = (patch: Partial<IconSettings>) => onSettingsChange({ ...settings, ...patch });

  return (
    <div className="settings-panel">
      <div className="settings-panel__row">
        <label className="settings-panel__label" htmlFor="size-range">
          Size: {settings.size}px
        </label>
        <input
          id="size-range"
          type="range"
          min={16}
          max={256}
          step={8}
          value={settings.size}
          onChange={(e) => update({ size: Number(e.target.value) })}
          className="settings-panel__range"
        />
        <input
          type="number"
          min={16}
          max={256}
          value={settings.size}
          onChange={(e) => update({ size: Math.min(256, Math.max(16, Number(e.target.value))) })}
          className="settings-panel__number"
          aria-label="Size in pixels"
        />
      </div>

      <div className="settings-panel__row">
        <label className="settings-panel__label" htmlFor="color-picker">
          Color
        </label>
        <div className="settings-panel__color-row">
          <input
            id="color-picker"
            type="color"
            value={settings.color}
            onChange={(e) => update({ color: e.target.value })}
            className="settings-panel__color-input"
          />
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              title={c}
              aria-label={`Set color to ${c}`}
              className="settings-panel__swatch"
              style={{
                backgroundColor: c,
                border:
                  settings.color === c
                    ? '2px solid var(--color-accent)'
                    : '2px solid var(--color-border)',
              }}
              onClick={() => update({ color: c })}
            />
          ))}
        </div>
      </div>

      <div className="settings-panel__row">
        <label className="settings-panel__label">Background</label>
        <div className="settings-panel__color-row">
          <button
            className={`settings-panel__bg-toggle ${settings.background === null ? 'settings-panel__bg-toggle--active' : ''}`}
            onClick={() => update({ background: null })}
          >
            Transparent
          </button>
          <input
            type="color"
            value={settings.background ?? '#ffffff'}
            onChange={(e) => update({ background: e.target.value })}
            className="settings-panel__color-input"
            aria-label="Background color"
          />
        </div>
      </div>
    </div>
  );
}
