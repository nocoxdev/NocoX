import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { t } from 'i18next';
import type { ControlProps } from '@/editor/controls/type';
import { useOptions } from '@/editor/hooks';
import type { EnhancedOptionsProps } from '@/types';

const SelectControl = (
  props: ControlProps<EnhancedOptionsProps<SelectProps>>,
) => {
  const { controlProps, defaultValue, size, variant, onChange } = props;

  const { options, loading, error } = useOptions(controlProps?.options || [], [
    controlProps?.options,
  ]);

  return (
    <Select
      style={{ width: '100%' }}
      defaultValue={defaultValue}
      onChange={onChange}
      allowClear
      {...controlProps}
      options={options}
      loading={loading}
      notFoundContent={error || t('No data')}
      size={size}
      variant={variant}
    />
  );
};

export default SelectControl;
