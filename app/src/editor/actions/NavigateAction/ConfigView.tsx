import { Fragment, useState } from 'react';
import { Form, Input, Segmented, Select } from 'antd';
import { t } from 'i18next';
import { NavigateToTypeOptions } from '../constants';
import type { ActionConfigViewProps, NavigateToType } from '../type';

const NavigateToConfigView = (props: ActionConfigViewProps) => {
  const { node, size, variant, data } = props;
  const [type, setType] = useState<NavigateToType>(data?.['type']);

  const pages = node.app.pages.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <Fragment>
      <Form.Item label={t('Type')}>
        <Segmented
          options={NavigateToTypeOptions}
          onChange={setType}
          block
          size={size}
        />
      </Form.Item>

      {type === 'page' && (
        <Form.Item
          label={t('Page name')}
          name="type"
          rules={[{ required: true, message: t('Please select page') }]}
        >
          <Select
            placeholder={t('Select page')}
            options={pages}
            size={size}
            variant={variant}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      {type === 'url' && (
        <Form.Item
          label={t('URL')}
          name="url"
          rules={[{ required: true, message: t('Please input url') }]}
        >
          <Input
            placeholder={t('Input url')}
            size={size}
            variant={variant}
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}
    </Fragment>
  );
};

export default NavigateToConfigView;
