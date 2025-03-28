import type { RateProps } from 'antd';
import { Rate } from 'antd';
import type { WidgetProps } from '@/types';

const RateView = (props: WidgetProps<RateProps>) => {
  const { className, ...restProps } = props;
  return <Rate {...restProps} rootClassName={className} />;
};

export default RateView;
