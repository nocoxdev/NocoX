import React from 'react';
import { Flex } from 'antd';
import { styled } from 'styled-components';
import type { Direction, NodePropValidation } from '@/types';
import type { LabelProps } from './Label';
import Label from './Label';

const StyledControl = styled.div`
  /* display: flex;
  align-items: center; */
  display: flex;
  flex: 1;
`;

const StyledValidation = styled.div`
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.colorErrorText};
`;

export type ControlLayoutProps = {
  direction?: Direction;
  validation?: NodePropValidation;
  children?: React.ReactNode;
} & LabelProps;

const ControlLayout = (props: React.PropsWithChildren<ControlLayoutProps>) => {
  const {
    direction = 'vertical',
    size,
    label,
    helpText,
    extra,
    required,
    validation,
    children,
  } = props;

  return (
    <Flex gap={2} vertical={direction === 'vertical'}>
      {label && (
        <Label
          label={label}
          helpText={helpText}
          extra={extra}
          required={required}
          size={size}
        />
      )}
      <StyledControl>{children}</StyledControl>
      {validation?.success === false && (
        <StyledValidation>{validation?.message}</StyledValidation>
      )}
    </Flex>
  );
};

export default ControlLayout;
