import { Fragment } from 'react';
import { Form, Segmented } from 'antd';
import { t } from 'i18next';
import CodeEditor from '@/components/CodeEditor';
import { MessageTypeOptions } from '../constants';
import type { ActionConfigViewProps } from '../type';

const ShowMessageConfigView = (_: ActionConfigViewProps) => {
  return (
    <Fragment>
      <Form.Item label={t('Type')} name="type">
        <Segmented options={MessageTypeOptions} block />
      </Form.Item>
      <Form.Item
        label={t('Message')}
        rules={[{ required: true, message: t('Please input message') }]}
        name="message"
      >
        <CodeEditor showExpandButton={false} height="100px" />
      </Form.Item>
    </Fragment>
  );
};

export default ShowMessageConfigView;
