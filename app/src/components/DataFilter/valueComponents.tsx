import { DatePicker, Input, InputNumber, TimePicker } from 'antd';
import { Select } from 'antd/lib';
import type { ValueComponentProps } from './type';

export const InputComponent = (props: ValueComponentProps) => {
  const { onChange, ...restProps } = props;

  return (
    <Input
      {...restProps}
      onChange={(e) => onChange?.(e.target.value)}
      style={{ width: 160 }}
    />
  );
};

export const DatePickerComponent = (props: ValueComponentProps) => {
  return <DatePicker {...props} style={{ width: 160 }} />;
};
export const TimePickerComponent = (props: ValueComponentProps) => {
  return <TimePicker {...props} style={{ width: 160 }} />;
};

export const InputNumberComponent = (props: ValueComponentProps) => {
  return <InputNumber {...props} style={{ width: 160 }} />;
};

export const SelectComponent = (props: ValueComponentProps) => {
  return <Select {...props} style={{ width: 160 }} />;
};
