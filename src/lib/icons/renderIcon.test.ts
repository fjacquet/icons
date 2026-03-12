import React from 'react';

import { renderIconToSvgString } from './renderIcon';
import type { IconBaseProps, IconComponent, IconSettings } from '../../types/icons';

const MockIcon: IconComponent = ({ color, size }: IconBaseProps) =>
  React.createElement(
    'svg',
    { viewBox: '0 0 24 24', fill: color, width: size, height: size },
    React.createElement('path', { d: 'M0 0h24v24H0z' })
  );

const baseSettings: IconSettings = { size: 64, color: '#ff0000', background: null };

describe('renderIconToSvgString', () => {
  it('produces a string starting with <svg', () => {
    const svg = renderIconToSvgString(MockIcon, baseSettings);
    expect(svg).toMatch(/^<svg /);
  });

  it('injects xmlns attribute', () => {
    const svg = renderIconToSvgString(MockIcon, baseSettings);
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  it('injects correct width and height', () => {
    const svg = renderIconToSvgString(MockIcon, baseSettings);
    expect(svg).toContain('width="64"');
    expect(svg).toContain('height="64"');
  });

  it('does not inject background rect when background is null', () => {
    const svg = renderIconToSvgString(MockIcon, baseSettings);
    expect(svg).not.toContain('<rect');
  });

  it('injects background rect when background is set', () => {
    const settings: IconSettings = { ...baseSettings, background: '#ffffff' };
    const svg = renderIconToSvgString(MockIcon, settings);
    expect(svg).toContain('<rect');
    expect(svg).toContain('fill="#ffffff"');
  });

  it('does not contain data-react attributes', () => {
    const svg = renderIconToSvgString(MockIcon, baseSettings);
    expect(svg).not.toContain('data-react');
  });
});
