import { use } from 'react';
import { styled, useTheme } from 'styled-components';
import { DraggableTreeContext } from './DraggableTreeContext';

const StyledContainer = styled.div<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 12px;
  svg {
    transition: transform 0.2s ease-in-out;
    transform: ${({ $expanded }) => $expanded && 'rotate(90deg)'};
  }
`;

const StyledNoSwitchIcon = styled.div`
  width: 12px;
`;

interface SwitchIconProps {
  expanded: boolean;
  visible: boolean;
  onClick: () => void;
}

const SwitchIcon = (props: SwitchIconProps) => {
  const { expanded, visible, onClick } = props;

  const theme = useTheme();
  const { switchIcon: SwitchIcon } = use(DraggableTreeContext);

  return visible ? (
    <StyledContainer $expanded={expanded} onClick={onClick}>
      <SwitchIcon color={theme.colorTextTertiary} size={10} />
    </StyledContainer>
  ) : (
    <StyledNoSwitchIcon />
  );
};

export default SwitchIcon;
