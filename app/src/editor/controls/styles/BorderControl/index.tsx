import {
  DashOutlined,
  MinusOutlined,
  SmallDashOutlined,
} from '@ant-design/icons';
import {
  IconBorderBottom,
  IconBorderLeft,
  IconBorderRight,
  IconBorderSides,
  IconBorderTop,
} from '@tabler/icons-react';
import { ColorPicker, Select, Tooltip } from 'antd';
import { t } from 'i18next';
import { omit } from 'lodash-es';
import { styled } from 'styled-components';
import MultiInputNumber from '@/components/MultiInputNumber';
import type { ControlProps } from '@/editor/controls/type';

export const StyledContainer = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;

  .ant-select-selection-item {
    text-align: center;
  }
`;

const options = [
  {
    value: 'solid',
    label: (
      <Tooltip title={t('Solid')}>
        <MinusOutlined />
      </Tooltip>
    ),
  },
  {
    value: 'dashed',
    label: (
      <Tooltip title={t('Dashed')}>
        <DashOutlined />
      </Tooltip>
    ),
  },
  {
    value: 'dotted',
    label: (
      <Tooltip title={t('Dotted')}>
        <SmallDashOutlined />
      </Tooltip>
    ),
  },
];

const BorderControl = (props: ControlProps<any>) => {
  const { defaultValue, size, onChange } = props;

  return (
    <StyledContainer>
      <MultiInputNumber
        style={{ width: 'calc(100% - 94px)' }}
        defaultValue={omit(defaultValue, ['borderStyle', 'borderColor'])}
        onChange={(val) => {
          onChange({ ...defaultValue, ...val });
        }}
        unit="px"
        size={size}
        main={{ name: 'borderWidth', icon: IconBorderSides }}
        subs={[
          { name: 'borderLeftWidth ', icon: IconBorderLeft },
          { name: 'borderTopWidth', icon: IconBorderTop },
          { name: 'borderRightWidth', icon: IconBorderRight },
          { name: 'borderBottomWidth', icon: IconBorderBottom },
        ]}
      >
        <Select
          style={{ width: 60 }}
          options={options}
          allowClear
          size={size}
          defaultValue={defaultValue?.borderStyle}
          onChange={(borderStyle) => onChange({ ...defaultValue, borderStyle })}
        />
        <ColorPicker
          showText={false}
          style={{
            width: 32,
          }}
          allowClear
          size={size}
          defaultValue={defaultValue?.borderColor}
          onChange={(color) =>
            onChange({ ...defaultValue, borderColor: color.toHexString() })
          }
        />
      </MultiInputNumber>
    </StyledContainer>
  );
};

export default BorderControl;
