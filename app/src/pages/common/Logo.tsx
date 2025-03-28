import { styled } from 'styled-components';
import { default as defaultLogo } from '@/assets/logo.svg';
import { ADMIN_BASE_URL } from '@/constants';

const StyledSiderLogoContainer = styled.div<{ $collapsed: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  padding: 0px 16px;
  height: 48px;
  transition: all 0.2s;
  box-sizing: border-box;
  align-items: center;
  justify-content: ${({ $collapsed }) =>
    $collapsed ? 'center' : 'flex-start'};

  cursor: pointer;

  > img {
    height: 20px;
  }
  > svg {
    width: 20px;
    height: 20px;
  }
  > span {
    height: 28px;
    margin-left: 8px;
    color: ${({ theme }) => theme.colorText};
    font-weight: 800;
    font-size: 16px;
    line-height: 28px;
  }

  &.dark {
    /* border-bottom: 1px solid #444; */
    > span {
      color: white;
    }
  }
`;

interface LogoProps {
  logo?: string;
  title?: string;
  className?: string;
  collapsed?: boolean;
  style?: React.CSSProperties;
}

const Logo = (props: LogoProps) => {
  const {
    logo = defaultLogo,
    title = 'NocoX',
    collapsed = false,
    className,
    style,
  } = props;

  return (
    <StyledSiderLogoContainer
      $collapsed={collapsed}
      className={className}
      style={style}
      onClick={() => (location.href = ADMIN_BASE_URL)}
    >
      <img src={logo} alt="logo" />
      {!collapsed && <span>{title}</span>}
    </StyledSiderLogoContainer>
  );
};

export default Logo;
