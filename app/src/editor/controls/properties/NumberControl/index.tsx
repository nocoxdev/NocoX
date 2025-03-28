import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import type { ControlProps } from '@/editor/controls/type';

const NumberControl = (props: ControlProps<InputNumberProps>) => {
  const { defaultValue, size, variant, onChange, controlProps } = props;
  return (
    <InputNumber
      style={{ width: '100%' }}
      {...controlProps}
      defaultValue={defaultValue}
      onChange={onChange}
      variant={variant}
      size={size}
    />
  );
};

export default NumberControl;
