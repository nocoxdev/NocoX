import {
  IconBaselineDensityLarge,
  IconBaselineDensityMedium,
  IconBaselineDensitySmall,
  IconLineHeight,
} from '@tabler/icons-react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Flex, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { createGlobalStyle } from 'styled-components';
import { useCurrentSize } from '@/database/selectors';
import type { TableRowHeightType } from '@/types';

const GlobalStyle = createGlobalStyle`
  .antd-dropdown-row-height .ant-dropdown-menu .ant-dropdown-menu-item {
    padding: 4px 6px;
    margin-bottom: 6px;

    &.ant-dropdown-menu-item-selected {
      > .ant-dropdown-menu-title-content {
        color: ${({ theme }) => theme.colorPrimaryText};
      }
    }
  }
`;

const items: MenuProps['items'] = [
  {
    key: '1',
    type: 'group',
    label: t('Select row height'),
    children: [
      {
        key: 'small',
        label: (
          <Flex gap={6} align="center">
            <IconBaselineDensitySmall size={12} />
            {t('Small')}
          </Flex>
        ),
      },
      {
        key: 'medium',
        label: (
          <Flex gap={6} align="center">
            <IconBaselineDensityMedium size={12} />
            {t('Medium')}
          </Flex>
        ),
      },
      {
        key: 'large',
        label: (
          <Flex gap={6} align="center">
            <IconBaselineDensityLarge size={12} />
            {t('Large')}
          </Flex>
        ),
      },
    ],
  },
];

interface RowHeightProps {
  value: TableRowHeightType;
  onChange: (value: TableRowHeightType) => void;
}

export const RowHeight = observer((props: RowHeightProps) => {
  const { value, onChange } = props;
  const size = useCurrentSize();
  return (
    <>
      <GlobalStyle />
      <Dropdown
        trigger={['click']}
        menu={{
          items,
          selectable: true,
          selectedKeys: [value],
          onSelect: (info) => {
            onChange(info.key as any);
          },
        }}
        overlayStyle={{ width: 150 }}
        overlayClassName="antd-dropdown-row-height"
      >
        <Tooltip title={t('Row height')}>
          <Button type="text" size={size}>
            <IconLineHeight stroke={2} size={14} />
          </Button>
        </Tooltip>
      </Dropdown>
    </>
  );
});
