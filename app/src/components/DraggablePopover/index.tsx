import { useState } from 'react';
import { useControllableValue } from 'ahooks';
import type { PopoverProps } from 'antd';
import { Popover } from 'antd';
import classnames from 'classnames';
import { isFunction } from 'lodash-es';
import type { ResizableProps } from 're-resizable';
import { Resizable } from 're-resizable';
import { styled, useTheme } from 'styled-components';
import type { Position } from '@/types';
import { rootClassName as rootClass } from './constants';
import DraggableTitle from './DraggableTitle';

const StyledContentWrapper = styled.div`
  padding: 4px 20px 28px 20px;
  height: calc(100% - 70px);
`;

const StyledResizeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
  font-size: 14px;
`;

export type ResizablOptions = ResizableProps | false;

export interface DraggablePopoverProps extends PopoverProps {
  showCloseButton?: boolean;
  defaultOpen?: boolean;
  maskClosable?: boolean;
  resizable?: ResizablOptions;
  contentStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  titleExtra?: React.ReactNode;
  childrenStyle?: React.CSSProperties;
  width?: number;
}

const DraggablePopover = (props: DraggablePopoverProps) => {
  const {
    title,
    styles,
    titleStyle,
    rootClassName,
    showCloseButton = true,
    maskClosable = false,
    resizable = false,
    content,
    contentStyle,
    titleExtra,
    width,
    placement = 'leftTop',
    trigger = 'click',
    children,
    childrenStyle,
    ...restProps
  } = props;

  const [innerOpen, setInnerOpen] = useControllableValue<boolean>(props, {
    valuePropName: 'open',
    trigger: 'onOpenChange',
  });

  const [position, setPosition] = useState<Position>();
  const theme = useTheme();
  const handleOpenChange = (visible: boolean) => {
    if (maskClosable) {
      setInnerOpen(visible);
    } else {
      if (visible) {
        setInnerOpen(visible);
      }
    }
  };

  const contentContainer = (
    <Resizable {...(resizable || { enable: false })}>
      <DraggableTitle
        title={title}
        titleExtra={titleExtra}
        style={titleStyle}
        showCloseButton={showCloseButton}
        onClose={() => setInnerOpen(false)}
        onMove={(pos) => setPosition(pos)}
      />
      <StyledContentWrapper style={contentStyle}>
        {isFunction(content) ? content() : content}
      </StyledContentWrapper>
      {resizable && (
        <StyledResizeIcon>
          <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
            <path
              d="m10.757 15 4-4m-8 4 8-8"
              stroke-opacity=".2"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke={theme.colorText}
            />
          </svg>
        </StyledResizeIcon>
      )}
    </Resizable>
  );

  return (
    <Popover
      content={contentContainer}
      styles={{
        root: {
          ...styles?.root,
          ...(position && { left: position.x, top: position.y }),
          width,
        },
        body: {
          ...styles?.body,
          padding: 0,
        },
      }}
      rootClassName={classnames(rootClassName, rootClass)}
      placement={placement}
      trigger={trigger}
      {...restProps}
      open={innerOpen}
      onOpenChange={(visible) => handleOpenChange(visible)}
    >
      <div style={childrenStyle}>{children}</div>
    </Popover>
  );
};

export default DraggablePopover;
