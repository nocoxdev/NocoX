import { ItalicOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { t } from 'i18next';
import Select from '@/components/Select';
import type { ControlProps } from '@/editor/controls/type';

const stylehOptions = [
  { value: 'normal', label: t('Normal') },
  {
    value: 'italic',
    label: t('Italic'),
  },
  {
    value: 'oblique',
    label: t('Oblique'),
  },
];

const FontStyleControl = (props: ControlProps<SelectProps>) => {
  const { defaultValue, size, onChange } = props;

  return (
    <Select
      size={size}
      prefix={<ItalicOutlined />}
      defaultValue={defaultValue?.fontStyle}
      onChange={(val) => onChange({ fontStyle: val })}
      style={{ width: '100%' }}
      options={stylehOptions}
      allowClear
    />
  );
};

export default FontStyleControl;
