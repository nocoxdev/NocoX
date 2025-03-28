import type { ColorPickerProps } from 'antd';
import { ColorPicker } from 'antd';
import { useTheme } from 'styled-components';
import { toHexStringColor } from '@/utils/helpers';
import { genPresets } from './utils';

export interface ExColorPickerProps extends Omit<ColorPickerProps, 'onChange'> {
  onChange?: (value: string) => void;
}

const ExColorPicker = (props: ExColorPickerProps) => {
  const { style, onChange, children, ...restProps } = props;
  const theme = useTheme();
  // const [position, setPosition] = useState<Position>();

  const presets = genPresets({
    Presets: [
      theme.colorPrimary,
      theme.colorSuccess,
      theme.colorError,
      theme.colorWarning,
      theme.colorInfo,
    ],
  });

  return (
    <ColorPicker
      presets={presets}
      {...restProps}
      style={{ alignItems: 'center', ...style }}
      onChange={(color) => onChange?.(toHexStringColor(color))}
    >
      {children}
    </ColorPicker>
  );
};

export default ExColorPicker;
