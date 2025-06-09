import { useMemo, useState } from 'react';
import { IconBoxMultiple, IconFile, IconPlus } from '@tabler/icons-react';
import { Button } from 'antd';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import type { ActionMenusType } from '@/components/ActionMenu';
import ActionMenu from '@/components/ActionMenu';
import ErrorBoundary from '@/components/ErrorBoundary';
import StickyPanel from '@/components/StickyPanel';
import { useApp } from '@/editor/selectors';
import { useMessage } from '@/selectors';
import { PageType } from '@/types';
import TemplatesModal from '../TemplateModal';
import type { GroupFormModalValues } from './GroupFormModal';
import GroupFormModal from './GroupFormModal';
import GroupList from './GroupList';

const StyledContainer = styled.div`
  position: relative;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  height: 24px;
  padding-inline: 12px;
  width: 100%;

  > span {
    font-weight: 600;
    color: ${({ theme }) => theme.colorText};
  }
`;

const Pages = () => {
  const app = useApp();
  const theme = useTheme();
  const message = useMessage();
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const [pageModalOpen, setPageModalOpen] = useState(false);

  const handleCreateGroup = async (values: GroupFormModalValues) => {
    var resp = await app.addPage(
      PageType.GROUP,
      null,
      '',
      values.title,
      values.description,
      '',
    );
    if (resp.success) {
      message.success(t('Add success'));
      setCreateGroupModalOpen(false);
    } else {
      message.error(resp.message);
    }
  };

  const items: ActionMenusType = useMemo(
    () => [
      {
        icon: <IconBoxMultiple size={12} />,
        title: t('Create group'),
        onClick: (e: any) => {
          setCreateGroupModalOpen(true);
          setActionMenuOpen(false);
          e?.stopPropagation();
          e?.preventDefault();
        },
      },
      'divider',
      {
        icon: <IconFile size={12} />,
        title: t('Add page'),
        onClick: (e: any) => {
          setPageModalOpen(true);
          setActionMenuOpen(false);
          e?.stopPropagation();
          e?.preventDefault();
        },
      },
    ],
    [],
  );

  const header = (
    <StyledHeader>
      <span>{t('Pages')}</span>
      <ActionMenu
        items={items}
        open={actionMenuOpen}
        onOpenChange={(val) => setActionMenuOpen(val)}
      >
        <Button
          type="link"
          size="small"
          icon={<IconPlus size={13} color={theme.colorTextSecondary} />}
          onClick={() => setActionMenuOpen(!actionMenuOpen)}
        />
      </ActionMenu>
    </StyledHeader>
  );

  return (
    <StyledContainer>
      <StickyPanel header={header}>
        <ErrorBoundary onReset={() => app.fetchPages()}>
          <GroupList />
        </ErrorBoundary>
      </StickyPanel>

      <TemplatesModal
        open={pageModalOpen}
        afterOpenChange={setPageModalOpen}
        onClose={() => setPageModalOpen(false)}
        onOk={() => setPageModalOpen(false)}
      />
      <GroupFormModal
        title={t('Add group')}
        open={createGroupModalOpen}
        onSubmit={handleCreateGroup}
        submiting={app.requestStates.addPage.status === 'pending'}
        onClose={() => setCreateGroupModalOpen(false)}
      />
    </StyledContainer>
  );
};

export default Pages;
