import { styled } from 'styled-components';

const StyledDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colorBorderSecondary};
  width: 100%;
`;

interface NavigationDividerProps {
  className?: string;
  style?: React.CSSProperties;
}

const NavigationDivider = (props: NavigationDividerProps) => {
  return <StyledDivider {...props} />;
};

export default NavigationDivider;
