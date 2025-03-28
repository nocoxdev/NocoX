import { t } from 'i18next';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import ResourceList from './ResourceList';

export interface ResourceModalProps extends EnhancedModalProps {
  onSelect: (id: string) => void;
}

const ResourceModal = (props: ResourceModalProps) => {
  const { onSelect, ...modalProps } = props;

  return (
    <EnhancedModal
      title={t('Resource')}
      width={1044}
      maskClosable={false}
      contentStyle={{ paddingBlock: 12, paddingInline: 24, minHeight: 400 }}
      {...modalProps}
    >
      <ResourceList onSelect={onSelect} />
    </EnhancedModal>
  );
};

export default ResourceModal;
