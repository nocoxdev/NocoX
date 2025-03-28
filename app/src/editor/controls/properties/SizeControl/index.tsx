import type { SizePickerProps } from '@/components/SizePicker';
import SizePicker from '@/components/SizePicker';
import type { ControlProps } from '@/editor/controls/type';

const SizeControl = (props: ControlProps<SizePickerProps>) => {
  const { defaultValue, size, variant, onChange, controlProps } = props;

  return (
    <SizePicker
      defaultValue={defaultValue}
      onChange={onChange}
      {...controlProps}
      size={size}
      variant={variant}
    />
  );
};

export default SizeControl;
