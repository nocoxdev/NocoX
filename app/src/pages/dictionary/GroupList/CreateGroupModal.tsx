import { useState } from 'react';
import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { useMessage } from '@/selectors';
import { DictionaryGroupApi } from '@/services/api';
import type { DictionaryGroupFormValues } from './GroupForm';
import GroupForm from './GroupForm';

const CreateGroupModal = (props: EnhancedModalProps) => {
  const { onOk, onClose, ...restProps } = props;

  const message = useMessage();
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (values: DictionaryGroupFormValues) => {
    setSubmitting(true);
    const resp = await DictionaryGroupApi.create(values);

    if (resp.success) {
      message.success(t('Add data success'));
      onOk?.();
    } else {
      message.error(resp.message);
    }
    setSubmitting(false);
  };

  return (
    <EnhancedModal
      title={t('Create Group')}
      width={400}
      contentStyle={{ paddingTop: 0 }}
      onClose={onClose}
      wrapperStyle={{ paddingBottom: 0 }}
      {...restProps}
    >
      <GroupForm
        submiting={submitting}
        onSubmit={handleAdd}
        onCancel={() => onClose?.()}
      />
    </EnhancedModal>
  );
};

export default CreateGroupModal;
