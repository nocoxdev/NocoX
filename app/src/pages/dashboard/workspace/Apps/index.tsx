import { Flex, Skeleton } from 'antd';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import ErrorBoundary from '@/components/ErrorBoundary';
import { StyledContentContainer } from '../../../common/styled';
import { useAppStore, useWorkspace } from '../selectors';
import AppCardList from './AppCardList';
import Toolbar from './Toolbar';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Apps = observer(() => {
  const workspace = useWorkspace();
  const store = useAppStore();

  return (
    <StyledContentContainer>
      <Skeleton
        loading={workspace.requestStates.load.status === 'pending'}
        style={{ padding: 24 }}
      >
        <StyledContainer>
          <Toolbar />
          <Flex vertical gap={12}>
            <ErrorBoundary onReset={() => store.loadList()}>
              <AppCardList />
            </ErrorBoundary>
          </Flex>
        </StyledContainer>
      </Skeleton>
    </StyledContentContainer>
  );
});

export default Apps;
