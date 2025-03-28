import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { ValueComponentProps } from '@/types';

dayjs.extend(customParseFormat);
const format = 'HH:mm:ss';

export const TimeColumn = (props: ValueComponentProps) => {
  const { value, defaultValue, onChange, ...rest } = props;

  return (
    <TimePicker
      {...rest}
      value={value && dayjs(value, format)}
      defaultValue={defaultValue && dayjs(defaultValue, format)}
      onChange={(_, dateString) => onChange?.(dateString)}
      autoFocus
      style={{ width: '100%' }}
    />
  );
};
