import type { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

const StyledErrorMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100px;
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.colorTextTertiary};
`;

interface ErrorMessageProps {
  classNames?: string;
  style?: React.CSSProperties;
}

const ErrorMessage = (props: PropsWithChildren<ErrorMessageProps>) => {
  return <StyledErrorMessageContainer {...props}></StyledErrorMessageContainer>;
};

export default ErrorMessage;
