import type { ControlProps } from '@/editor/controls/type';
import type { RichTextProps } from './RichText';
import RichText from './RichText';

const RichTextControl = (props: ControlProps<RichTextProps>) => {
  const { defaultValue, controlProps, size, onChange } = props;

  return (
    <RichText
      {...controlProps}
      value={defaultValue}
      onChange={onChange}
      size={size}
    />
  );
};

export default RichTextControl;
