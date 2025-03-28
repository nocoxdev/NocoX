import type { SliderSingleProps } from 'antd';
import { Slider } from 'antd';
import type { WidgetProps } from '@/types';

const SliderView = (props: WidgetProps<SliderSingleProps>) => {
  const { className, ...restProps } = props;
  return <Slider {...restProps} rootClassName={className} />;
};

export default SliderView;
