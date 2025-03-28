import { css, styled } from 'styled-components';

export const StyledIconButton = styled.div<{
  $size?: number;
  $danger?: boolean;
}>`
  display: flex;
  width: ${({ $size }) => ($size || 24) + 'px'};
  height: ${({ $size }) => ($size || 24) + 'px'};
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colorTextTertiary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colorTextSecondary};
    svg {
      stroke: ${({ theme }) => theme.colorTextSecondary};
    }
  }

  ${({ $danger }) =>
    $danger &&
    css`
      color: ${({ theme }) => theme.colorErrorText};
      &:hover {
        color: ${({ theme }) => theme.colorErrorTextActive};
        svg {
          stroke: ${({ theme }) => theme.colorErrorTextActive};
        }
      }
    `}
`;

export const StyledBreadcrumbTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colorText};
`;

export const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};
`;

export const StyledLeftPanelHeader = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.controlHeightSM}px;
  justify-content: space-between;
  padding-inline: 12px;

  > span {
    font-weight: 600;
  }
`;

export const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: white;
  padding-inline: 12px;
  padding-bottom: 20px;
  box-shadow: ${({ theme }) => theme.boxShadowTertiary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  margin: 20px;
`;

export const StyleEmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 50px;
  border: 1px dashed ${({ theme }) => theme.colorBorder};
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;
