import type { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const StyledErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100px;
  gap: 8px;
  > span {
    font-size: 14px;
    color: ${({ theme }) => theme.colorTextTertiary};
  }
`;

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage = ({
  error,
  children,
}: PropsWithChildren<ErrorMessageProps>) => {
  return (
    <StyledErrorMessageContainer>
      <span>{error}</span>

      {children}
    </StyledErrorMessageContainer>
  );
};

export default ErrorMessage;
