import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { ValueComponentProps } from '@/types';

dayjs.extend(customParseFormat);
const format = 'YYYY-MM-DD hh:mm:ss';

export const DateTimeColumn = (props: ValueComponentProps) => {
  const { value, defaultValue, onChange, ...restProps } = props;

  return (
    <DatePicker
      {...restProps}
      format={format}
      value={value && dayjs(value, format)}
      defaultValue={value && dayjs(defaultValue, format)}
      onChange={(_, dateString) => onChange?.(dateString)}
      autoFocus
      style={{ width: '100%' }}
    />
  );
};
