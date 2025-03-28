import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useStore } from '@/database/selectors';
import TableForm from './TableForm';

const CreateTableModal = observer((props: EnhancedModalProps) => {
  const { onOk, onClose, ...restProps } = props;

  const store = useStore();
  return (
    <EnhancedModal
      title={t('Create Table')}
      width={400}
      contentStyle={{ paddingTop: 0 }}
      onClose={onClose}
      wrapperStyle={{ paddingBottom: 0 }}
      {...restProps}
    >
      <TableForm
        onOk={async (values) => {
          const resp = await store.createTable(values);
          resp.success && onOk?.();
        }}
        onCancel={() => onClose?.()}
      />
    </EnhancedModal>
  );
});

export default CreateTableModal;
