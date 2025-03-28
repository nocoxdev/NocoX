import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  IconDotsVertical,
  IconFileDescription,
  IconHome,
  IconLayout,
} from '@tabler/icons-react';
import { Button, Flex } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import type { ActionMenusType } from '@/components/ActionMenu';
import ActionMenu from '@/components/ActionMenu';
import { useApp } from '@/editor/selectors';
import type { AppPage } from '@/editor/stores';
import { useMessage } from '@/selectors';
import { PageType } from '@/types';
import type { PageFormModalValues } from './PageFormModal';
import PageFormModal from './PageFormModal';

const StyledPageItemWrapper = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  height: 24px;
  padding-left: 4px;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colorPrimary : theme.colorText};
  font-size: ${({ theme }) => theme.fontSize}px;
  user-select: none;
  width: 100%;
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius}px;

  > :first-child {
    width: calc(100% - 16px);
  }
`;

const StyledActionWrapper = styled.div`
  visibility: hidden;
  ${StyledPageItemWrapper}:hover & {
    visibility: visible;
  }
`;

const StyledTitle = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colorPrimary : theme.colorText};

  .title {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* font-weight: 500; */
  }
`;

export interface PageItemProps {
  selected: boolean;
  page: AppPage;
  style?: CSSProperties;
}

const PageItem = observer((props: PageItemProps) => {
  const { page, selected, style } = props;
  const theme = useTheme();
  const message = useMessage();
  const app = useApp();

  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const [pageModalOpen, setPageModalOpen] = useState(false);

  const handleUpdatePage = async (values: PageFormModalValues) => {
    const resp = await app.updatePage(
      page.id,
      values.path,
      values.title,
      values.description,
    );
    if (resp.success) {
      message.success(t('Update success'));
      setPageModalOpen(false);
    } else {
      message.error(resp.message);
    }
  };

  const handleRemove = async () => {
    const resp = await app.deletePage(page.id);
    if (resp.success) {
      message.success(t('Delete page success'));
      setActionMenuOpen(false);
    } else {
      message.error(resp.message);
    }
  };

  const items: ActionMenusType = useMemo(
    () => [
      {
        icon: <EditOutlined />,
        title: t('Edit'),
        onClick: (e: any) => {
          e?.stopPropagation();
          e?.preventDefault();
          setPageModalOpen(true);
          setActionMenuOpen(false);
        },
      },
      'divider',
      {
        icon: <DeleteOutlined />,
        title: t('Delete'),
        className: 'danger',
        loading: app.requestStates.deletePage.status === 'pending',
        confirm: {
          title: t('Are you sure to delete?'),
          okText: t('Ok'),
          cancelText: t('Cancel'),
          okButtonProps: { type: 'primary', danger: true },
        },
        onClick: () => handleRemove(),
      },
    ],
    [app.requestStates.deletePage.status],
  );

  return (
    <StyledPageItemWrapper $selected={selected} style={style}>
      <Flex gap={6} align="center">
        {page.type === PageType.LAYOUT ? (
          <IconLayout
            size={12}
            color={selected ? theme.colorPrimary : theme.colorTextSecondary}
          />
        ) : page.path?.replace('/', '') === '' ? (
          <IconHome
            size={12}
            color={selected ? theme.colorPrimary : theme.colorTextSecondary}
          />
        ) : (
          <IconFileDescription
            size={12}
            color={selected ? theme.colorPrimary : theme.colorTextSecondary}
          />
        )}
        <StyledTitle $selected={selected}>
          <span className="title">{page.title}</span>

          {/* <span>:</span>
          <span className="path">{page.path}</span> */}
        </StyledTitle>
      </Flex>

      <ActionMenu
        items={items}
        open={actionMenuOpen}
        onOpenChange={(val) => setActionMenuOpen(val)}
      >
        <StyledActionWrapper>
          <Button
            type="link"
            size="small"
            onClick={() => setActionMenuOpen(!actionMenuOpen)}
          >
            <IconDotsVertical size={12} color={theme.colorTextTertiary} />
          </Button>
        </StyledActionWrapper>
      </ActionMenu>

      <PageFormModal
        title={
          page.type === PageType.LAYOUT ? t('Edit layout') : t('Edit page')
        }
        initialValues={page.info}
        open={pageModalOpen}
        onClose={() => setPageModalOpen(false)}
        onSubmit={handleUpdatePage}
        submiting={app.requestStates.updatePage.status === 'pending'}
      />
    </StyledPageItemWrapper>
  );
});

export default PageItem;
