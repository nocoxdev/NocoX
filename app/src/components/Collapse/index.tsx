import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import { useSticky } from '@/utils/hooks';

const StyledContainer = styled.div`
  position: relative;
`;

const StyledHeader = styled.div<{
  $collapsed: boolean;
  $hasShadow?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize}px;
  cursor: pointer;
  height: ${({ theme }) => theme.controlHeightSM}px;
  width: 100%;
  position: sticky !important;
  top: 0px;
  z-index: 1;
  background-color: white;
  box-shadow: ${({ $hasShadow }) =>
    `${$hasShadow ? ' 0px 4px 8px rgba(0, 0, 0, 0.05)' : 'none'}`};

  .anticon-right {
    color: ${({ theme }) => theme.colorTextTertiary};
    font-size: 10px;
    transform: ${({ $collapsed }) =>
      `${$collapsed ? 'none' : 'rotate(90deg)'}`};
    transition: transform 0.2s ease-in-out;
  }
`;

const StyledHeaderLabel = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colorText};

  > div {
    display: flex;
    align-items: center;
    justify-content: left;
    margin-right: 4px;

    > svg {
      color: ${({ theme }) => theme.colorPrimary};
    }
  }

  > span {
    user-select: none;
  }
`;

const StyledContent = styled.div<{ $collapsed: boolean }>`
  display: ${({ $collapsed }) => `${$collapsed ? 'none' : 'flex'}`};
  width: 100%;
`;

export interface CollapseProps {
  name: string;
  icon?: ReactNode;
  label: ReactNode;
  children: ReactNode;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

const Collapse = (props: CollapseProps) => {
  const { icon, label, children, headerStyle, contentStyle, style } = props;
  const [collapsed, setCollapsed] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const sticky = useSticky(ref.current, ref.current?.parentElement);

  return (
    <StyledContainer ref={ref} style={style}>
      <StyledHeader
        $collapsed={collapsed}
        $hasShadow={sticky}
        onClick={() => setCollapsed(!collapsed)}
        style={headerStyle}
      >
        <StyledHeaderLabel>
          {icon && <div>{icon}</div>}
          <span>{label}</span>
        </StyledHeaderLabel>
        <RightOutlined />
      </StyledHeader>
      {!collapsed && (
        <StyledContent $collapsed={collapsed} style={contentStyle}>
          {children}
        </StyledContent>
      )}
    </StyledContainer>
  );
};

export default Collapse;
