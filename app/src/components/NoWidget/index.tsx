import type { CSSProperties } from 'react';
import { styled } from 'styled-components';
import { useAppRunningMode } from '@/editor/selectors';

const StyledContainer = styled.div`
  display: flex;
  user-select: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px dashed #ddd;
  background: #fafafa;
  min-height: 24px;
  height: 100%;
  color: ${({ theme }) => theme.colorTextTertiary};
  font-size: ${({ theme }) => theme.fontSize}px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

export interface NoWidgetProps {
  description?: string;
  className?: string;
  height?: number | string;
  width?: number | string;
  style?: React.CSSProperties;
}

const NoWidget = (props: NoWidgetProps) => {
  const { className, description, width, height, style } = props;
  const mode = useAppRunningMode();
  const mergedStyle: CSSProperties = {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    ...style,
  };

  return (
    mode === 'edit' && (
      <StyledContainer className={className} style={mergedStyle}>
        {description}
      </StyledContainer>
    )
  );
};

export default NoWidget;
