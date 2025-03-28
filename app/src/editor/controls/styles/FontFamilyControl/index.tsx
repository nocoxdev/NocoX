import { IconTypography } from '@tabler/icons-react';
import type { ColorPickerProps } from 'antd';
import Select from '@/components/Select';
import type { ControlProps } from '@/editor/controls/type';

const FontFamilyControl = (props: ControlProps<ColorPickerProps>) => {
  const { defaultValue, size, onChange } = props;

  return (
    <Select
      size={size}
      prefix={<IconTypography color="rgba(0, 0, 0, 0.88)" size={13} />}
      defaultValue={defaultValue?.fontFamily}
      onChange={(val) => onChange({ fontFamily: val })}
      style={{ width: '100%' }}
      options={[]}
    />
  );
};

export default FontFamilyControl;
