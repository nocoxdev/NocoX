import { isNumber } from 'lodash-es';
import type { SizeUnit, SizeValue } from './type';

export function parseSize(
  value: string | number | undefined | null,
): SizeValue {
  if (!value) {
    return {
      unit: 'px',
    };
  }

  if (value === 'auto') {
    return {
      unit: 'auto',
    };
  }

  if (isNumber(value)) {
    return {
      number: value,
      unit: 'px',
    };
  }

  const regex = /(\d+)(px|%|em|rem|vw)/;
  const match = value.match(regex);
  if (match) {
    return {
      number: parseInt(match[1]),
      unit: match[2] as SizeUnit,
    };
  }
  return { unit: 'px' };
}
