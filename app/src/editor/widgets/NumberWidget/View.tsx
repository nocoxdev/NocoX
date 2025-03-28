import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import type { WidgetProps } from '@/types';

const NumberView = (props: WidgetProps<InputNumberProps>) => {
  const { className, ...restProps } = props;
  return <InputNumber {...restProps} rootClassName={className} />;
};

export default NumberView;
