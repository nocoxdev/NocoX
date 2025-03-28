import {
  useColorDropdownMenu,
  useColorDropdownMenuState,
} from '@udecode/plate-font/react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import ExColorPicker from '@/components/ExColorPicker';
import { MARK_COLOR } from '@/components/PlateEditor/constants';
import CommonButton from './CommonButton';

interface TextColorButtonProps {
  size?: SizeType;
}

const TextColorButton = ({ size }: TextColorButtonProps) => {
  const state = useColorDropdownMenuState({
    nodeType: MARK_COLOR,
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
      onChange={(value) => state.updateColor(value)}
      arrow={false}
      size={size}
    >
      <div>
        <CommonButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            strokeWidth="1.25"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 15v-7a3 3 0 0 1 6 0v7" />
            <path d="M9 11h6" />
            <path stroke={state.selectedColor} d="M5 20h14" strokeWidth="3" />
          </svg>
        </CommonButton>
      </div>
    </ExColorPicker>
  );
};

export default TextColorButton;
