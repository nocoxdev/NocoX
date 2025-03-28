import { IconAB2 } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Avatar, Button, List, Popconfirm, Skeleton } from 'antd';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { AppReleaseApi } from '@/services/api';
import { usePost } from '@/utils/hooks';

interface RollbackModalProps extends EnhancedModalProps {
  id: string;
}

const RollbackModal = (props: RollbackModalProps) => {
  const { id, onOk, ...restProps } = props;
  const message = useMessage();
  const { data: resp, loading } = useRequest(() =>
    AppReleaseApi.getAllVersions(id),
  );

  const { submitting, postAsync } = usePost(AppReleaseApi.rollback);

  const handleRollback = async (id: string) => {
    const resp = await postAsync(id);

    if (resp.success) {
      message.success(t('Rollback success'));
      onOk?.();
    } else {
      message.error(resp.message);
    }
  };

  return (
    <EnhancedModal title={t('Rollback')} {...restProps}>
      <Skeleton active loading={loading}>
        <List
          dataSource={resp?.data}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  item.favicon ? (
                    <Avatar src={item.favicon} />
                  ) : (
                    <IconAB2 size="20" color="#ea9343" />
                  )
                }
                title={item.version}
                description={item.description}
              />
              <Popconfirm
                title={t('Are you sure to rollback to this version?')}
                onConfirm={() => handleRollback(item.id)}
                okText={t('Yes')}
                cancelText={t('No')}
                okButtonProps={{ size: 'small' }}
                cancelButtonProps={{ size: 'small' }}
              >
                <Button type="link" size="small" loading={submitting}>
                  {t('Rollback')}
                </Button>
              </Popconfirm>
            </List.Item>
          )}
        />
      </Skeleton>
    </EnhancedModal>
  );
};

export default RollbackModal;
