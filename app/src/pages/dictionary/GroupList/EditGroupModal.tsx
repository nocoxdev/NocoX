import { useState } from 'react';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { DictionaryGroupApi } from '@/services/api';
import type { DictionaryGroupFormValues } from './GroupForm';
import GroupForm from './GroupForm';

interface EditGroupModalProps extends EnhancedModalProps {
  initialValues: DictionaryGroupFormValues & { id: string };
}

const EditGroupModal = (props: EditGroupModalProps) => {
  const { initialValues, onOk, onClose, ...restProps } = props;

  const message = useMessage();
  const [submitting, setSubmitting] = useState(false);

  const handleUpdate = async (values: DictionaryGroupFormValues) => {
    setSubmitting(true);
    const resp = await DictionaryGroupApi.update({
      ...initialValues,
      ...values,
    });

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
      title={t('Edit group')}
      width={400}
      onClose={onClose}
      contentStyle={{ paddingTop: 0 }}
      wrapperStyle={{ paddingBottom: 0 }}
      {...restProps}
    >
      <GroupForm
        onSubmit={handleUpdate}
        onCancel={() => onClose?.()}
        initialValues={initialValues}
        submiting={submitting}
      />
    </EnhancedModal>
  );
};

export default EditGroupModal;
