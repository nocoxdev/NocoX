import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useStore } from '@/database/selectors';
import type { TableFormValues } from './TableForm';
import TableForm from './TableForm';

interface CreateTableModalProps extends EnhancedModalProps {
  initialValues: TableFormValues & { id: string };
}

const EditTableModal = observer((props: CreateTableModalProps) => {
  const { initialValues, onOk, ...restProps } = props;

  const store = useStore();

  return (
    <EnhancedModal
      title={t('Update Table')}
      width={400}
      contentStyle={{ paddingTop: 0 }}
      wrapperStyle={{ paddingBottom: 0 }}
      {...restProps}
    >
      <TableForm
        initialValues={initialValues}
        okText={t('Save')}
        onCancel={() => props.onClose?.()}
        submiting={store.requestStates.update.status === 'pending'}
        onOk={async (values) => {
          const resp = await store.updateTable(initialValues.id, values);
          resp.success && onOk?.();
        }}
      />
    </EnhancedModal>
  );
});

export default EditTableModal;
