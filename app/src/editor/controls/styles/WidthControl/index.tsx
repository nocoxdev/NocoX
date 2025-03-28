import type { SizePickerProps } from '@/components/SizePicker';
import SizePicker from '@/components/SizePicker';
import type { ControlProps } from '@/editor/controls/type';

const WidthControl = (props: ControlProps<SizePickerProps>) => {
  const { controlProps, size, defaultValue, onChange } = props;

  const { prefix } = controlProps || {};

  return (
    <SizePicker
      defaultValue={defaultValue?.width}
      onChange={(val) => onChange({ width: val })}
      prefix={prefix}
      size={size}
    />
  );
};

export default WidthControl;
