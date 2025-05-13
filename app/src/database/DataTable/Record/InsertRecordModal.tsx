import { Empty } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import EnhancedModal from '@/components/Modal';
import { useCurrentTable } from '@/database/selectors';
import RecordForm from './RecordForm';

interface InsertRecordModalProps {
  open: boolean;
  onClose: () => void;
}

const InsertRecordModal = observer((props: InsertRecordModalProps) => {
  const { open, onClose } = props;
  const table = useCurrentTable();
  const { recordStore, columnStore } = table;

  const handleInsert = async (values: Record<string, any>) => {
    const resp = await recordStore.insertRecord(values);
    resp.success && onClose();
  };

  return (
    <EnhancedModal
      maskClosable={false}
      open={open}
      onClose={onClose}
      title={t('Insert record')}
      width={500}
      destroyOnHidden
    >
      {columnStore.columns.filter((item) => !item.info.system).length > 0 ? (
        <RecordForm
          loading={recordStore.requestStates.add.status === 'pending'}
          onCancel={onClose}
          onSave={(values) => handleInsert(values)}
        />
      ) : (
        <Empty description={t('No data can be added')} />
      )}
    </EnhancedModal>
  );
});

export default InsertRecordModal;
