import { useState } from 'react';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { dictionaryApi } from '@/services/api';
import type { DictionaryFormValues } from './DataForm';
import DictionaryForm from './DataForm';

interface EditModalProps extends EnhancedModalProps {
  initialValues: DictionaryFormValues & { id: string };
}

const EditModal = (props: EditModalProps) => {
  const { initialValues, onOk, onClose, ...restProps } = props;

  const message = useMessage();
  const [submitting, setSubmitting] = useState(false);

  const handleUpdate = async (values: DictionaryFormValues) => {
    setSubmitting(true);
    const resp = await dictionaryApi.update({ ...initialValues, ...values });

    if (resp.success) {
      message.success(t('Update data success'));
      onOk?.();
    } else {
      message.error(resp.message);
    }

    setSubmitting(false);
  };

  return (
    <EnhancedModal
      title={t('Update Data')}
      width={400}
      onClose={onClose}
      contentStyle={{ paddingTop: 0 }}
      wrapperStyle={{ paddingBottom: 0 }}
      {...restProps}
    >
      <DictionaryForm
        okText="Save"
        onSubmit={handleUpdate}
        onCancel={() => onClose?.()}
        initialValues={initialValues}
        submiting={submitting}
      />
    </EnhancedModal>
  );
};

export default EditModal;
