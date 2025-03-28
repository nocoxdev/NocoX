import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import type { WidgetProps } from '@/types';

const DatePickerView = (props: WidgetProps<DatePickerProps>) => {
  const { className, ...restProps } = props;
  return <DatePicker {...restProps} rootClassName={className} />;
};

export default DatePickerView;
