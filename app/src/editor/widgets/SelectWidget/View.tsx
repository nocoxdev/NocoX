import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { t } from 'i18next';
import { useOptions } from '@/editor/hooks';
import type { EnhancedOptionsProps, WidgetProps } from '@/types';

const SelectView = (props: WidgetProps<EnhancedOptionsProps<SelectProps>>) => {
  const { options: enhancedOptions, className, ...restProps } = props;
  const { options, loading, error } = useOptions(enhancedOptions, [
    enhancedOptions,
  ]);

  return (
    <Select
      {...restProps}
      options={options}
      loading={loading}
      rootClassName={className}
      notFoundContent={error || t('No data')}
    />
  );
};

export default SelectView;
