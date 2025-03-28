import type { ExColorPickerProps } from '@/components/ExColorPicker';
import ExColorPicker from '@/components/ExColorPicker';
import type { ControlProps } from '@/editor/controls/type';

const ColorControl = (props: ControlProps<ExColorPickerProps>) => {
  const { defaultValue, size, onChange } = props;

  const {
    showText = true,
    placement = 'bottom',
    ...restProps
  } = props.controlProps || {};

  return (
    <ExColorPicker
      defaultValue={defaultValue}
      onChange={onChange}
      showText={showText}
      placement={placement}
      onClear={() => onChange(undefined)}
      allowClear
      {...restProps}
      size={size}
    />
  );
};

export default ColorControl;
