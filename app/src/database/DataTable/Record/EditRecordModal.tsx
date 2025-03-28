import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { Empty } from 'antd';
import classNames from 'classnames';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import EnhancedModal from '@/components/Modal';
import { useCurrentTable, useRowKey } from '@/database/selectors';
import { useMessage } from '@/selectors';
import RecordForm from './RecordForm';

const StyledHeaderSelect = styled.div`
  display: flex;
  gap: 8px;
  svg {
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
      stroke: ${({ theme }) => theme.colorTextSecondary};
    }
    &.disabled {
      stroke: ${({ theme }) => theme.colorTextDisabled};
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`;

const EditRecordModal = observer(() => {
  const theme = useTheme();
  const table = useCurrentTable();
  const message = useMessage();

  const { recordStore, columnStore } = table;
  const rowKey = useRowKey();

  const currentIndex = recordStore.records.findIndex(
    (record) => record[rowKey] === recordStore.currentEditRecord?.[rowKey],
  );

  const hasNext = currentIndex < recordStore.records.length - 1;
  const hasPrevious = currentIndex > 0;

  const handleUpdate = async (values: Record<string, any>) => {
    const resp = await recordStore.updateRecord(
      recordStore.currentEditRecord?.[rowKey],
      values,
    );

    if (resp.success) {
      recordStore.setCurrentEditRecordId();
    } else {
      message.error(resp.message);
    }
  };

  // const headerDeleteButton = {
  //   name: 'remove',
  //   children: (
  //     <Tooltip title="Delete record">
  //       <Button
  //         className="danger"
  //         size="small"
  //         type="text"
  //         icon={<IconTrash size={14} />}
  //         onClick={() =>
  //           recordStore.deleteRecord([recordStore.currentEditRecord?.[rowKey]])
  //         }
  //       />
  //     </Tooltip>
  //   ),
  // };

  const title = (
    <StyledHeaderSelect>
      <IconChevronUp
        size={16}
        color={theme.colorTextTertiary}
        className={classNames({ disabled: !hasPrevious })}
        onClick={() =>
          recordStore.setCurrentEditRecordId(
            recordStore.records[currentIndex - 1][rowKey],
          )
        }
      />
      <IconChevronDown
        size={16}
        color={theme.colorTextTertiary}
        className={classNames({ disabled: !hasNext })}
        onClick={() =>
          recordStore.setCurrentEditRecordId(
            recordStore.records[currentIndex + 1][rowKey],
          )
        }
      />
    </StyledHeaderSelect>
  );

  return (
    <EnhancedModal
      destroyOnClose
      maskClosable={false}
      open={!!recordStore.currentEditRecord}
      onClose={() => recordStore.setCurrentEditRecordId()}
      title={title}
      width={500}
      // headerExpandButtons={[headerDeleteButton]}
    >
      {columnStore.columns.filter((item) => !item.info.system).length > 0 ? (
        <RecordForm
          key={recordStore.currentEditRecord?.[rowKey]}
          initialValues={recordStore.currentEditRecord}
          loading={recordStore.requestStates.update.status === 'pending'}
          onCancel={() => recordStore.setCurrentEditRecordId()}
          onSave={(values) => handleUpdate(values)}
        />
      ) : (
        <Empty description={t('No data column can be edited')} />
      )}
    </EnhancedModal>
  );
});

export default EditRecordModal;
