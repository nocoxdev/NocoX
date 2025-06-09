import type { CSSProperties } from 'react';
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { IconReload, IconSearch, IconTrash } from '@tabler/icons-react';
import { Button, Input, Popconfirm, Tag, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import { useApp } from '@/editor/selectors';
import { useMessage } from '@/selectors';
import { AppApi } from '@/services/api';
import type { RoleResponse } from '@/services/responses';
import RoleSelectModal from './RoleSelectModal';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  .ant-pro-table {
    .ant-pro-table-alert {
      background-color: ${({ theme }) => theme.colorFillTertiary};
      .ant-pro-table-alert-container {
        padding-block: 6px;
      }
    }
  }
`;

interface RoleListProps {
  style?: CSSProperties;
}

const RoleList = observer(({ style }: RoleListProps) => {
  const theme = useTheme();
  const actionRef = useRef<ActionType>(null);

  const app = useApp();

  const [keywords, setKeywords] = useState<string>('');
  const [roleSelectModalOpen, setRoleSelectModalOpen] = useState(false);
  const message = useMessage();
  const [total, setTotal] = useState(0);

  const columns: ProColumns<RoleResponse>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',

      render: (text) => <Tag color={theme.colorPrimary}>{text}</Tag>,
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      key: 'description',

      ellipsis: true,
    },

    {
      title: t('Action'),
      key: 'action',

      render: (_, record) => (
        <Popconfirm
          title={t('Are you sure you want to remove this role?')}
          onConfirm={async () => {
            const resp = await AppApi.removeRoles({
              id: app.id,
              roleIds: [record.id],
            });

            if (resp.success) {
              message.success(t('Delete success'));
              actionRef.current?.reload();
            } else {
              message.error(resp.message);
            }
          }}
          okText={t('Yes')}
          cancelText={t('No')}
          okButtonProps={{
            danger: true,
            size: 'small',
          }}
          cancelButtonProps={{ size: 'small', type: 'text' }}
        >
          <Button
            danger
            type="text"
            size="small"
            icon={
              <AntdIcon
                content={IconTrash}
                size={14}
                color={theme.colorErrorText}
              />
            }
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <StyledContainer style={style}>
      <ProTable
        actionRef={actionRef}
        columns={columns}
        rowKey="id"
        pagination={false}
        size="small"
        toolbar={{
          title: `${t('Role list')} (${total})`,
          search: (
            <Input
              size="small"
              placeholder={t('Please input keywords')}
              style={{ width: 300 }}
              allowClear
              // variant="filled"
              onChange={(e) => setKeywords(e.target.value)}
              value={keywords}
              onPressEnter={() => actionRef.current?.reload()}
              suffix={
                <IconSearch
                  size={theme.fontSize}
                  stroke={1.5}
                  style={{
                    cursor: 'pointer',
                    color: theme.colorTextTertiary,
                    userSelect: 'none',
                  }}
                  onClick={() => actionRef.current?.reload()}
                />
              }
            />
          ),
          actions: [
            <Button
              key="key"
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              style={{ width: 100 }}
              onClick={() => setRoleSelectModalOpen(true)}
            >
              {t('Add Roles')}
            </Button>,
            <Tooltip title={t('Reload')} placement="top">
              <Button
                type="text"
                size="small"
                icon={
                  <AntdIcon
                    content={IconReload}
                    size={16}
                    stroke={1.5}
                    color={theme.colorTextSecondary}
                  />
                }
                onClick={() => actionRef.current?.reload()}
              />
            </Tooltip>,
          ],
          settings: [],
        }}
        search={false}
        rowSelection={false}
        tableAlertRender={false}
        request={async () => {
          const resp = await AppApi.getRoles(app.id);
          setTotal(resp?.data?.length || 0);
          return {
            data: resp?.data,
            success: resp.success,
          };
        }}
      />
      {roleSelectModalOpen && (
        <RoleSelectModal
          appId={app.id}
          open={roleSelectModalOpen}
          onClose={() => setRoleSelectModalOpen(false)}
          onOk={() => {
            setRoleSelectModalOpen(false);
            actionRef.current?.reload();
          }}
        />
      )}
    </StyledContainer>
  );
});

export default RoleList;
