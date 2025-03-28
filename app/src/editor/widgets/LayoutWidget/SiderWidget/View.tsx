import React, { useState } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import type { SiderProps } from 'antd';
import {
  theme as antdTheme,
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
} from 'antd';
import { styled, useTheme } from 'styled-components';
import { useCollectStates } from '@/editor/hooks';
import { UiType } from '@/types';

const StyledTriggerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  flex-direction: column;
  padding-inline: 8px;
  gap: 8px;
`;

interface SiderViewProps extends Omit<SiderProps, 'collapsedWidth'> {
  collapsedWidth?: number;
  style?: React.CSSProperties;
}

const SiderView = (props: SiderViewProps) => {
  const { children, collapsible, theme, collapsedWidth, style, ...rest } =
    props;
  const [collapsed, setCollapsed] = useState(false);
  const tokens = useTheme();

  useCollectStates(
    {
      global: true,
      name: 'sider-collapsed',
      title: 'Sidbar Collapsed',
      items: [
        {
          name: 'collapsed',
          title: 'Sidbar Collapsed',
          valueType: UiType.Bool,
          value: collapsed,
        },
      ],
    },
    [collapsed],
  );

  return (
    <Layout.Sider
      {...rest}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      theme={theme}
      collapsedWidth={collapsedWidth}
      style={{
        borderRight:
          theme === 'light'
            ? `1px solid ${tokens.colorBorderSecondary}`
            : undefined,
        ...style,
      }}
    >
      <ConfigProvider
        theme={{
          algorithm:
            theme === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
        }}
      >
        <Flex justify="space-between" vertical style={{ height: '100%' }}>
          <Flex vertical> {children}</Flex>
          {collapsible && (
            <StyledTriggerContainer>
              {collapsed && <Divider style={{ marginBlock: 0 }} />}
              <Flex
                align="center"
                justify={collapsed ? 'center' : 'flex-end'}
                style={{ width: '100%' }}
              >
                <Button
                  type="text"
                  size={collapsed ? 'middle' : 'small'}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    width: collapsed ? '32px' : '28px',
                    color:
                      theme === 'light' ? tokens.colorTextTertiary : undefined,
                  }}
                  icon={
                    collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />
                  }
                />
              </Flex>
            </StyledTriggerContainer>
          )}
        </Flex>
      </ConfigProvider>
    </Layout.Sider>
  );
};

export default SiderView;
