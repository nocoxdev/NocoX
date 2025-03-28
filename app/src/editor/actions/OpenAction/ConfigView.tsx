import { useMemo } from 'react';
import { Form, Select } from 'antd';
import { t } from 'i18next';
import type { ActionConfigViewProps } from '../type';

const OpenModalConfigView = (props: ActionConfigViewProps) => {
  const { node, size, variant } = props;

  const modals = useMemo(
    () =>
      node.page.nodes
        .filter(
          (item) =>
            item.widget.name === 'modal' || item.widget.name === 'popconfirm',
        )
        .map((item) => ({ value: item.id, label: item.label })),
    [node.page.nodes],
  );

  return (
    <Form.Item
      label={t('Popup Name')}
      rules={[{ required: true, message: t('Please select popup') }]}
      name="nodeId"
    >
      <Select
        placeholder={t('Please select popup')}
        size={size}
        variant={variant}
        style={{ width: '100%' }}
        options={modals}
      />
    </Form.Item>
  );
};

export default OpenModalConfigView;
