import { InputNumber } from 'antd';
import type { ValueComponentProps } from '@/types';

export const NumberColumn = (props: ValueComponentProps) => {
  return <InputNumber {...props} autoFocus style={{ width: '100%' }} />;
};
