import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
`;

export const StyledItemLabel = styled.div`
  display: flex;
  flex-direction: column;
  > span:first-child {
    color: ${({ theme }) => theme.colorText};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize}px;
  }
  > span:nth-child(2) {
    color: ${({ theme }) => theme.colorTextTertiary};
    font-size: ${({ theme }) => theme.fontSize}px;
  }
`;

export const StyledTableToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTableToolbarTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colorText};
  font-weight: 600;
`;
