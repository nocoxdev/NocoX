import type { RadioGroupProps } from 'antd';
import { Radio } from 'antd';
import { t } from 'i18next';
import NoWidget from '@/components/NoWidget';
import { useOptions } from '@/editor/hooks';
import type { EnhancedOptionsProps, WidgetProps } from '@/types';

const RadiosView = (
  props: WidgetProps<EnhancedOptionsProps<RadioGroupProps>>,
) => {
  const { options: enhancedOptions, className, ...restProps } = props;
  const { options } = useOptions(enhancedOptions, [enhancedOptions]);

  if (!options?.length) {
    return (
      <NoWidget
        className={className}
        description={t('Please set the options')}
        width={120}
      />
    );
  }

  return (
    <Radio.Group {...restProps} rootClassName={className} options={options} />
  );
};

export default RadiosView;
