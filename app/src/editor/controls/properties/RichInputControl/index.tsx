import type { ControlProps } from '@/editor/controls/type';
import type { RichInputProps } from './RichInput';
import RichInput from './RichInput';

const RichInputControl = (props: ControlProps<RichInputProps>) => {
  const { defaultValue, controlProps, size, onChange } = props;

  return (
    <RichInput
      {...controlProps}
      value={defaultValue}
      onChange={onChange}
      size={size}
    />
  );
};

export default RichInputControl;
