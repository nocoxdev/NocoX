import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';
import type { ControlProps } from '@/editor/controls/type';

const TimeControl = (props: ControlProps<TimePickerProps>) => {
  const { defaultValue, controlProps = {}, size, variant, onChange } = props;

  const { use12Hours, format, ...restProps } = controlProps || {};

  return (
    <TimePicker
      defaultValue={defaultValue}
      onChange={onChange}
      style={{ width: '100%' }}
      use12Hours={use12Hours}
      format={format}
      {...restProps}
      size={size}
      variant={variant}
    />
  );
};

export default TimeControl;
