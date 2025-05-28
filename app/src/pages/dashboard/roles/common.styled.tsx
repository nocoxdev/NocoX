import { styled } from 'styled-components';

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
