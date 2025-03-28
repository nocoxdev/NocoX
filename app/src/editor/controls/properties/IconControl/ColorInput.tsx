import type { ExColorPickerProps } from '@/components/ExColorPicker';
import ExColorPicker from '@/components/ExColorPicker';

export interface ColorInput extends ExColorPickerProps {
  enable?: boolean;
}

const ColorInput = (props: ExColorPickerProps) => {
  return (
    <ExColorPicker size="small" placement="bottom" allowClear {...props} />
  );
};

export default ColorInput;
