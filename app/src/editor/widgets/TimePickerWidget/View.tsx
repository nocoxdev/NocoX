import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';
import type { WidgetProps } from '@/types';

const TimePickerView = (props: WidgetProps<TimePickerProps>) => {
  const { className, ...restProps } = props;
  return <TimePicker {...restProps} rootClassName={className} />;
};

export default TimePickerView;
