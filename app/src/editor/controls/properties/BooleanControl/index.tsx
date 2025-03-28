import type { CheckboxProps } from 'antd';
import { Checkbox } from 'antd';
import type { ControlProps } from '@/editor/controls/type';

const BooleanControl = (props: ControlProps<CheckboxProps>) => {
  const { defaultValue, controlProps, onChange } = props;

  return (
    <Checkbox
      {...controlProps}
      onChange={(e) => onChange?.(e.target.checked)}
      defaultChecked={defaultValue}
    />
  );
};

export default BooleanControl;
