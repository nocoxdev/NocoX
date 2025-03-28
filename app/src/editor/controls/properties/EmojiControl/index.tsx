import type { EmojiPickerProps } from '@/components/EmojiPicker';
import EmojiPicker from '@/components/EmojiPicker';
import type { ControlProps } from '@/editor/controls/type';

const EmojiControl = (props: ControlProps<EmojiPickerProps>) => {
  const { defaultValue, controlProps, size, onChange } = props;

  return (
    <EmojiPicker
      defaultValue={defaultValue}
      onChange={onChange}
      {...controlProps}
      size={size}
    />
  );
};

export default EmojiControl;
