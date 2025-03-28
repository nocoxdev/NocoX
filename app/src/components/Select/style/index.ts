import type { Variant } from 'antd/es/config-provider';
import { styled } from 'styled-components';
import { genFilledStyle } from './genFilledStyle';

export const StyledSelectWrapper = styled.div<{
  $variant?: Variant;
}>`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.controlHeightSM}px;

  border-radius: ${({ theme }) => theme.borderRadius}px;
  transition: all 0.2s;

  > .ant-select {
    width: calc(100% - ${({ theme }) => theme.controlHeightSM}px);
    height: ${({ theme }) => theme.controlHeightSM - 2}px;
    .ant-select-selector {
      border: none;
      border-left: none;
      border-radius: 0;
    }
  }
  &:hover {
    border-color: ${({ theme }) => theme.colorPrimaryHover};
  }

  ${({ $variant }) => genFilledStyle($variant)}
`;

export const StyledPrefixContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${({ theme }) => theme.controlHeightSM}px;

  border-radius: ${({ theme }) => theme.borderRadius}px;
`;
