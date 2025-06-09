import { Fragment, useMemo } from 'react';
import { Empty } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import { CANVAS_ID } from '@/constants';
import { useAutoSavePage } from '@/editor/hooks';
import { useForceRenderKey } from '@/utils/hooks';
import { useCurPage } from '../../selectors';
import DraggingMask from './DraggingMask';
import DropIndicator from './DropIndicator';
import Hovering from './Hovering';
import Selection from './Selection';

const StyledContainer = styled.div`
  position: relative;
  margin: 0 auto;

  .ant-modal {
    padding-bottom: 0 !important;
  }

  .ant-modal-mask {
    position: absolute !important;
    z-index: 2 !important;
  }
  .ant-modal-wrap {
    position: absolute !important;
    z-index: 2 !important;
  }
`;

const StyledToolsContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  overflow: visible;
`;

const StyledPageWrapper = styled.div`
  display: block;
  width: 100%;
  > div {
    margin: 0 auto;
  }
`;

const StyledEmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: auto;
`;

const Canvas = observer(({ ref }: { ref: React.Ref<HTMLDivElement> }) => {
  const currentPage = useCurPage();

  useAutoSavePage();
  const key = useForceRenderKey([currentPage?.nodes]);
  const content = useMemo(() => {
    return currentPage?.render('edit');
  }, [key, currentPage?.jsonString]);

  return (
    <StyledContainer ref={ref} id={CANVAS_ID}>
      <StyledToolsContainer>
        <DropIndicator />
        <Hovering />
        <Selection />
        <DraggingMask />
      </StyledToolsContainer>

      <StyledPageWrapper>
        {currentPage ? (
          <Fragment key={key}>{content}</Fragment>
        ) : (
          <StyledEmptyWrapper>
            <Empty description={t('Please create or select page')} />
          </StyledEmptyWrapper>
        )}
      </StyledPageWrapper>
    </StyledContainer>
  );
});

export default Canvas;
