import { type PropsWithChildren } from 'react';
import { IconX } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { Popover } from 'antd';
import type { TooltipPlacement } from 'antd/es/tooltip';
import { styled } from 'styled-components';
import { StyledIconButton } from '@/components/common.styled';
import { useCurrentSize } from '../../hooks';
import type { ToolbarProps } from './ToolbarItems';
import ToolbarItems from './ToolbarItems';

export const StyledContainer = styled.div<{ $height: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px;
  height: ${({ $height }) => $height + 2}px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  > .ant-flex > * {
    height: 24px;
  }
  > .ant-flex > button {
    width: 26px;
  }
`;

const StyledContent = styled.div<{ $height: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  div[role='textbox'] {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: ${({ $height }) => $height}px;
    padding: 3px 7px;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: ${({ theme }) => theme.fontSize}px;
    border: none;
    border: 1px solid ${({ theme }) => theme.colorBorderSecondary};
    border-radius: ${({ theme }) => theme.borderRadius}px;
    outline: none;
    transition: all 0.2s;
    &:hover {
      border-color: ${({ theme }) => theme.colorPrimary};
    }

    &:focus,
    &:focus-within {
      border-color: ${({ theme }) => theme.colorPrimary};
    }

    > div {
      overflow: hidden;
    }
  }
`;

export interface SingleTextToolbarProps extends ToolbarProps {
  width?: number | undefined;
  open?: boolean;
  placement?: TooltipPlacement;
  onOpenChange?: (val: boolean) => void;
}

const SingleTextToolbar = (
  props: PropsWithChildren<SingleTextToolbarProps>,
) => {
  const { children, toolbar, width, placement } = props;

  const [open, setOpen] = useControllableValue<boolean>(props, {
    valuePropName: 'open',
    trigger: 'onOpenChange',
  });

  const { height } = useCurrentSize();

  return (
    <Popover
      open={open}
      onOpenChange={(val) => setOpen(val)}
      trigger={[]}
      styles={{
        body: {
          padding: 0,
        },
      }}
      placement={placement}
      content={
        <StyledContainer $height={height} style={{ width, minWidth: 280 }}>
          <ToolbarItems toolbar={toolbar} />
          <StyledIconButton onClick={() => setOpen(false)}>
            <IconX size={13} />
          </StyledIconButton>
        </StyledContainer>
      }
    >
      <StyledContent $height={height}>{children}</StyledContent>
    </Popover>
  );
};

export default SingleTextToolbar;
