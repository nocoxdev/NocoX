import type { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { useLazyRender } from '@/utils/hooks/useLazyRender';

export const StyledContainer = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  width: 100%;
`;

interface PanelProps {
  active: boolean;
  style?: React.CSSProperties;
}

const Panel = (props: PropsWithChildren<PanelProps>) => {
  const { active, children, style } = props;

  const isRendered = useLazyRender(active);

  return (
    isRendered && (
      <StyledContainer $visible={active} style={style}>
        {children}
      </StyledContainer>
    )
  );
};

export default Panel;
