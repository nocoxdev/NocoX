import { use, useMemo } from 'react';
import classNames from 'classnames';
import { styled } from 'styled-components';
import { DraggableTreeContext } from './DraggableTreeContext';
import type { IndicatorInstruction } from './type';

const StyledContainer = styled.div<{
  $thickness: number;
  $left: number;
  $gap: number;
}>`
  position: absolute;
  top: 0;
  right: 0;
  left: ${({ $left }) => $left}px;
  bottom: 0;

  pointer-events: none;

  &::before {
    content: '';
    display: block;
    position: absolute;
    z-index: 2;
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    left: 0;
    background: transparent;
    border-radius: 50%;
    border: ${({ $thickness }) => $thickness}px solid
      ${({ theme }) => theme.colorPrimary};
  }

  &.disabled {
    &::before {
      border-color: ${({ theme }) => theme.colorError};
    }
    &::after {
      background: ${({ theme }) => theme.colorError};
    }
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    background: ${({ theme }) => theme.colorPrimary};
    height: ${({ $thickness }) => $thickness}px;
    left: 8px;
    right: 0;
  }

  &.before {
    &::before {
      top: 0;
      transform: translate(0px, ${({ $gap }) => -(4 + 0.5 * $gap)}px);
    }

    &::after {
      top: 0;
      transform: translate(
        0px,
        ${({ $thickness, $gap }) => -0.5 * ($thickness + $gap)}px
      );
    }
  }

  &.after {
    &::before {
      bottom: 0;
      transform: translate(0px, ${({ $gap }) => 4 + 0.5 * $gap}px);
    }

    &::after {
      bottom: 0;
      transform: translate(
        0px,
        ${({ $thickness, $gap }) => 0.5 * ($thickness + $gap)}px
      );
    }
  }

  &.inner {
    &::before,
    &::after {
      display: none;
    }

    position: absolute;
    pointer-events: none;
    left: ${({ $left }) => $left}px;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    background: ${({ theme }) => theme.colorPrimary}22;

    &.disabled {
      background-color: ${({ theme }) => theme.colorError}22;
    }
  }
`;

export interface DropIndicatorProps {
  thickness?: number;
  instruction: IndicatorInstruction;
  canDrop: boolean;
  showSwitch: boolean;
}

const DropIndicator = (props: DropIndicatorProps) => {
  const { instruction, canDrop, showSwitch, thickness = 2 } = props;
  const { indent, gap } = use(DraggableTreeContext);

  const { placement, level } = instruction;

  const left = useMemo(() => {
    return indent * (level || 0) + (showSwitch ? 16 : 0);
  }, [indent, level]);

  return (
    level !== undefined && (
      <StyledContainer
        className={classNames(placement, {
          disabled: !canDrop,
        })}
        $thickness={thickness}
        $left={left}
        $gap={gap}
      />
    )
  );
};

export default DropIndicator;
