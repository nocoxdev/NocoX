import type { InputProps } from 'antd';
import { Input } from 'antd';
import type { ControlProps } from '@/editor/controls/type';

const InputControl = (props: ControlProps<InputProps>) => {
  const {
    placeholder,
    defaultValue,
    size,
    variant,
    controlProps = {},
    onChange,
  } = props;

  return (
    <Input
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(e) => onChange?.(e.target.value)}
      allowClear
      {...controlProps}
      style={{ minWidth: 28 }}
      size={size}
      variant={variant}
    />
  );
};

export default InputControl;
