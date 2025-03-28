import { useMemo } from 'react';
import { Form, Select } from 'antd';
import { t } from 'i18next';
import type { ActionConfigViewProps } from '../type';

const OpenModalConfigView = (props: ActionConfigViewProps) => {
  const { node, size, variant } = props;

  const buttons = useMemo(
    () =>
      node.page.nodes
        .filter((item) => item.widget.name === 'button')
        .map((item) => ({ value: item.id, label: item.label })),
    [node.page.nodes],
  );

  return (
    <Form.Item
      label={t('Button name')}
      rules={[{ required: true, message: t('Please select button') }]}
      name="nodeId"
    >
      <Select
        placeholder={t('Select button')}
        size={size}
        variant={variant}
        style={{ width: '100%' }}
        options={buttons}
      />
    </Form.Item>
  );
};

export default OpenModalConfigView;
