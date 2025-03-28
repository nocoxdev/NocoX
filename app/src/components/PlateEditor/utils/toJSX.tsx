import React, { Fragment } from 'react';
import { isArray, isString } from 'lodash-es';
import type {
  IImageElement,
  IPlateElement,
  IPlateNode,
  IPlateText,
} from '../type';

function renderText(element: IPlateText) {
  if (!element.text) return null;

  const { text, underline, color, backgroundColor, fontSize, bold, italic } =
    element;

  const style = {
    color,
    backgroundColor,
    fontSize,
    fontWeight: bold ? 'bold' : 'normal',
    fontStyle: italic ? 'italic' : 'normal',
    textDecoration: underline ? 'underline' : 'none',
  };
  return <span style={style}>{underline ? <u>{text}</u> : text}</span>;
}

function renderImage(element: IImageElement) {
  const { url, width, height, align } = element;

  const props = {
    src: url,
    width: width || 'auto',
    height: height || 'auto',
    style: { textAlign: align },
  };

  return <img {...props} />;
}

function renderParagraph(element: IPlateElement, singleLine?: boolean) {
  const children = element.children ? toJSX(element.children) : null;

  const style = { textAlign: element.align };
  const Tag = singleLine ? 'span' : 'p';

  return <Tag style={style}>{children}</Tag>;
}

export function toJSX(
  input: IPlateNode[] | string | undefined | null,
  singleLine: boolean | undefined = false,
): JSX.Element | null {
  if (isString(input)) {
    return <Fragment>{input}</Fragment>;
  }

  if (!input || !isArray(input)) {
    return null;
  }

  const children = input.map((node, index) => {
    if ('text' in node) {
      return <Fragment key={index}>{renderText(node)}</Fragment>;
    } else {
      const element = node as IPlateElement;
      switch (element.type) {
        case 'p':
          return (
            <Fragment key={index}>{renderParagraph(node, singleLine)}</Fragment>
          );
        case 'img':
          return (
            <Fragment key={index}>
              {renderImage(element as IImageElement)}
            </Fragment>
          );
        default:
          return null;
      }
    }
  });
  return <Fragment>{children}</Fragment>;
}
