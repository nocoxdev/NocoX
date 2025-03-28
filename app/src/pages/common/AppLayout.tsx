import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Logo from './Logo';

const StyledMenuContainer = styled.div`
  flex: 1 1 0%;
  overflow: hidden auto;
  padding: 8px;
  .ant-menu-item-group-title {
    color: #aaa;
  }
  &.collapsed {
    .ant-menu-item-group-title {
      display: flex;
      justify-content: center;
      color: #aaa;
    }
  }
`;

const StyledSiderFooterContainer = styled.div``;

const StyledCollapseButton = styled.div<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-end')};
  padding: 10px 12px;
  border-top: 1px solid #444;
  cursor: pointer;
  margin-block: 4px;
  .anticon {
    color: #888;
  }
`;

interface AppLayoutProps {
  logoUrl?: string;
  appName?: string;
  menuContent?: ReactNode;
  children?: ReactNode;
}

const AppLayout = observer((props: AppLayoutProps) => {
  const { logoUrl, appName, menuContent, children } = props;

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Layout.Sider
        collapsed={collapsed}
        theme="dark"
        collapsedWidth={56}
        width={228}
      >
        <Logo
          className="dark"
          title={appName}
          logo={logoUrl}
          collapsed={collapsed}
          style={{
            borderBottom: 'none',
            height: 64,
          }}
        />

        <StyledMenuContainer className={classNames({ collapsed })}>
          {menuContent}
        </StyledMenuContainer>
        <StyledSiderFooterContainer>
          <StyledCollapseButton
            $collapsed={collapsed}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          </StyledCollapseButton>
        </StyledSiderFooterContainer>
      </Layout.Sider>
      <Layout>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
});

export default AppLayout;
