import { Input } from 'antd';
import type { PasswordProps } from 'antd/es/input';
import type { WidgetProps } from '@/types';

const PasswordView = (props: WidgetProps<PasswordProps>) => {
  const { className, ...restProps } = props;
  return (
    <Input.Password
      {...restProps}
      rootClassName={className}
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );
};

export default PasswordView;
