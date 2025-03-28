import { useState } from 'react';
import { useRequest } from 'ahooks';
import { Button, DatePicker, Flex, Form, Input, Spin } from 'antd';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useApp } from '@/editor/selectors';
import { useMessage } from '@/selectors';
import { AppApi, AppReleaseApi } from '@/services/api';

const AppReleaseModal = (props: EnhancedModalProps) => {
  const { open, onOk, onClose, ...restProps } = props;
  const [releasing, setReleasing] = useState(false);
  const message = useMessage();
  const app = useApp();

  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(() => AppReleaseApi.getInfo(app.id), {
    refreshDeps: [app.id],
  });

  const handleRelease = async (values: any) => {
    setReleasing(true);
    const resp = await AppApi.release({
      id: app.id,
      ...values,
    });

    if (resp.success) {
      message.success(t('Release new version success'));
      onOk?.();
    } else {
      message.error(resp.message);
    }

    setReleasing(false);
  };
  return (
    open && (
      <EnhancedModal
        title={
          loading ? (
            <Spin size="small" spinning />
          ) : resp?.success ? (
            resp?.data?.currentVersion ? (
              t('Current latest release version: {{version}}', {
                version: resp?.data?.currentVersion,
              })
            ) : (
              t('No release version')
            )
          ) : (
            'Error'
          )
        }
        {...restProps}
        open={open}
        width={400}
        onClose={onClose}
        loading={loading}
        error={resp?.success ? false : resp?.message}
        onErrorReset={() => runAsync()}
      >
        <Form
          colon={false}
          size="small"
          layout="vertical"
          initialValues={resp?.data || { title: app.info.title }}
          onFinish={handleRelease}
        >
          <Form.Item
            name="version"
            label={t('Version')}
            required
            rules={[{ required: true }]}
          >
            <Input placeholder={t('Please input version')} />
          </Form.Item>

          <Form.Item
            name="title"
            label={t('Title')}
            required
            rules={[{ required: true }]}
          >
            <Input placeholder={t('Please input title')} />
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

          <Form.Item>
            <Flex justify="end" gap={10}>
              <Button type="text" size="small" onClick={() => onClose?.()}>
                {t('Cancel')}
              </Button>
              <Button
                type="primary"
                size="small"
                htmlType="submit"
                loading={releasing}
              >
                {t('Release')}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </EnhancedModal>
    )
  );
};

export default AppReleaseModal;
