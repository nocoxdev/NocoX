import { styled } from 'styled-components';
import { useCurrentSize } from '../../hooks';
import type { ToolbarProps } from './ToolbarItems';
import ToolbarItems from './ToolbarItems';

export const StyledContainer = styled.div<{ $height: number }>`
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
  padding-inline: 4px;
  height: ${({ $height }) => $height + 2}px;

  box-shadow:
    0 2px 4px -2px rgba(34, 47, 62, 0.1),
    0 4px 8px -4px rgba(34, 47, 62, 0.07);
`;

const FixedToolbar = (props: ToolbarProps) => {
  const { toolbar } = props;

  const { height } = useCurrentSize();
  return (
    <StyledContainer $height={height}>
      <ToolbarItems toolbar={toolbar} />
    </StyledContainer>
  );
};

export default FixedToolbar;
