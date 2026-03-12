import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import type { IconBaseProps, IconComponent, IconSettings } from '../../types/icons';

export function renderIconToSvgString(IconComp: IconComponent, settings: IconSettings): string {
  const props: IconBaseProps = {
    size: settings.size,
    color: settings.color,
  };

  let markup = renderToStaticMarkup(React.createElement(IconComp, props));

  // Inject xmlns + explicit dimensions so the file is a valid standalone SVG
  markup = markup.replace(
    '<svg ',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${settings.size}" height="${settings.size}" `
  );

  // Embed background as a rect so it survives import into PowerPoint/Keynote
  if (settings.background) {
    markup = markup.replace(
      /(<svg[^>]*>)/,
      `$1<rect width="${settings.size}" height="${settings.size}" fill="${settings.background}"/>`
    );
  }

  return markup;
}
