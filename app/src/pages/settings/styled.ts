import { styled } from 'styled-components';

export const StyledFormContainer = styled.div`
  display: flex;
  padding-inline: 24px;
  justify-content: flex-start;

  .ant-form-item {
    margin-bottom: 32px;
    .ant-form-item-label {
      font-weight: 600;
      font-size: 14px;
      padding-bottom: 8px !important;

      .ant-form-item-required {
        position: relative;
        &::before {
          right: 0;
          position: absolute;
        }
      }
    }
  }
`;
