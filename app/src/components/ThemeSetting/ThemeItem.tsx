import { IconCheck } from '@tabler/icons-react';
import classNames from 'classnames';
import { styled } from 'styled-components';

const StyledThemeItem = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border: 2px solid transparent;
  box-sizing: border-box;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colorPrimaryBg};
  padding: 4px;
  box-sizing: content-box;
  cursor: pointer;

  &.selected {
    border-color: ${({ theme }) => theme.colorPrimary};
  }

  &:hover {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  }

  svg {
    border-radius: ${({ theme }) => theme.borderRadius}px;
  }
`;

const StyledCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -8px;
  top: -8px;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colorPrimary};
  border: 2px solid #fff;
  padding: 2px;
  box-sizing: content-box;
  transition: all 0.2s;
`;

interface ThemeItemProps {
  title: string;
  selected: boolean;
  primaryColor: string;
  secondaryColor: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ThemeItem = (props: ThemeItemProps) => {
  const { title, selected, primaryColor, secondaryColor, style, onClick } =
    props;

  return (
    <StyledThemeItem
      onClick={onClick}
      title={title}
      className={classNames({ selected: selected })}
      style={style}
    >
      {selected && (
        <StyledCheck>
          <IconCheck size={12} color="#fff" />
        </StyledCheck>
      )}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 106 66">
        <path fill="#fff" d="M0 0h106v66H0z"></path>
        <path fill={primaryColor} d="M0 0h36v66H0z"></path>
        <path fill="#fff" d="M36 0H106V10H36V0Z" />
        <rect
          width="20"
          height="4"
          x="8"
          y="8"
          fill={primaryColor}
          rx="2"
          ry="2"
        />
        <g fill={secondaryColor}>
          <rect width="12" height="2" x="8" y="16" rx="1" ry="1" />
          <rect
            width="16"
            height="2"
            x="8"
            y="20"
            rx="1"
            ry="1"
            opacity="0.75"
          />
          <rect
            width="12"
            height="2"
            x="8"
            y="24"
            rx="1"
            ry="1"
            opacity="0.5"
          />
        </g>
      </svg>
    </StyledThemeItem>
  );
};

export default ThemeItem;
