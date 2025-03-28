import { useState } from 'react';
import { isNumber } from 'lodash-es';
import type { SizePickerProps } from '.';
import type { SizeValue } from './type';
import { parseSize } from './utils';

export const useSizeValue = (props: SizePickerProps) => {
  const { defaultValue, onChange } = props;

  const [innerValue, setInnerValue] = useState<SizeValue | undefined>(() =>
    parseSize(defaultValue),
  );

  const changeValue = (val: SizeValue | undefined) => {
    let newValue: string | undefined;

    if (val) {
      if (val.unit === 'auto') {
        newValue = 'auto';
      } else {
        newValue = isNumber(val.number)
          ? `${val.number}${val.unit}`
          : undefined;
      }
    }

    setInnerValue(val);
    onChange?.(newValue);
  };

  return { innerValue, changeValue };
};
