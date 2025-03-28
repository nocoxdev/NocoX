import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import type { ControlProps } from '@/editor/controls/type';

const CascaderControl = (props: ControlProps<CascaderProps>) => {
  const { defaultValue, controlProps, size, onChange } = props;

  return (
    <Cascader
      {...controlProps}
      onChange={onChange}
      defaultValue={defaultValue}
      multiple={false}
      size={size}
      style={{ width: '100%' }}
    />
  );
};

export default CascaderControl;
