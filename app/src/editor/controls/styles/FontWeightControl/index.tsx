import { BoldOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { t } from 'i18next';
import Select from '@/components/Select';
import type { ControlProps } from '@/editor/controls/type';

const weigthOptions = [
  { value: 'normal', label: t('Normal') },
  { value: 'bold', label: t('Bold') },
  { value: 'bolder', label: t('Bolder') },
  { value: 'lighter', label: t('Lighter') },
  { value: '100', label: '100' },
  { value: '200', label: '200' },
  { value: '300', label: '300' },
  { value: '400', label: '400' },
  { value: '500', label: '500' },
  { value: '600', label: '600' },
  { value: '700', label: '700' },
  { value: '800', label: '800' },
  { value: '900', label: '900' },
];

const FontWeightControl = (props: ControlProps<SelectProps>) => {
  const { defaultValue, size, onChange } = props;

  return (
    <Select
      prefix={<BoldOutlined />}
      defaultValue={defaultValue?.fontWeight}
      onChange={(val) => onChange({ fontWeight: val })}
      style={{ width: '100%' }}
      options={weigthOptions}
      allowClear
      size={size}
    />
  );
};

export default FontWeightControl;
