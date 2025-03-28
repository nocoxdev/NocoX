import { IconEdit } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Button, DatePicker, Flex, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { t } from 'i18next';
import styled, { useTheme } from 'styled-components';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { AppReleaseApi } from '@/services/api';
import { usePost } from '@/utils/hooks';
import ResourceSelect from '../../common/Resource/ResourceSelect';

const StyledContent = styled.div`
  min-height: 280px;

  .ant-form-item {
    margin-bottom: 16px;

    .ant-form-item-label {
      font-size: 13px;
      font-weight: 600;
      color: ${({ theme }) => theme.textColorSecondary};
    }
  }
`;

interface EditModalProps extends EnhancedModalProps {
  id: string;
}

const EditModal = (props: EditModalProps) => {
  const { id, onClose, onOk, ...restProps } = props;

  const message = useMessage();
  const theme = useTheme();
  const { submitting, postAsync } = usePost(AppReleaseApi.update);

  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(() => AppReleaseApi.get(id));

  const handleSubmit = async (values: any) => {
    const resp = await postAsync({
      id,
      ...values,
    });

    if (resp.success) {
      message.success('Update success');
      onOk?.();
    } else {
      message.error(resp.message);
    }
  };

  const title = (
    <Flex align="center" gap={4}>
      <IconEdit size={14} />
      {t('Edit')}
    </Flex>
  );

  return (
    <EnhancedModal
      {...restProps}
      onClose={onClose}
      width={600}
      title={title}
      loading={loading}
      error={resp?.success !== true && resp?.message}
      onErrorReset={() => runAsync()}
    >
      {!loading && (
        <StyledContent>
          <Form
            colon={false}
            size="small"
            layout="vertical"
            initialValues={{
              ...resp?.data,
              onlineTime: dayjs(resp?.data?.onlineTime, 'YYYY-MM-DD HH:mm:ss'),
              offlineTime: dayjs(
                resp?.data?.offlineTime,
                'YYYY-MM-DD HH:mm:ss',
              ),
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="title"
              label={t('Title')}
              required
              rules={[{ required: true }]}
            >
              <Input placeholder={t('Please input title')} />
            </Form.Item>

            <Form.Item name="favicon" label={t('Favicon')}>
              <ResourceSelect
                hasInput={false}
                style={{
                  width: 120,
                  height: 80,
                  padding: 4,
                  borderRadius: theme.borderRadius,
                  border: `1px solid ${theme.colorBorderSecondary}`,
                }}
              />
            </Form.Item>

            <Form.Item name="onlineTime" label={t('Online Time')}>
              <DatePicker
                showTime
                placeholder={t('Please pick online time')}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item name="offlineTime" label={t('Offline Time')}>
              <DatePicker
                showTime
                placeholder={t('Please pick offline time')}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item name="description" label={t('Description')}>
              <Input.TextArea
                rows={5}
                placeholder={t('Please input version description')}
              />
            </Form.Item>

            <Form.Item>
              <Flex justify="end" gap={10}>
                <Button type="text" size="small" onClick={() => onClose?.()}>
                  {t('Cancel')}
                </Button>
                <Button
                  type="primary"
                  size="small"
                  htmlType="submit"
                  loading={submitting}
                >
                  {t('Save changes')}
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </StyledContent>
      )}
    </EnhancedModal>
  );
};

export default EditModal;
