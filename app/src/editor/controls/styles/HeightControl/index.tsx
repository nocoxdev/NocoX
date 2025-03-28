import type { SizePickerProps } from '@/components/SizePicker';
import SizePicker from '@/components/SizePicker';
import type { ControlProps } from '@/editor/controls/type';

const HeightControl = (props: ControlProps<SizePickerProps>) => {
  const { controlProps, size, defaultValue, onChange } = props;

  const { prefix } = controlProps || {};

  return (
    <SizePicker
      defaultValue={defaultValue?.height}
      size={size}
      onChange={(val) => onChange({ height: val })}
      prefix={prefix}
    />
  );
};

export default HeightControl;
