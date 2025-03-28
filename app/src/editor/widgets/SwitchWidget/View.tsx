import type { SwitchProps } from 'antd';
import { Switch } from 'antd';
import type { WidgetProps } from '@/types';

const SwitchView = (props: WidgetProps<SwitchProps>) => {
  const { className, ...restProps } = props;
  return <Switch {...restProps} rootClassName={className} />;
};

export default SwitchView;
