import styled from 'styled-components';
import type { PageTemplateType } from '@/types';
import TemplateCard from './TemplateCard';

const StyledWrapper = styled.div`
  height: 452px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-block: 24px 48px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  width: 100%;
`;

interface TemplateListProps {
  items: PageTemplateType[];
}

const TemplateList = ({ items }: TemplateListProps) => {
  return (
    <StyledWrapper>
      <StyledContainer>
        {items.map((item) => (
          <TemplateCard key={item.id} item={item} />
        ))}
      </StyledContainer>
    </StyledWrapper>
  );
};

export default TemplateList;
