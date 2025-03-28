import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';
import type { RadioGroupProps } from 'antd';
import { Radio, Tooltip } from 'antd';
import { t } from 'i18next';
import type { ControlProps } from '@/editor/controls/type';

const options = [
  { value: 'left', label: t('Left'), icon: <AlignLeftOutlined /> },
  { value: 'center', label: t('Center'), icon: <AlignCenterOutlined /> },
  { value: 'right', label: t('Right'), icon: <AlignRightOutlined /> },
];

const TextAlignControl = (props: ControlProps<RadioGroupProps>) => {
  const { controlProps, onChange, defaultValue, size } = props;

  const { buttonStyle, ...restProps } = controlProps || {};

  return (
    <Radio.Group
      {...restProps}
      style={{ width: '100%', display: 'flex' }}
      buttonStyle={buttonStyle}
      onChange={(e) => onChange({ textAlign: e.target.value })}
      defaultValue={defaultValue?.textAlign}
      size={size}
    >
      {options.map((item) => {
        return (
          <Tooltip title={item.label} key={item.value}>
            <Radio.Button
              value={item.value}
              style={{ width: '100%', textAlign: 'center' }}
              onClick={() => onChange(undefined)}
            >
              {item.icon}
            </Radio.Button>
          </Tooltip>
        );
      })}
    </Radio.Group>
  );
};

export default TextAlignControl;
