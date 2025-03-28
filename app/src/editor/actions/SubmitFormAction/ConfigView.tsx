import { useMemo } from 'react';
import { Form, Select } from 'antd';
import { t } from 'i18next';
import type { ActionConfigViewProps } from '../type';

const SubmitFormConfigView = (props: ActionConfigViewProps) => {
  const { node, size, variant } = props;

  const forms = useMemo(
    () =>
      node.page.nodes
        .filter((item) => item.widget.name === 'form')
        .map((item) => ({
          value: item.id,
          label: item.label,
        })),
    [node.page.nodes],
  );

  return (
    <Form.Item
      label={t('Form')}
      rules={[{ required: true, message: 'Please select form' }]}
      name="nodeId"
    >
      <Select
        placeholder={t('Select form')}
        options={forms}
        size={size}
        variant={variant}
        style={{ width: '100%' }}
        allowClear
      />
    </Form.Item>
  );
};

export default SubmitFormConfigView;
