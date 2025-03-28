import React, { useMemo } from 'react';
import { select, setNodes } from '@udecode/plate-common';
import {
  findNodePath,
  PlateElement,
  useEditorRef,
  withRef,
} from '@udecode/plate-common/react';
import type { TImageElement } from '@udecode/plate-media';
import { Image, useMediaState } from '@udecode/plate-media/react';
import classNames from 'classnames';
import type { ResizeCallback } from 're-resizable';
import { Resizable } from 're-resizable';
import { styled } from 'styled-components';

const StyledFigure = styled.figure`
  display: flex;
  margin: 0px;
  width: 100%;
`;

const StyledHandle = styled.div<{
  $direction: 'left' | 'right';
  $selected: boolean;
}>`
  position: absolute;
  top: calc(50% - 12px);
  ${({ $direction }) => $direction}: -6px;
  width: 8px;
  min-height: 24px;
  height: 20%;
  transition: background-color 0.2s;
  visibility: ${({ $selected }) => ($selected ? 'visible' : 'hidden')};

  ${({ $direction }) => `border-${$direction}`}: 3px solid transparent;
  &:hover {
    visibility: visible;
    border-color: ${({ theme }) => theme.colorPrimary} !important;
  }
`;

const StyledImageContainer = styled.div`
  cursor: pointer;
  padding: 4px;
  transition: border 0.2s;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid ${({ theme }) => theme.colorPrimaryBorder};
    .handle {
      visibility: visible;
      border-color: ${({ theme }) => theme.colorPrimaryBorderHover};
    }
  }
  &.selected {
    border: 2px solid ${({ theme }) => theme.colorPrimary};
    .handle {
      visibility: visible;
      border-color: ${({ theme }) => theme.colorPrimary};
    }
  }
`;

export interface TTImageElement extends TImageElement {
  width?: number | string | undefined;
  height?: number | string | undefined;
}

const ImageElement = withRef<typeof PlateElement>(
  ({ children, nodeProps, ...props }, ref) => {
    const { align, selected, focused } = useMediaState();

    const editor = useEditorRef();
    const width = (props.element.width as number) || 60;

    const justifyContent = useMemo(() => {
      if (align === 'center') return 'center';
      if (align === 'right') return 'flex-end';
      return 'flex-start';
    }, [align]);

    const handleResize: ResizeCallback = (_, __, ref) => {
      const width = ref.getBoundingClientRect().width;

      setNodes<TTImageElement>(editor, {
        width,
      });
    };

    return (
      <PlateElement ref={ref} {...props}>
        <StyledFigure
          contentEditable={false}
          style={{
            justifyContent,
          }}
        >
          <StyledImageContainer
            className={classNames({ selected: selected && focused })}
            onMouseDown={() => {
              const path = findNodePath(editor, props.element);
              select(editor, path as number[]);
            }}
          >
            <Resizable
              onResize={handleResize}
              enable={{
                top: false,
                right: true,
                bottom: false,
                left: true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              lockAspectRatio
              handleComponent={{
                right: (
                  <StyledHandle
                    $direction="right"
                    $selected={selected && focused}
                    className="handle"
                  />
                ),
                left: (
                  <StyledHandle
                    $direction="left"
                    $selected={selected && focused}
                    className="handle"
                  />
                ),
              }}
              style={{ display: 'flex' }}
            >
              <Image {...nodeProps} width={width} />
            </Resizable>
          </StyledImageContainer>
        </StyledFigure>
        {children}
      </PlateElement>
    );
  },
);
export default ImageElement;
