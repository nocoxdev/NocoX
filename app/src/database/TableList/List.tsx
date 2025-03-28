import { useMemo } from 'react';
import { Empty, Skeleton } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import DraggableTree from '@/components/DraggableTree';
import type { DragArgs } from '@/components/DraggableTree/type';
import { useStore } from '@/database/selectors';
import { useMessage } from '@/selectors';
import TableItem from './TableItem';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-inline: 6px 12px;
`;

const List = observer(() => {
  const store = useStore();
  const message = useMessage();

  const data = useMemo(
    () =>
      store.tables.map((item) => ({
        key: item.id,
        canDrop: false,
        canDrag: true,
        selectable: true,
        hoverable: true,
        showSwitch: false,
        title: (
          <TableItem
            key={item.id}
            data={item.info}
            onDelete={() => store.deleteTable(item.id)}
          />
        ),
      })),
    [store.tables],
  );

  const handleReorder = async (args: DragArgs | undefined) => {
    if (!args || !args.dragKey || !args.dropKey) {
      return;
    }

    const dragTable = store.tables.find((item) => item.id === args.dragKey);
    const dropTable = store.tables.find((item) => item.id === args.dropKey);

    if (!dragTable || !dropTable) {
      return;
    }

    let toIndex =
      args.placement === 'after' ? dropTable.order + 1 : dropTable.order;

    const resp = await store.reorderTable(args.dragKey, toIndex);

    if (!resp?.success) {
      message.error(resp?.message || t('Unknown error'));
    }
  };

  return (
    <StyledContainer>
      <Skeleton
        loading={store.requestStates.loadList.status === 'pending'}
        active
      >
        {store.tables.length > 0 ? (
          <DraggableTree
            data={data}
            indent={0}
            rootCanDrop={true}
            selectedKey={store.current?.id}
            onSelect={(key) => store.setCurrent(key)}
            onDrop={(args) => handleReorder(args)}
            gap={2}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ marginTop: 80 }}
            description={t('No Tables')}
          />
        )}
      </Skeleton>
    </StyledContainer>
  );
});

export default List;
