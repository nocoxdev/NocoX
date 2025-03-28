import type { ColorPickerProps } from 'antd';
import { ColorPicker } from 'antd';
import type { WidgetProps } from '@/types';

const ColorView = (props: WidgetProps<ColorPickerProps>) => {
  const { className, style, ...restProps } = props;
  return (
    <ColorPicker
      {...restProps}
      rootClassName={className}
      style={{
        ...style,
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default ColorView;
