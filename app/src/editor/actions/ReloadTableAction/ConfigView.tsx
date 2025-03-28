import { useMemo } from 'react';
import { Form, Select } from 'antd';
import { t } from 'i18next';
import type { ActionConfigViewProps } from '../type';

const ReloadTableConfigView = (props: ActionConfigViewProps) => {
  const { node, size, variant } = props;

  const tables = useMemo(
    () =>
      node.page.nodes
        .filter((item) => item.widget.name === 'table')
        .map((item) => ({ value: item.id, label: item.label })),
    [node.page.nodes],
  );

  return (
    <Form.Item
      label={t('Table name')}
      rules={[{ required: true, message: t('Please select table') }]}
      name="nodeId"
    >
      <Select
        placeholder={t('Select table')}
        size={size}
        variant={variant}
        style={{ width: '100%' }}
        options={tables}
      />
    </Form.Item>
  );
};

export default ReloadTableConfigView;
