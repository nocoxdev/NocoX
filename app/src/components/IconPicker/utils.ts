import { camelCase, upperFirst } from 'lodash-es';
import type { IconValueType } from '@/types';
import { icons } from './icons';

export function getIcons() {
  return icons
    .map((item) => {
      const result: IconValueType[] = [];

      const icon = {
        title: upperFirst(camelCase(item.name)),
        tags: item.tags,
        category: item.category,
      };

      if (item.outline) {
        result.push({
          ...icon,
          name: item.name + '-outline',
          content: item.outline,
          type: 'outline',
        });
      }

      if (item.filled) {
        result.push({
          ...icon,
          name: item.name + '-filled',
          content: item.filled,
          type: 'filled',
        });
      }
      return result;
    })
    .flat();
}

export function getIcon(name?: string) {
  const data = getIcons();

  return data.find((icon) => icon.name === name);
}
