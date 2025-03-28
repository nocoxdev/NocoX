import { useEffect, useMemo, useRef, useState } from 'react';
import { useControllableValue, useEventListener, useMouse } from 'ahooks';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import classNames from 'classnames';
import styled from 'styled-components';
import type { Position } from '@/types';
import { calcPositon } from './utils';

const StyledPositionInputWrapper = styled.div`
  position: relative;
`;

const StyledCenter = styled.div`
  position: absolute;
  height: 0;
  width: 0;
  left: 50%;
  top: 50%;
`;

const StyledSqure = styled.div`
  position: absolute;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius}px;
`;

const StyledKnob = styled.div`
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  box-sizing: border-box;
  z-index: 2;
  user-select: none;
  border: 2px solid #96c7ff;
  background-color: #fff;
  transition: border 0.2s;
  &.active,
  &:hover {
    border: 4px solid ${(props) => props.theme.colorPrimary};
    box-shadow: rgb(127, 204, 247) 0px 0px 4px 1px;
  }
`;

const StyledLine = styled.div`
  position: absolute;
  z-index: 1;
  width: 0;
  height: 0;
  border-bottom: 1px solid #aaa;
  transform-origin: left;
  left: -1px;
  top: -1px;
`;

const StyledAxisX = styled.div`
  position: absolute;
  height: 0;
  border-bottom: 1px solid #eee;
  top: -1px;
`;

const StyledAxisY = styled.div`
  position: absolute;
  width: 0;
  border-left: 1px solid #eee;
  left: -1px;
`;

export interface PositionInputProps {
  onlyAngle?: boolean;
  radius?: number;
  knobRadius?: number;
  defaultValue?: Position;
  value?: Position;
  size?: SizeType;
  variant?: Variant;
  onChange?: (value: Position) => void;
}

const PositionInput = (props: PositionInputProps) => {
  const { radius = 40, knobRadius = 6 } = props;

  const [value, setValue] = useControllableValue<Position>(props, {
    defaultValue: { x: 0, y: 0 },
  });

  const centerRef = useRef(null);
  const konbRef = useRef(null);
  const mouse = useMouse(centerRef.current);
  const [moving, setMoving] = useState(false);

  const [position, setPosition] = useState<Position>(() =>
    calcPositon(value.x, value.y, radius),
  );

  useEffect(() => {
    if (moving) {
      const pos = calcPositon(mouse.elementX, mouse.elementY, radius);
      setPosition(pos);
      setValue(position);
    }
  }, [moving, mouse.elementX, mouse.elementY]);

  useEventListener('mouseup', (e) => {
    setMoving(false);
    e.preventDefault();
  });

  useEventListener(
    'mousedown',
    () => {
      setMoving(true);
    },
    { target: konbRef },
  );

  const squareRadius = radius + knobRadius;

  const lineStyle = useMemo(() => {
    const length = Math.sqrt(Math.pow(position.x, 2) + Math.pow(position.y, 2));
    const angle = (180 / Math.PI) * Math.atan2(position.y, position.x);
    return {
      width: length,
      transform: `rotate(${angle}deg) `,
    };
  }, [position]);

  const konbStyle = useMemo(() => {
    const size = 2 * knobRadius;
    return {
      width: size,
      height: size,
      left: position.x - knobRadius,
      top: position.y - knobRadius,
    };
  }, [position]);

  return (
    <StyledPositionInputWrapper
      style={{ width: 2 * squareRadius, height: 2 * squareRadius }}
    >
      <StyledCenter ref={centerRef}>
        <StyledSqure
          style={{
            height: 2 * squareRadius,
            width: 2 * squareRadius,
            left: -squareRadius,
            top: -squareRadius,
          }}
        />
        <StyledKnob
          ref={konbRef}
          style={konbStyle}
          className={classNames({ active: moving === true })}
        />
        <StyledLine style={lineStyle} />
        <StyledAxisX
          style={{
            width: 2 * squareRadius,
            left: -squareRadius,
          }}
        />
        <StyledAxisY
          style={{
            height: 2 * squareRadius,
            top: -squareRadius,
          }}
        />
      </StyledCenter>
    </StyledPositionInputWrapper>
  );
};

export default PositionInput;
