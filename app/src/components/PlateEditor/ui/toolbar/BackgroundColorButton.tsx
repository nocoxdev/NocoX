import {
  useColorDropdownMenu,
  useColorDropdownMenuState,
} from '@udecode/plate-font/react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import styled from 'styled-components';
import ExColorPicker from '@/components/ExColorPicker';
import { MARK_BG_COLOR } from '@/components/PlateEditor/constants';
import CommonButton from './CommonButton';

const StyledBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    width: 16px;
    height: 16px;
    background-image: conic-gradient(
      rgba(0, 0, 0, 0.06) 0 25%,
      transparent 0 50%,
      rgba(0, 0, 0, 0.06) 0 75%,
      transparent 0
    );
    background-size: 50% 50%;
  }
`;

interface BackgroundColorButtonProps {
  size?: SizeType;
}

const BackgroundColorButton = ({ size }: BackgroundColorButtonProps) => {
  const state = useColorDropdownMenuState({
    nodeType: MARK_BG_COLOR,
    colors: [],
    customColors: [],
    closeOnSelect: true,
  });

  const { menuProps } = useColorDropdownMenu(state);

  return (
    <ExColorPicker
      open={menuProps.open}
      onOpenChange={menuProps.onOpenChange}
      onClear={state.clearColor}
      placement="topLeft"
      allowClear
      arrow={false}
      onChange={(value) => state.updateColor(value)}
      size={size}
    >
      <div>
        <CommonButton>
          <StyledBackground />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={state.selectedColor}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 8l4 -4" />
            <path d="M14 4l-10 10" />
            <path d="M4 20l16 -16" />
            <path d="M20 10l-10 10" />
            <path d="M20 16l-4 4" />
          </svg>
        </CommonButton>
      </div>
    </ExColorPicker>
  );
};

export default BackgroundColorButton;
