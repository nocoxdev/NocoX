import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { ControlProps } from '@/editor/controls/type';

const DateControl = (props: ControlProps<DatePickerProps>) => {
  const { defaultValue, controlProps = {}, size, variant, onChange } = props;

  return (
    <DatePicker
      defaultValue={defaultValue}
      onChange={onChange}
      style={{ width: '100%' }}
      {...controlProps}
      size={size}
      variant={variant}
    />
  );
};

export default DateControl;
