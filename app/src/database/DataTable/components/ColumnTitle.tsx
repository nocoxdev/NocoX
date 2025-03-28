import { Tooltip } from 'antd';
import classNames from 'classnames';
import { styled, useTheme } from 'styled-components';
import type { UiType } from '@/types';
import { useColumnIcon } from '../hooks';

const StyledContainer = styled.div<{ $gap: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap}px;

  &.system {
    > svg {
      path:last-child {
        stroke: ${({ theme }) => theme.colorPrimary};
      }
    }
  }
`;

const StyledTitle = styled.div`
  display: block;
  color: ${({ theme }) => theme.colorTextSecondary};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface ColumnTitleProps {
  type: UiType;
  title: string;
  iconSize?: number;
  system?: boolean;
  primaryKey?: boolean;
  gap?: number;
}

const ColumnTitle = (props: ColumnTitleProps) => {
  const {
    type,
    title,
    iconSize = 14,
    system = false,
    primaryKey = false,
    gap = 8,
  } = props;
  const theme = useTheme();
  const Icon = useColumnIcon(type);
  return (
    <StyledContainer className={classNames({ system })} $gap={gap}>
      {Icon && <Icon size={iconSize} color={theme.colorTextSecondary} />}
      {title && (
        <StyledTitle>
          <Tooltip title={title}>{title} </Tooltip>
          {primaryKey && (
            <span style={{ color: theme.colorErrorText, marginLeft: 2 }}>
              *
            </span>
          )}
        </StyledTitle>
      )}
    </StyledContainer>
  );
};
export default ColumnTitle;
