import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { ValueComponentProps } from '@/types';

dayjs.extend(customParseFormat);
const format = 'YYYY-MM-DD';

interface DateTimeColumnProps extends Omit<DatePickerProps, 'onChange'> {}

export const DateColumn = (
  props: DateTimeColumnProps & ValueComponentProps,
) => {
  const { value, defaultValue, onChange, ...rest } = props;

  return (
    <DatePicker
      {...rest}
      value={value && dayjs(value, format)}
      defaultValue={defaultValue && dayjs(defaultValue, format)}
      onChange={(_, dateString) => onChange?.(dateString)}
      autoFocus
      style={{ width: '100%' }}
    />
  );
};
