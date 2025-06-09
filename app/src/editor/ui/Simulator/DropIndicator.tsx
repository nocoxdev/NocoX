import { type CSSProperties, Fragment } from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { INDICATOR_DEFAULT_SIZE } from '@/editor/constants';
import { useCanvas, useCurPage, useDnd } from '@/editor/selectors';
import DropParentMark from './DropParentMark';

const StyledDropIndicator = styled.div`
  position: absolute;
  z-index: 1000;
  background-color: transparent;
  pointer-events: none !important;
  will-change: transform, width, height;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;

  &.horizontal {
    width: ${INDICATOR_DEFAULT_SIZE + 4}px !important;
    border-top: 1px solid ${({ theme }) => theme.colorPrimary};
    border-bottom: 1px solid ${({ theme }) => theme.colorPrimary};
    > div {
      height: 100%;
      width: ${INDICATOR_DEFAULT_SIZE}px;
      background-color: ${({ theme }) => theme.colorPrimary};
    }
  }

  &.vertical {
    height: ${INDICATOR_DEFAULT_SIZE + 4}px !important;
    border-left: 1px solid ${({ theme }) => theme.colorPrimary};
    border-right: 1px solid ${({ theme }) => theme.colorPrimary};
    > div {
      width: 100%;
      height: ${INDICATOR_DEFAULT_SIZE}px;
      background-color: ${({ theme }) => theme.colorPrimary};
    }
  }

  &.invalid {
    border-color: ${({ theme }) => theme.colorErrorHover} !important;
    > div {
      background-color: ${({ theme }) => theme.colorErrorHover} !important;
    }
  }
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
  color: ${({ theme }) => theme.colorPrimary};
  font-size: ${({ theme }) => theme.fontSize}px;
  white-space: nowrap;
`;

const StyledMask = styled.div`
  position: absolute;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colorPrimary}22;
  pointer-events: none;
  will-change: transform, width, height;
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    color: #666;
    font-size: ${({ theme }) => theme.fontSize}px;
  }
  &.invalid {
    background-color: ${({ theme }) => theme.colorErrorHover}66;
  }
`;

const DropIndicator = observer(() => {
  const dnd = useDnd();
  const currentPage = useCurPage();
  const canvas = useCanvas();

  const { indication } = dnd;

  const dropNode = currentPage?.findNode(indication?.dropId);
  if (
    !dropNode ||
    !indication ||
    !indication.placement ||
    !indication.rect ||
    !canvas.rect
  ) {
    return null;
  }

  const { rect, parentRect, dropType, direction, allowDrop } = indication;

  if (dropType === 'inner') {
    const titleStyle: CSSProperties | undefined = {
      left: rect.left,
      top: rect.top - 16,
    };

    const maskStyle: CSSProperties = {
      height: rect.height + 2,
      width: rect.width + 2,
      transform: `translate(${rect.left - 1}px,${rect.top - 1}px)`,
    };

    return (
      <div>
        <StyledMask
          style={maskStyle}
          className={classNames(direction, {
            invalid: !allowDrop,
          })}
        />
        <StyledTitleContainer style={titleStyle}>
          {dropNode.label}
        </StyledTitleContainer>
      </div>
    );
  }

  const left = rect.left - (direction === 'horizontal' ? 3 : 1);
  const top = rect.top - (direction === 'vertical' ? 3 : 1);

  const style: CSSProperties = {
    height: rect.height + 1,
    width: rect.width + 1,
    transform: `translate(${left}px,${top}px)`,
  };

  return (
    <Fragment>
      <DropParentMark rect={parentRect} label={dropNode.parent?.label} />
      <StyledDropIndicator
        className={classNames(direction, {
          invalid: !allowDrop,
        })}
        style={style}
      >
        <div />
      </StyledDropIndicator>
    </Fragment>
  );
});

export default DropIndicator;
