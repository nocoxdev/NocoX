import { useMemo } from 'react';
import { Form, Select } from 'antd';
import { t } from 'i18next';
import type { ActionConfigViewProps } from '../type';

const CloseModalConfigView = (props: ActionConfigViewProps) => {
  const { node, size, variant } = props;

  const modals = useMemo(
    () =>
      node.page.nodes
        .filter(
          (item) =>
            item.widget.name === 'modal' || item.widget.name === 'popconfirm',
        )
        .map((item) => ({ value: item.id, label: item.label })),
    [node.app.nodes],
  );

  return (
    <Form.Item
      label={t('Popup name')}
      rules={[{ required: true, message: t('Please select popup') }]}
      name="nodeId"
    >
      <Select
        placeholder={t('Select popup')}
        options={modals}
        size={size}
        variant={variant}
      />
    </Form.Item>
  );
};

export default CloseModalConfigView;
