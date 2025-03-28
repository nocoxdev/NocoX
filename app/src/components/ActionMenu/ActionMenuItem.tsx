import type { CSSProperties } from 'react';
import type { PopconfirmProps } from 'antd';
import { Flex, Popconfirm, Spin } from 'antd';
import { styled } from 'styled-components';

export const StyledMenuItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 28px;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize}px;
  margin: 4px 0px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  color: ${({ theme }) => theme.colorTextSecondary};
  padding: 0px 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.controlItemBgHover};
  }

  &.danger {
    color: ${({ theme }) => theme.colorErrorText};

    &:hover {
      background-color: ${({ theme }) => theme.colorErrorBgHover};
    }
  }
`;

export type ActionMenuItemProps = {
  title: string;
  icon?: string | React.ReactElement;
  suffix?: string | React.ReactElement;
  confirm?: Omit<PopconfirmProps, 'onConfirm'>;
  className?: string;
  loading?: boolean;
  style?: CSSProperties;
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
};

const ActionMenuItem = (props: ActionMenuItemProps) => {
  const {
    title,
    icon,
    suffix,
    className,
    style,
    confirm,
    loading = false,
    onClick,
  } = props;

  const content = (
    <Flex justify="space-between" align="center">
      <Flex align="center" gap={8}>
        <Flex style={{ width: 16 }} justify="flex-start" align="center">
          {icon}
        </Flex>
        <span>{title}</span>
      </Flex>
      <Flex>{suffix}</Flex>
    </Flex>
  );

  return (
    <Spin spinning={loading} size="small">
      {confirm ? (
        <Popconfirm onConfirm={onClick} placement="bottom" {...confirm}>
          <StyledMenuItemContainer className={className} style={style}>
            {content}
          </StyledMenuItemContainer>
        </Popconfirm>
      ) : (
        <StyledMenuItemContainer
          className={className}
          style={style}
          onClick={onClick}
        >
          {content}
        </StyledMenuItemContainer>
      )}
    </Spin>
  );
};

export default ActionMenuItem;
