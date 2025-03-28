import { useControllableValue } from 'ahooks';
import { Space } from 'antd';
import { getIcon } from '@/components/IconPicker/utils';
import type { ControlProps } from '@/editor/controls/type';
import type { IconValueType } from '@/types';
import ColorInput from './ColorInput';
import IconInput from './IconInput';
import SizeInput from './SizeInput';

export interface IconControlExtraProps {
  useSize?: boolean;
  useColor?: boolean;
  allowClear?: boolean;
  closeAfterSelect?: boolean;
}

const IconControl = (props: ControlProps<IconControlExtraProps>) => {
  const { controlProps, size, variant } = props;
  const {
    useSize = true,
    useColor = true,
    closeAfterSelect = false,
    allowClear = true,
  } = controlProps || {};
  const [value, setValue] = useControllableValue<IconValueType | undefined>(
    props,
  );

  const handleIconChange = (val: IconValueType | undefined) => {
    if (val) {
      setValue({ ...value, ...val });
    } else {
      setValue(undefined);
    }
  };

  return (
    <Space size={4}>
      <IconInput
        value={value?.name}
        closeAfterSelect={closeAfterSelect}
        onChange={(name) => handleIconChange(getIcon(name))}
        showClear={allowClear}
        size={size}
      />
      {useColor && (
        <ColorInput
          value={value?.color}
          onChange={(val) => value && setValue({ ...value, color: val })}
          size={size}
        />
      )}
      {useSize && (
        <SizeInput
          value={value?.size || '1em'}
          onChange={(val) => value && setValue({ ...value, size: val })}
          size={size}
          variant={variant}
        />
      )}
    </Space>
  );
};

export default IconControl;
