import { Fragment } from 'react';
import { Form, Input, Segmented } from 'antd';
import { t } from 'i18next';
import { MessageTypeOptions } from '../constants';
import type { ActionConfigViewProps } from '../type';

const ShowNotificationConfigView = (props: ActionConfigViewProps) => {
  const { size, variant } = props;

  return (
    <Fragment>
      <Form.Item label={t('Type')} name="type">
        <Segmented
          options={MessageTypeOptions}
          block
          size={size}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        label={t('Notification')}
        rules={[{ required: true, message: t('Please input notification') }]}
        name="notification"
      >
        <Input.TextArea
          rows={3}
          placeholder={t('Input notification')}
          size={size}
          variant={variant}
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Fragment>
  );
};

export default ShowNotificationConfigView;
