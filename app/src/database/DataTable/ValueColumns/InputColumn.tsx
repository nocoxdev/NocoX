import { Input } from 'antd';
import type { ValueComponentProps } from '@/types';

export const InputColumn = (props: ValueComponentProps) => {
  const { onChange, ...restProps } = props;

  return (
    <Input
      {...restProps}
      onChange={(e) => onChange?.(e.target.value)}
      autoFocus
      style={{ width: '100%' }}
    />
  );
};
