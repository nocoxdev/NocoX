import { use } from 'react';
import { styled } from 'styled-components';
import { DraggableTreeContext } from './DraggableTreeContext';

const StyledContainer = styled.div<{ $left: number; $canDrop: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  border: 1px dashed
    ${({ theme, $canDrop }) =>
      $canDrop ? theme.colorPrimary : theme.colorError};
  pointer-events: none;
  height: 100%;
  background-color: transparent;
  left: ${({ $left }) => $left}px;
  width: ${({ $left }) => `calc(100% - ${$left}px)`};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

interface ParentHighlightProps {
  level: number;
  canDrop: boolean;
}

const ParentHighlight = (props: ParentHighlightProps) => {
  const { level, canDrop } = props;
  const { indent } = use(DraggableTreeContext);
  return <StyledContainer $left={indent * level} $canDrop={canDrop} />;
};

export default ParentHighlight;
