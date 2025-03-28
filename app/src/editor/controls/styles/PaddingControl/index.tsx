import {
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBoxAlignRight,
  IconBoxAlignTop,
  IconBoxPadding,
} from '@tabler/icons-react';
import MultiInputNumber from '@/components/MultiInputNumber';
import type { ControlProps } from '@/editor/controls/type';

const PaddingControl = (props: ControlProps<any>) => {
  const { defaultValue, size, onChange } = props;

  return (
    <MultiInputNumber
      defaultValue={defaultValue}
      onChange={(val) => onChange(val)}
      unit="px"
      size={size}
      main={{ name: 'padding', icon: IconBoxPadding }}
      subs={[
        { name: 'paddingLeft', icon: IconBoxAlignLeft },
        { name: 'paddingRight', icon: IconBoxAlignRight },
        { name: 'paddingTop', icon: IconBoxAlignTop },
        { name: 'paddingBottom', icon: IconBoxAlignBottom },
      ]}
    />
  );
};

export default PaddingControl;
