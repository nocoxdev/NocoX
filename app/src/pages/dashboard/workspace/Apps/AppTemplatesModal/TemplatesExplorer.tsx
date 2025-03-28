import type { CSSProperties } from 'react';
import { Flex } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import ModalHeader from '@/components/Modal/ModalHeader';
import CategoryPanel from './CategoryPanel';
import TemplateCard from './TemplateCard';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 68vh;
  min-height: 560px;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 48px);
`;

const StyledList = styled.div`
  width: calc(100% - 260px);
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
`;

interface TemplatesExplorerProps {
  visible?: boolean;
  style?: CSSProperties;
  onSelect: (id: string) => void;
}
const templates = [
  {
    id: '1',
    cover:
      'https://static.airtable.com/images/app_creation_entrypoint/ProjectManagement.png',
    title: 'title',
    tags: ['tag1', 'tag2'],
    description: 'description',
  },
];

const TemplatesExplorer = (props: TemplatesExplorerProps) => {
  const { style, visible, onSelect } = props;
  return (
    <StyledContainer
      style={{
        display: visible ? 'flex' : 'none',
        ...style,
      }}
    >
      <ModalHeader>{t('Select template')}</ModalHeader>
      <StyledContent>
        <CategoryPanel></CategoryPanel>
        <StyledList>
          <Flex gap={12} wrap="wrap">
            {templates.map(({ id, ...rest }) => (
              <TemplateCard onClick={() => onSelect(id)} {...rest} key={id} />
            ))}
          </Flex>
        </StyledList>
      </StyledContent>
    </StyledContainer>
  );
};

export default TemplatesExplorer;
