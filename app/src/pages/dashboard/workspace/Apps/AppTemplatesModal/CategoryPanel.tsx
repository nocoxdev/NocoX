import { useState } from 'react';
import { IconEyeDiscount, IconSearch } from '@tabler/icons-react';
import { Input } from 'antd';
import { t } from 'i18next';
import styled, { useTheme } from 'styled-components';
import Navigation from '@/components/Navigation';
import type { NavItemType } from '@/components/Navigation/type';

const StyledCategoryPanel = styled.div`
  border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  width: 200px;
  padding: 20px 0px 20px 20px;
  overflow: hidden;
`;

const StyledCategories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: calc(100% - 20px);
  margin-top: 4px;
  overflow: auto;
`;

const CategoryPanel = () => {
  const theme = useTheme();
  const [keywords, setKeywords] = useState('');
  const [selectedKey, setSelectedKey] = useState('');

  const items: NavItemType[] = [
    {
      key: '0',
      label: <div>{t('admin')}</div>,
      type: 'group',
      children: [
        {
          key: 'edu1',
          label: 'Basic Layout',
          icon: <span>👨🏻‍🎓</span>,
        },
        {
          key: 'edu2',
          label: 'Basic Layout1111111111',
          icon: <IconEyeDiscount size={14} stroke={2} />,
        },
        {
          key: 'edu3',
          label: 'Basic Layout222',
          icon: <IconEyeDiscount size={14} stroke={2} />,
        },
        {
          key: 'edu4',
          label: 'Basic Layout33333333333333333333333333',
          icon: <IconEyeDiscount size={14} stroke={2} />,
        },
      ],
    },
    {
      key: '2',
      label: <div>问卷调查</div>,
      type: 'group',
      children: [
        {
          key: 'aedu1',
          label: 'Basic Layout',
          icon: <span>👨🏻‍🎓</span>,
        },
        {
          key: 'aedu2',
          label: 'Basic Layout1111111111',
          icon: <IconEyeDiscount size={14} stroke={2} />,
        },
        {
          key: 'aedu3',
          label: 'Basic Layout222',
          icon: <IconEyeDiscount size={14} stroke={2} />,
        },
        {
          key: 'aedu4',
          label: 'Basic Layout33333333333333333333333333',
          icon: <IconEyeDiscount size={14} stroke={2} />,
        },
      ],
    },
  ];
  return (
    <StyledCategoryPanel>
      <Input
        allowClear
        variant="filled"
        prefix={<IconSearch size={13} color={theme.colorTextQuaternary} />}
        placeholder={t('Search templates')}
        style={{ width: 'calc(100% - 20px)' }}
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <StyledCategories>
        <Navigation
          items={items}
          onSelect={(key) =>
            key === selectedKey ? setSelectedKey('') : setSelectedKey(key)
          }
          selectedKey={selectedKey}
          style={{ width: 'calc(100% - 16px)' }}
        />
      </StyledCategories>
    </StyledCategoryPanel>
  );
};

export default CategoryPanel;
