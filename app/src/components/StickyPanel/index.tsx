import type { ReactNode } from 'react';
import { useRef } from 'react';
import { styled } from 'styled-components';
import { useSticky } from '@/utils/hooks';

const StickyPanelContainer = styled.div`
  position: relative;
`;

const HeaderContainer = styled.div<{
  $hasShadow?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize}px;
  cursor: pointer;
  position: sticky !important;
  top: 0px;
  z-index: 1;
  background-color: white;
  box-shadow: ${({ $hasShadow }) =>
    `${$hasShadow ? ' 0px 4px 8px rgba(0, 0, 0, 0.05)' : 'none'}`};
`;

export interface StickyPanelProps {
  header: ReactNode;
  children: ReactNode;
}

const StickyPanel = (props: StickyPanelProps) => {
  const { header, children } = props;

  const ref = useRef<HTMLDivElement>(null);
  const sticky = useSticky(
    ref.current,
    ref.current?.parentElement?.parentElement,
  );

  return (
    <StickyPanelContainer ref={ref}>
      <HeaderContainer $hasShadow={sticky}>{header}</HeaderContainer>
      {children}
    </StickyPanelContainer>
  );
};

export default StickyPanel;
