import { useMemo, useState } from 'react';
import { useResponsive } from 'ahooks';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import type { EnhancedModalProps } from '@/components/Modal';
import EnhancedModal from '@/components/Modal';
import { templates } from '@/editor/templates';
import { PageTempateContext } from './context';
import CreatePagePanel from './CreatePagePanel';
import TemplateList from './TemplateList';

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;

  .ant-tabs-nav {
    margin-bottom: 0px;
  }
`;

interface TemplatesModalProps extends EnhancedModalProps {
  parentId?: string;
}

const allTemplates = templates.flatMap((template) => template.items);

const TemplatesModal = observer((props: TemplatesModalProps) => {
  const { parentId, onOk, onClose } = props;
  const [current, setCurrent] = useState('');
  const responsive = useResponsive();

  const tabs: TabsProps['items'] = templates.map((item) => ({
    key: item.name,
    label: item.label,
    children: <TemplateList key={item.name} items={item.items} />,
  }));

  const contextValue = useMemo(() => {
    return {
      templates: allTemplates,
      current,
      parentId,
      setCurrent,
    };
  }, [parentId, current]);

  return (
    <EnhancedModal
      title={t('Select page template')}
      width={1200}
      contentStyle={{ paddingTop: 0 }}
      wrapperStyle={{ paddingBottom: 0 }}
      centered={responsive['xl']}
      {...props}
    >
      <PageTempateContext.Provider value={contextValue}>
        <StyledContent>
          <Tabs defaultActiveKey="1" items={tabs} style={{ width: '100%' }} />
          <CreatePagePanel onOk={() => onOk?.()} onCancel={() => onClose?.()} />
        </StyledContent>
      </PageTempateContext.Provider>
    </EnhancedModal>
  );
});

export default TemplatesModal;
