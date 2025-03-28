import { useMemo } from 'react';
import { useRequest } from 'ahooks';
import type { RadioGroupProps } from 'antd';
import { Radio, Skeleton } from 'antd';
import { ResourceApi } from '@/services/api';

interface ExtensionRadioGroupProps extends Omit<RadioGroupProps, 'onChange'> {
  onChange: (value: string) => void;
}

const defalutAllOption = {
  value: '',
  label: 'All',
};

const ExtensionRadioGroup = (props: ExtensionRadioGroupProps) => {
  const { onChange, ...restProps } = props;

  const { data: resp, loading } = useRequest(() => ResourceApi.getExtensions());

  const options = useMemo(() => {
    const opts = resp?.data?.map((item) => ({
      label: item.toUpperCase(),
      value: item,
    }));

    return opts ? [defalutAllOption, ...opts] : [];
  }, [resp]);

  return loading ? (
    <Skeleton.Input active={true} />
  ) : (
    options.length > 1 && (
      <Radio.Group
        options={options}
        optionType="button"
        buttonStyle="solid"
        defaultValue={options[0]}
        {...restProps}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  );
};

export default ExtensionRadioGroup;
