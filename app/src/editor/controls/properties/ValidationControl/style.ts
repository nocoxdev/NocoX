import styled from 'styled-components';

export const StyledValidationItem = styled.div`
  display: flex;
  height: ${({ theme }) => theme.controlHeightSM}px;
  align-items: center;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border: 1px solid #d9d9d9;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  padding: 4px 4px 4px 12px;
  transition: all 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colorPrimary};
  }
`;

export const StyledItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  .anticon {
    color: #666;
  }
  .anticon-delete {
    &:hover {
      color: red !important;
    }
  }

  .anticon-edit {
    &:hover {
      color: ${({ theme }) => theme.colorPrimary} !important;
    }
  }
`;

export const StyledItemLabel = styled.div`
  display: flex;
  align-items: center;
  width: 80px;

  .ant-checkbox-wrapper {
    color: #444 !important;
    font-size: ${({ theme }) => theme.fontSize}px;
  }
`;

export const StyleValidationsSelect = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
