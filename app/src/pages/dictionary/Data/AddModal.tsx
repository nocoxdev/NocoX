import { useMemo, useState } from 'react';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { dictionaryApi } from '@/services/api';
import type { DictionaryFormValues } from './DataForm';
import DictionaryForm from './DataForm';

interface AddModalProps extends EnhancedModalProps {
  groupId: string;
  parentId?: string;
}

const AddModal = (props: AddModalProps) => {
  const { groupId, parentId, onOk, onClose, ...restProps } = props;

  const message = useMessage();
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (values: DictionaryFormValues) => {
    setSubmitting(true);
    const resp = await dictionaryApi.add({ ...values, groupId, parentId });

    if (resp.success) {
      message.success(t('Add data success'));
      onOk?.();
    } else {
      message.error(resp.message);
    }
    setSubmitting(false);
  };

  const initialValues = useMemo(() => {
    return {
      parentId,
      groupId,
      name: '',
      title: '',
      order: 0,
      enabled: true,
    };
  }, [parentId, groupId]);

  return (
    <EnhancedModal
      title={t('Add Data')}
      width={400}
      contentStyle={{ paddingTop: 0 }}
      onClose={onClose}
      wrapperStyle={{ paddingBottom: 0 }}
      destroyOnClose
      {...restProps}
    >
      <DictionaryForm
        initialValues={initialValues}
        onSubmit={handleAdd}
        onCancel={() => onClose?.()}
        okText={t('Submit')}
        submiting={submitting}
      />
    </EnhancedModal>
  );
};

export default AddModal;
