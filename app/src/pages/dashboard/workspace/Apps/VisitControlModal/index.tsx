import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import RoleList from './RoleList';

const VisitControlModal = (props: EnhancedModalProps) => {
  return (
    <EnhancedModal
      {...props}
      width={1200}
      title={t('Visit Control')}
      contentStyle={{ padding: 0 }}
    >
      <RoleList />
    </EnhancedModal>
  );
};

export default VisitControlModal;
