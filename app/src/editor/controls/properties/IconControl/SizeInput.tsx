import type { SizePickerProps } from '@/components/SizePicker';
import SizePicker from '@/components/SizePicker';

const SizeInput = (props: SizePickerProps) => {
  return (
    <SizePicker
      size="small"
      excludeTypes={['auto']}
      style={{ width: 80 }}
      {...props}
    />
  );
};

export default SizeInput;
