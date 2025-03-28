import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { t } from 'i18next';
import NoWidget from '@/components/NoWidget';
import { useOptions } from '@/editor/hooks';
import type { EnhancedOptionsProps, WidgetProps } from '@/types';

const CheckboxGroupView = (
  props: WidgetProps<EnhancedOptionsProps<CheckboxGroupProps>>,
) => {
  const { options: enhancedOptions, className, ...restProps } = props;

  const { options } = useOptions(enhancedOptions, [enhancedOptions]);

  return options?.length ? (
    <Checkbox.Group
      {...restProps}
      rootClassName={className}
      options={options}
    />
  ) : (
    <NoWidget
      className={className}
      description={t('Please set the options')}
      width={120}
    />
  );
};

export default CheckboxGroupView;
