import type { InputProps } from 'antd';
import { Input } from 'antd';
import type { WidgetProps } from '@/types';

const InputView = (props: WidgetProps<InputProps>) => {
  const { className, ...restProps } = props;
  return (
    <Input
      {...restProps}
      rootClassName={className}
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );
};

export default InputView;
