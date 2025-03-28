import type { ReactNode } from 'react';
import { use } from 'react';
import { Form } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import NoWidget from '@/components/NoWidget';
import { useCollectParams, useCollectStates } from '@/editor/hooks';
import { hasChildren } from '@/utils/helpers';
import { BodyCellContext, ProTableWidgetContext } from '../context';

const StyledForm = styled(Form)`
  display: inline-block;
  width: 100%;
`;

interface BodyCellViewProps {
  children?: React.ReactNode | undefined;
  style?: React.CSSProperties;
  className?: string;
}

const BodyCellView = (props: BodyCellViewProps) => {
  const { children, className, style } = props;
  const { record } = use(BodyCellContext);
  const { columns } = use(ProTableWidgetContext);

  useCollectParams({ dataId: record.id });

  useCollectStates(
    {
      name: 'columns',
      title: t('Table Columns'),
      items:
        columns
          ?.filter((item) => item.dataValueType !== undefined)
          .map((column) => ({
            global: false,
            name: column.dataIndex,
            value: record[column.dataIndex],
            title: column.title as ReactNode,
            valueType: column.dataValueType,
          })) || [],
    },
    [record, columns],
  );

  return (
    <StyledForm
      initialValues={record}
      noValidate
      rootClassName={className}
      style={style}
    >
      {hasChildren(children) ? (
        children
      ) : (
        <NoWidget height={28} description={t('Drag the component here')} />
      )}
    </StyledForm>
  );
};

export default BodyCellView;
