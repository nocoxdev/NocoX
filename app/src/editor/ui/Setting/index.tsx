import { useState } from 'react';
import { Layout, Splitter } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import {
  StyledBreadcrumbTitle,
  StyledContentContainer,
} from '@/components/common.styled';
import Header from '../components/Header';
import { settingItems } from './constants';
import SettingList from './SettingList';
import type { SettingItemType } from './type';

const StyledLayoutHeader = styled(Layout.Header)`
  padding: 0;
  height: ${({ theme }) => theme.heightHeader}px;
  line-height: 1;
  min-width: 1080px;
`;

const Setting = observer(() => {
  const theme = useTheme();
  const [current, setCurrent] = useState<SettingItemType>(settingItems[0]);

  const breadcrumbItems = [
    {
      title: t('App Settings'),
    },
    {
      title: <StyledBreadcrumbTitle>{current?.label}</StyledBreadcrumbTitle>,
    },
  ];

  return (
    <Layout>
      <StyledLayoutHeader>
        <Header title={t('Settings')} items={breadcrumbItems} />
      </StyledLayoutHeader>
      <Layout>
        <Splitter>
          <Splitter.Panel
            min={220}
            max={500}
            defaultSize={theme.widthDesignerLeftSidebar}
          >
            <SettingList
              items={settingItems}
              current={current}
              setCurrent={setCurrent}
            />
          </Splitter.Panel>
          <Splitter.Panel>
            <StyledContentContainer>{current?.content}</StyledContentContainer>
          </Splitter.Panel>
        </Splitter>
      </Layout>
    </Layout>
  );
});

export default Setting;
