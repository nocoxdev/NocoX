import type { SwitchProps } from 'antd';
import { Switch } from 'antd';
import type { SwitchSize } from 'antd/es/switch';
import type { ControlProps } from '@/editor/controls/type';

const SwitchControl = (props: ControlProps<SwitchProps>) => {
  const { defaultValue, controlProps, size, onChange } = props;

  return (
    <Switch
      defaultValue={defaultValue}
      onChange={onChange}
      {...controlProps}
      size={size as SwitchSize}
    />
  );
};

export default SwitchControl;
