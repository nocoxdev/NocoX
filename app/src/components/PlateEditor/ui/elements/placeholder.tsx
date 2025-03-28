/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import type { PlaceholderProps } from '@udecode/plate-common/react';
import {
  createNodeHOC,
  createNodesHOC,
  usePlaceholderState,
} from '@udecode/plate-common/react';
import classNames from 'classnames';
import { styled } from 'styled-components';

const StyledPlaceholder = styled.div`
  .placeholder {
    &::before {
      position: absolute;
      cursor: text;
      opacity: 0.3;
      content: attr(placeholder);
    }
  }
`;

const Placeholder = (props: PlaceholderProps) => {
  const { children, placeholder, nodeProps } = props;
  const { enabled } = usePlaceholderState(props);

  return React.Children.map(children, (child) => {
    return (
      <StyledPlaceholder>
        {React.cloneElement(child, {
          className: child.props.className,
          nodeProps: {
            ...nodeProps,
            className: classNames(enabled && 'placeholder'),

            placeholder,
          },
        })}
      </StyledPlaceholder>
    );
  });
};

export const withPlaceholder = createNodeHOC(Placeholder);
export const withPlaceholdersPrimitive = createNodesHOC(Placeholder);

export const withPlaceholders = (components: any, placeholder?: string) =>
  withPlaceholdersPrimitive(components, [
    {
      key: 'p',
      placeholder: placeholder,
      hideOnBlur: true,
      query: {
        maxLevel: 1,
      },
    },
    {
      key: 'h1',
      placeholder: 'Untitled',
      hideOnBlur: false,
    },
  ]);

export default Placeholder;
