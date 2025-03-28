import { useMemo, useState } from 'react';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import TemplateDetailViewer from './TemplateDetailViewer';
import TemplatesExplorer from './TemplatesExplorer';

export interface AppTemplatesModalProps extends ModalProps {
  height?: number | string;
}

const AppTemplatesModal = (props: AppTemplatesModalProps) => {
  const { onCancel, ...rest } = props;

  const [currentTemplate, setCurrentTemplate] = useState('');

  const showTemplateDetail = useMemo(
    () => !!currentTemplate,
    [currentTemplate],
  );

  return (
    <Modal
      title={null}
      footer={null}
      width={1232}
      centered
      styles={{
        content: { padding: 0 },
      }}
      onCancel={(e) => {
        onCancel?.(e);
        setCurrentTemplate('');
      }}
      {...rest}
    >
      <TemplateDetailViewer
        id={currentTemplate}
        visible={showTemplateDetail}
        onBack={() => setCurrentTemplate('')}
      />

      <TemplatesExplorer
        visible={!showTemplateDetail}
        onSelect={setCurrentTemplate}
      />
    </Modal>
  );
};

export default AppTemplatesModal;
