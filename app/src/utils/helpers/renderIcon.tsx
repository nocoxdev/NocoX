import { generate as generateColor } from '@ant-design/colors';
import { renderIconDefinitionToSVGElement } from '@ant-design/icons-svg/es/helpers';
import type { IconDefinition } from '@ant-design/icons-svg/lib/types';
import { base64Encode } from './base64';

type Placeholders = {
  primaryColor: string;
  secondaryColor: string;
};

export function renderIconToSVG(
  icon: IconDefinition,
  color: string | undefined,
  size: number | string | undefined,
) {
  let placeholders: Placeholders | undefined;
  if (icon.theme === 'twotone') {
    const primaryColor = color || '#1890ff';

    placeholders = {
      primaryColor,
      secondaryColor: generateColor(primaryColor)[0],
    };
  } else {
    placeholders = undefined;
  }

  return renderIconDefinitionToSVGElement(icon, {
    placeholders: placeholders,
    extraSVGAttrs: {
      xmlns: 'http://www.w3.org/2000/svg',
      width: `${size || '1em'}`,
      height: `${size || '1em'}`,
      fill: color || 'currentColor',
    },
  });
}

export function renderIconToImageData(
  icon: IconDefinition,
  color: string,
  size: string,
) {
  const svg = renderIconToSVG(icon, color, size);

  const data = `data:image/svg+xml;base64, ${base64Encode(svg)}`;
  return data;
}

export function renderIconToImageElement(
  icon: IconDefinition,
  color: string,
  size: string,
) {
  const data = renderIconToImageData(icon, color, size);

  return `<img name="${
    icon.name + icon.theme
  }" class="ql-c-icon" src="${data}" alt="" size="${size}" color="${color}" />`;
}
