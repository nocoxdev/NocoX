import type { RenderFunction } from 'antd/es/_util/getRenderPropValue';
import { styled } from 'styled-components';
import type { Position } from '@/types';
import PopoverTitle from '../PopoverTitle';
import { useDrag } from './useDrag';

const StyledTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`;

interface DraggableTitleProps {
  title?: React.ReactNode | RenderFunction;
  showCloseButton?: boolean;
  style?: React.CSSProperties;
  titleExtra?: React.ReactNode;
  onClose?: () => void;
  onMove?: (position?: Position) => void;
}

const DraggableTitle = (props: DraggableTitleProps) => {
  const { title, style, titleExtra, showCloseButton, onClose, onMove } = props;

  const { start } = useDrag((value) => onMove?.(value));

  const renderTitle = (
    <StyledTitleWrapper
      style={{ cursor: 'move' }}
      onMouseDown={(e: any) => start(e)}
    >
      {typeof title === 'function' ? title() : title}
    </StyledTitleWrapper>
  );

  return (
    <PopoverTitle
      style={style}
      title={renderTitle}
      extra={titleExtra}
      showCloseButton={showCloseButton}
      onClose={() => onClose?.()}
    />
  );
};

export default DraggableTitle;
