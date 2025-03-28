import { FontColorsOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import type { ColorPickerProps } from 'antd';
import { ColorPicker, Input } from 'antd';
import type { ControlProps } from '@/editor/controls/type';

const FontColorControl = (props: ControlProps<ColorPickerProps>) => {
  const [value, setValue] = useControllableValue(props);
  const { size } = props;
  return (
    <ColorPicker
      value={value?.color}
      onChange={(color) => setValue({ color: color.toHexString() })}
      showText
      allowClear
      onClear={() => setValue(undefined)}
      style={{ width: '100%' }}
      size={size}
    >
      <Input
        prefix={<FontColorsOutlined />}
        value={value?.color}
        styles={{ prefix: { color: value?.color } }}
        onChange={(e) => setValue({ color: e.target.value })}
        size={size}
      ></Input>
    </ColorPicker>
  );
};

export default FontColorControl;
