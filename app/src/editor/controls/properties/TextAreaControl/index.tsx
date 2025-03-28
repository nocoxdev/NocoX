import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import type { ControlProps } from '@/editor/controls/type';

const { TextArea } = Input;

const TextAreaControl = (props: ControlProps<TextAreaProps>) => {
  const { placeholder, defaultValue, controlProps, size, variant, onChange } =
    props;

  return (
    <TextArea
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(e) => onChange?.(e.target.value)}
      {...controlProps}
      size={size}
      variant={variant}
    />
  );
};

export default TextAreaControl;
