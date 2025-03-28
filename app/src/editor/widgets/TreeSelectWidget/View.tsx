import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import { t } from 'i18next';
import { useTreeOptions } from '@/editor/hooks';
import type { EnhancedTreeOptionsProps, WidgetProps } from '@/types';

const TreeSelectView = (
  props: WidgetProps<EnhancedTreeOptionsProps<TreeSelectProps>>,
) => {
  const { treeData: enhancedOptions, className, ...restProps } = props;
  const { options, loading, error } = useTreeOptions(enhancedOptions, [
    enhancedOptions,
  ]);

  return (
    <TreeSelect
      {...restProps}
      rootClassName={className}
      treeData={options}
      loading={loading}
      notFoundContent={error || t('No data')}
    />
  );
};

export default TreeSelectView;
