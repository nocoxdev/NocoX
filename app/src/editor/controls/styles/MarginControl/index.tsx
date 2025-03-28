import {
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBoxAlignRight,
  IconBoxAlignTop,
  IconBoxMargin,
} from '@tabler/icons-react';
import MultiInputNumber from '@/components/MultiInputNumber';
import type { ControlProps } from '@/editor/controls/type';

const MarginControl = (props: ControlProps<any>) => {
  const { defaultValue, size, onChange } = props;

  return (
    <MultiInputNumber
      defaultValue={defaultValue}
      size={size}
      onChange={(val) => onChange(val)}
      unit="px"
      main={{ name: 'margin', icon: IconBoxMargin }}
      subs={[
        { name: 'marginLeft', icon: IconBoxAlignLeft },
        { name: 'marginRight', icon: IconBoxAlignRight },
        { name: 'marginTop', icon: IconBoxAlignTop },
        { name: 'marginBottom', icon: IconBoxAlignBottom },
      ]}
    />
  );
};

export default MarginControl;
