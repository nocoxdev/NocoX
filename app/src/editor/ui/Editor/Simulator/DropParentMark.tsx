import { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import type { Rect } from '@/types';

const StyledParentBorder = styled.div`
  position: absolute;
  z-index: 1000;
  pointer-events: none !important;
  will-change: transform, width, height;
  border: 1px dashed ${({ theme }) => theme.colorPrimary};
`;

const StyledTitleContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 3;
  pointer-events: none;
  align-items: center;
  height: 16px;
  background-color: transparent;
  user-select: none;

  > span {
    color: ${({ theme }) => theme.colorPrimary};
    font-size: 10px;
    white-space: nowrap;
  }
`;

interface DropParentMarkProps {
  label?: string;
  rect?: Rect;
}

const DropParentMark = observer((props: DropParentMarkProps) => {
  const { label, rect } = props;
  if (label === undefined || rect === undefined) {
    return null;
  }

  const parentStyle = {
    height: rect.height + 1,
    width: rect.width + 1,
    transform: `translate(${rect.left}px,${rect.top}px)`,
  };

  const titleStyle = {
    left: rect.left - 1,
    top: rect.top - 16,
  };

  return (
    <Fragment>
      <StyledTitleContainer style={titleStyle}>
        <span>{label}</span>
      </StyledTitleContainer>
      <StyledParentBorder style={parentStyle} />
    </Fragment>
  );
});

export default DropParentMark;
