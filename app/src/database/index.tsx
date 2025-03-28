import { useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons-react';
import { Breadcrumb, Button, Empty, Layout, Tooltip } from 'antd';
import type { SiderTheme } from 'antd/es/layout/Sider';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import { StyledBreadcrumbTitle } from '@/components/common.styled';
import DataTable from '@/database/DataTable';
import TableList from '@/database/TableList';
import { PageHeader } from '@/pages/common/PageHeader';
import { useSite } from '@/selectors';
import { useStore } from './selectors';

const StyledSider = styled.div``;

const StyledTitleContainer = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  padding-inline: 4px;
  gap: 8px;
`;

const Database = observer(() => {
  const theme = useTheme();
  const site = useSite();
  const navigate = useNavigate();

  const store = useStore();

  const breadcrumbItems = [
    {
      title: t('All Tables'),
    },
    {
      title: (
        <StyledBreadcrumbTitle>{store.current?.title}</StyledBreadcrumbTitle>
      ),
    },
  ];

  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Layout.Sider
        theme={site.theme as SiderTheme}
        width={theme.widthMenu}
        style={{
          height: '100%',
          borderRight: `1px solid ${theme.colorBorderSecondary}`,
        }}
      >
        <StyledSider>
          <StyledTitleContainer>
            <Tooltip title={t('Back')} placement="top">
              <Button type="text" onClick={() => navigate('/')} size="small">
                <IconArrowLeft size={12} color={theme.colorPrimaryTextActive} />
              </Button>
            </Tooltip>

            <span>{t('Database')}</span>
          </StyledTitleContainer>

          <TableList />
        </StyledSider>
      </Layout.Sider>

      <Layout style={{ background: '#fff' }}>
        <Layout.Header style={{ height: 48, lineHeight: 48, padding: 0 }}>
          <PageHeader>
            <Breadcrumb style={{ marginLeft: 24 }} items={breadcrumbItems} />
          </PageHeader>
        </Layout.Header>
        <Layout.Content style={{ padding: 24, background: '#f5f7fa' }}>
          {store.current ? (
            <DataTable key={store.current.id} />
          ) : (
            <Empty
              description={t('Please create or select a data table')}
              style={{ marginTop: 100 }}
            />
          )}
        </Layout.Content>
      </Layout>
    </Layout>
  );
});

export default Database;
