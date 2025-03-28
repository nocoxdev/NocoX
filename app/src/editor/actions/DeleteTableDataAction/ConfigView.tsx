import { Fragment, useMemo } from 'react';
import { Form, Select } from 'antd';
import { t } from 'i18next';
import widget from '@/editor/widgets/TableWidget/BodyCellWidget';
import type { ActionConfigViewProps } from '../type';

const DeleteTableDataAction = (props: ActionConfigViewProps) => {
  const { node, size, variant } = props;

  const tables = useMemo(
    () =>
      node.page.nodes
        .filter((item) => item.widget.name === 'table')
        .map((item) => ({ value: item.id, label: item.label })),
    [node.page.nodes],
  );

  const inBodyCell = useMemo(
    () => node.ancestors.find((item) => item.name === widget.name),
    [node.ancestors],
  );

  const types = [
    {
      value: 'current',
      label: 'Current Row',
    },
    {
      value: 'selections',
      label: 'Selections',
    },
  ];

  const type = useMemo(() => {
    return inBodyCell ? 'current' : 'selections';
  }, [inBodyCell]);

  return (
    <Fragment>
      <Form.Item
        label={t('Type')}
        rules={[{ required: true, message: 'Please select type' }]}
        name="type"
        initialValue={type}
      >
        <Select
          placeholder={t('Select type')}
          options={types}
          size={size}
          variant={variant}
          disabled
          style={{ width: '100%' }}
          allowClear
        />
      </Form.Item>

      <Form.Item
        label={t('Table')}
        rules={[{ required: true, message: 'Please select table' }]}
        name="nodeId"
      >
        <Select
          placeholder={t('Select table')}
          options={tables}
          size={size}
          variant={variant}
          style={{ width: '100%' }}
          allowClear
        />
      </Form.Item>
    </Fragment>
  );
};

export default DeleteTableDataAction;
