import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input';
import type { WidgetProps } from '@/types';

const InputSearchView = (props: WidgetProps<SearchProps>) => {
  const { className, ...restProps } = props;
  return (
    <Input.Search
      {...restProps}
      rootClassName={className}
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );
};

export default InputSearchView;
