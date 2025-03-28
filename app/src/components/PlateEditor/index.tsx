import type { CSSProperties } from 'react';
import React, { useMemo, useState } from 'react';
import { AlignPlugin } from '@udecode/plate-alignment/react';
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import type { Value } from '@udecode/plate-common';
import {
  ParagraphPlugin,
  Plate,
  PlateContent,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate-common/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin,
} from '@udecode/plate-font/react';
import { ImagePlugin } from '@udecode/plate-media/react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import SizeContext from 'antd/es/config-provider/SizeContext';
import type { TooltipPlacement } from 'antd/lib/tooltip';
import { isString } from 'lodash-es';
import { styled } from 'styled-components';
import { PlateEditorContext } from './PlateEditorContext';
import ImageElement from './ui/elements/ImageElement';
import ParagraphElement from './ui/elements/ParagraphElement';
import { withPlaceholders } from './ui/elements/placeholder';
import FixedToolbar from './ui/toolbar/FixedToolbar';
import SingleTextToolbar from './ui/toolbar/SingleTextToolbar';
import { withProps } from './utils';

const StyledContainer = styled.div`
  display: block;
  border: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  height: 100%;
  width: 100%;
`;

const StyledFixedToolbarEditAreaWrapper = styled.div`
  display: flex;
  height: calc(100% - 40px);
  overflow: auto;

  div[role='textbox'] {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0px;
    padding: 12px;
    font-size: ${({ theme }) => theme.fontSize}px;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    outline: none;
    transition: all 0.2s;
  }
`;

export interface PlateEditorProps {
  defaultValue?: Value;
  value?: Value | string;
  toolbar?: string[] | undefined;
  className?: string;
  singleLine?: boolean;
  size?: SizeType;
  placeholder?: string;
  placement?: TooltipPlacement;
  style?: CSSProperties;
  onChange?: (val: any) => void;
}

const PlateEditor = (props: PlateEditorProps) => {
  const {
    value,
    toolbar,
    placeholder,
    placement,
    singleLine = false,
    className,
    style,
    size,
    onChange,
  } = props;
  const [open, setOpen] = useState<boolean>();

  const mergedSize = size ?? React.use<SizeType>(SizeContext);

  const memorizedValue = useMemo(
    () =>
      isString(value) ? [{ type: 'p', children: [{ text: value }] }] : value,
    [value],
  );
  const editor = usePlateEditor({
    value: memorizedValue,
    plugins: [
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      ParagraphPlugin,
      FontColorPlugin,
      FontBackgroundColorPlugin,
      FontSizePlugin,
      ImagePlugin,
      AlignPlugin.configure({
        inject: { targetPlugins: ['p', 'h1', 'h2', 'h3', 'img'] },
      }),
    ],
    override: {
      components: withPlaceholders({
        [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
        [ImagePlugin.key]: ImageElement,
        [ParagraphPlugin.key]: ParagraphElement,
      }),
    },
  });

  return (
    <PlateEditorContext.Provider value={{ size: mergedSize }}>
      <Plate onValueChange={({ value }) => onChange?.(value)} editor={editor}>
        {singleLine ? (
          <StyledContainer
            style={{ border: 'none', ...style }}
            className={className}
          >
            <SingleTextToolbar
              toolbar={toolbar}
              open={open}
              onOpenChange={(val) => setOpen(val)}
              placement={placement}
            >
              <PlateContent
                onFocus={() => setOpen(true)}
                placeholder={placeholder}
                style={{ cursor: 'text' }}
              />
            </SingleTextToolbar>
          </StyledContainer>
        ) : (
          <StyledContainer className={className} style={style}>
            <FixedToolbar toolbar={toolbar} />
            <StyledFixedToolbarEditAreaWrapper>
              <PlateContent placeholder={placeholder} />
            </StyledFixedToolbarEditAreaWrapper>
          </StyledContainer>
        )}
      </Plate>
    </PlateEditorContext.Provider>
  );
};

export default PlateEditor;
