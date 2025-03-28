import { Outlet } from 'react-router';
import type { LayoutProps } from 'antd';
import { Layout } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import { useAppRunningMode } from '@/editor/selectors';

const StyledTip = styled.div`
  display: flex;
  padding: 24px;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 360px;
  color: ${({ theme }) => theme.colorTextTertiary};
`;

const ContentView = (props: LayoutProps) => {
  const mode = useAppRunningMode();

  return (
    <Layout.Content
      {...props}
      style={{
        // minHeight: 360,
        background: mode === 'edit' ? 'white' : 'transparent',
        margin: '24px 16px 0',
        ...props.style,
      }}
    >
      {mode === 'edit' && <StyledTip>{t('Page Content Area')}</StyledTip>}
      <Outlet />
    </Layout.Content>
  );
};

export default ContentView;
