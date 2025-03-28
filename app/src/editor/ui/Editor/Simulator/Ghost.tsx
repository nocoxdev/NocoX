import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import { useDnd, useWidgetStore } from '../../../selectors';

const StyledContainer = styled.div`
  position: fixed;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 4px 12px;
  background-color: ${({ theme }) => theme.colorPrimary}33;
  border-radius: 4px;

  pointer-events: none;
  user-select: none;
  left: 0;
  top: 0;
  > span {
    overflow: hidden;
    color: #0052d9;
    font-size: ${({ theme }) => theme.fontSize}px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Ghost = observer(() => {
  const dnd = useDnd();
  const widgets = useWidgetStore();

  const { dragData, position, dragging } = dnd;

  const widget = widgets.find(dragData?.name);

  if (!widget || !position || !dragging) {
    return null;
  }

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
  };

  return (
    <StyledContainer style={style}>
      <span>{widget.label}</span>
    </StyledContainer>
  );
});

export default Ghost;
