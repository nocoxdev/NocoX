import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useDraggingNodeRect } from '@/editor/hooks';
import { useCanvas } from '../../../selectors';

const StyledContainer = styled.div`
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  background-color: ${({ theme }) => theme.colorSuccess}22;
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

const DraggingMask = observer(() => {
  const rect = useDraggingNodeRect();
  const canvas = useCanvas();
  const canvasRect = canvas.rect;

  if (!rect || !canvasRect) return null;

  const sourceStyle = {
    height: rect.height + 2,
    width: rect.width + 2,
    left: rect.left - canvasRect.left - 1,
    top: rect.top - canvasRect.top - 1,
  };

  return sourceStyle && <StyledContainer style={sourceStyle}></StyledContainer>;
});

export default DraggingMask;
