import {
  IconBorderRadius,
  IconRadiusBottomLeft,
  IconRadiusBottomRight,
  IconRadiusTopLeft,
  IconRadiusTopRight,
} from '@tabler/icons-react';
import MultiInputNumber from '@/components/MultiInputNumber';
import type { ControlProps } from '@/editor/controls/type';

const CornerControl = (props: ControlProps<any>) => {
  const { defaultValue, size, onChange } = props;
  return (
    <MultiInputNumber
      defaultValue={defaultValue}
      onChange={(val) => onChange(val)}
      unit="px"
      size={size}
      main={{ name: 'borderRadius', icon: IconBorderRadius }}
      subs={[
        { name: 'borderTopLeftRadius', icon: IconRadiusTopLeft },
        { name: 'borderTopRightRadius', icon: IconRadiusTopRight },
        { name: 'borderBottomLeftRadius', icon: IconRadiusBottomLeft },
        { name: 'borderBottomRightRadius', icon: IconRadiusBottomRight },
      ]}
    />
  );
};

export default CornerControl;
