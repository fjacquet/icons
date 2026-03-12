import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { resolveIconComponent, type IconEntry, type IconSettings } from './catalog';

export function renderIconToSvg(entry: IconEntry, opts: IconSettings): string {
  const IconComp = resolveIconComponent(entry);
  if (!IconComp) throw new Error(`Icon not found: ${entry.libraryId}:${entry.name}`);

  let markup = renderToStaticMarkup(
    React.createElement(IconComp, { size: opts.size, color: opts.color })
  );

  markup = markup.replace(
    '<svg ',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.size}" height="${opts.size}" `
  );

  if (opts.background) {
    markup = markup.replace(
      /(<svg[^>]*>)/,
      `$1<rect width="${opts.size}" height="${opts.size}" fill="${opts.background}"/>`
    );
  }

  return markup;
}
