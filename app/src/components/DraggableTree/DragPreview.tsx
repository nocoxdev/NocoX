import type { ReactNode } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize}px;
  min-width: 50px;
  border-radius: 4px;
  background: #566edf33;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px 12px;
  color: #566edf;
  height: 28px;
  position: fixed;
`;

interface DragPreviewProps {
  label: ReactNode;
  style?: React.CSSProperties;
}

const DragPreview = (props: DragPreviewProps) => {
  const { label, style } = props;

  return <StyledContainer style={style}>{label}</StyledContainer>;
};

export default DragPreview;
