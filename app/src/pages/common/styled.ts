import { styled } from 'styled-components';

export const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: white;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.boxShadowTertiary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  min-height: 400px;

  .ant-table-wrapper .ant-table-thead > tr > th {
    color: ${({ theme }) => theme.colorTextTertiary};
    /* background-color: #fff; */
    /* border-top: 1px solid ${({ theme }) => theme.colorBorderSecondary};
    color: ${({ theme }) => theme.colorTextTertiary}; */
    /* &:before {
      display: none;
    } */
  }
`;

export const StyledToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledAvatarContainer = styled.div<{
  $size?: number;
  $fontSize?: number;
  $pointer?: boolean;
}>`
  display: flex;
  width: ${({ $size }) => $size || 28}px;
  height: ${({ $size }) => $size || 28}px;
  background: #f56a00;
  border-radius: 50%;
  font-size: ${({ theme, $fontSize }) => $fontSize || theme.fontSize}px;
  color: #fff;
  align-items: center;
  justify-content: center;
  cursor: ${({ $pointer }) => ($pointer ? 'pointer' : 'default')};
`;
