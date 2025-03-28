import type { CheckboxProps } from 'antd';
import { Checkbox } from 'antd';
import type { WidgetProps } from '@/types';

const CheckboxView = (
  props: WidgetProps<CheckboxProps & { label?: string }>,
) => {
  const { className, label, ...restProps } = props;

  return (
    <Checkbox {...restProps} rootClassName={className}>
      {label}
    </Checkbox>
  );
};

export default CheckboxView;
