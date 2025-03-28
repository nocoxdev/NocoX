import type { ReactNode } from 'react';
import { IconX } from '@tabler/icons-react';
import { Button, Flex } from 'antd';
import { styled } from 'styled-components';
import AntdIcon from '../AntdIcon';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  position: relative;
  padding: 14px 10px 4px 20px;
`;

export const StyledClosable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  color: ${({ theme }) => theme.colorText};
  font-weight: 500;
  font-size: 13px;
  flex-grow: 1;
`;

export interface PopoverTitleProps {
  title: ReactNode;
  showCloseButton?: boolean;
  style?: React.CSSProperties;
  extra?: ReactNode;
  onClose: () => void;
  onMouseDown?: (e: any) => void;
}

const PopoverTitle = (props: PopoverTitleProps) => {
  const { title, showCloseButton = true, style, extra, onClose } = props;

  return (
    <StyledContainer style={style}>
      <StyledTitle>{title}</StyledTitle>
      <Flex gap={2}>
        {extra}
        {showCloseButton && (
          <StyledClosable>
            <Button
              type="text"
              size="small"
              icon={<AntdIcon content={IconX} size={14} />}
              onClick={onClose}
            />
          </StyledClosable>
        )}
      </Flex>
    </StyledContainer>
  );
};

export default PopoverTitle;
