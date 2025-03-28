import type { CSSProperties, ReactNode } from 'react';
import React, { useState } from 'react';
import { useEventListener } from 'ahooks';
import { observer } from 'mobx-react-lite';
import type { ResizeCallback } from 're-resizable';
import { Resizable } from 're-resizable';
import styled from 'styled-components';

const StyledTableHeader = styled.th`
  position: relative;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colorFillSecondary} !important;
  }
`;

const StyledHandle = styled.div<{ $resizing?: boolean }>`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 3px;
  min-height: 24px;
  height: calc(100% - 8px);
  border-radius: 2px;
  transition: background-color 0.2s;
  background-color: ${({ theme, $resizing }) =>
    $resizing ? theme.colorPrimary : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.colorPrimary};
  }
`;

const defaultEnable = {
  top: false,
  right: true,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

interface ResizableColumnProps {
  className?: string;
  style?: CSSProperties;
  onResize: (width: number) => void;
  onResizeEnd: (width: number) => void;
  children?: ReactNode | undefined;
}

const ResizableColumn = observer((props: ResizableColumnProps) => {
  const { className, style, children, onResize, onResizeEnd } = props;
  const [resizing, setResizing] = useState(false);

  const handleResize: ResizeCallback = (_, __, ref) => {
    const width = parseInt(ref.style.width.replace('px', ''));

    onResize(width);
  };

  const handleResizeEnd: ResizeCallback = (_, __, ref) => {
    const width = parseInt(ref.style.width.replace('px', ''));
    setResizing(false);
    onResizeEnd(width);
  };

  useEventListener('onMouseUp', () => setResizing(false));

  return (
    <Resizable
      onResize={handleResize}
      onResizeStart={() => setResizing(true)}
      onResizeStop={handleResizeEnd}
      enable={defaultEnable}
      minWidth={100}
      handleComponent={{
        right: <StyledHandle $resizing={resizing} />,
      }}
      style={style}
      className={className}
      as={StyledTableHeader}
    >
      {children}
    </Resizable>
  );
});

export default ResizableColumn;
