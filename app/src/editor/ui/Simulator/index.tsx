import { Suspense, useEffect, useRef } from 'react';
import { useScroll } from 'ahooks';
import { Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import {
  useDndEffect,
  useDndListener,
  useHoverListener,
  useSelectListener,
} from '@/editor/hooks';
import { useDomObserver } from '@/utils/hooks';
import { useCanvas } from '../../selectors';
import Footer from './Breadcrumb';
import Canvas from './Canvas';
import Ghost from './Ghost';

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledScrollerContainer = styled.div`
  height: calc(100% - 32px);
  width: 100%;
  padding: 48px 72px;
  overflow: auto;
`;

const Simulator = observer(() => {
  const ref = useRef<HTMLDivElement>(null);
  const canavasRef = useRef<HTMLDivElement>(null);
  const canvas = useCanvas();
  const scroll = useScroll(ref);

  useHoverListener(ref.current || document.body);
  useSelectListener(ref.current || document.body);
  useDndListener(document.body);
  useDndEffect();
  useDomObserver(canavasRef.current, (rect) => canvas.resize(rect), [
    canavasRef.current,
    canvas.scollPosition,
  ]);

  useEffect(() => {
    scroll && canvas.scroll({ x: scroll.left, y: scroll.top });
  }, [scroll]);

  return (
    <Suspense fallback={<Skeleton active />}>
      <StyledContainer>
        <StyledScrollerContainer ref={ref}>
          <Ghost />
          <Canvas ref={canavasRef} />
        </StyledScrollerContainer>
        <Footer />
      </StyledContainer>
    </Suspense>
  );
});

export default Simulator;
