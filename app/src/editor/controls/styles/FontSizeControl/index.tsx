import { FontSizeOutlined } from '@ant-design/icons';
import type { ColorPickerProps } from 'antd';
import { InputNumber } from 'antd';
import type { ControlProps } from '@/editor/controls/type';

const FontSizeControl = (props: ControlProps<ColorPickerProps>) => {
  const { defaultValue, size, onChange } = props;

  return (
    <InputNumber
      defaultValue={defaultValue?.fontSize}
      size={size}
      onChange={(val) => onChange({ fontSize: val })}
      prefix={<FontSizeOutlined />}
      suffix="px"
      controls={false}
      style={{ width: '100%', paddingLeft: 7 }}
    />
  );
};

export default FontSizeControl;
