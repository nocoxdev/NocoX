import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import { useTreeOptions } from '@/editor/hooks';
import type { EnhancedOptionsProps, WidgetProps } from '@/types';

const CascaderView = (
  props: WidgetProps<EnhancedOptionsProps<CascaderProps>>,
) => {
  const { options: enhancedOptions, className, ...restProps } = props;

  const { options } = useTreeOptions(enhancedOptions, [enhancedOptions]);

  return (
    <Cascader {...restProps} rootClassName={className} options={options} />
  );
};

export default CascaderView;
