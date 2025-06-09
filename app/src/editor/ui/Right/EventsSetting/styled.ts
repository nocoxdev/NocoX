import { styled } from 'styled-components';

export const StyledLabelContainer = styled.div`
  display: flex;
  gap: 6px;
  overflow: hidden;
  flex-grow: 1;
  align-items: center;
`;

export const StyledLabel = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.colorTextSecondary};
`;
