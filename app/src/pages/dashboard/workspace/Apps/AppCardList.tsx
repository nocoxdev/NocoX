import { Empty, Flex, Skeleton } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { StyleEmptyContainer } from '@/components/common.styled';
import { useAppStore } from '../selectors';
import AppCard from './AppCard';
import { AppContext } from './AppContext';

const AppCardList = observer(() => {
  const store = useAppStore();

  return (
    <Skeleton
      loading={store.requestStates.loadList.status === 'pending'}
      active
    >
      {store.apps.length === 0 ? (
        <StyleEmptyContainer>
          <Empty description={t('No apps')} />
        </StyleEmptyContainer>
      ) : (
        <Flex
          gap={12}
          wrap="wrap"
          justify={store.apps.length === 0 ? 'center' : 'normal'}
        >
          {store.apps.map((item) => (
            <AppContext.Provider key={item.id} value={{ app: item }}>
              <AppCard />
            </AppContext.Provider>
          ))}
        </Flex>
      )}
    </Skeleton>
  );
});

export default AppCardList;
