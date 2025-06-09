import { useMemo } from 'react';
import { Skeleton } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import DraggableTree from '@/components/DraggableTree';
import type { DragArgs } from '@/components/DraggableTree/type';
import { useExpandKeys } from '@/editor/hooks';
import { useApp } from '@/editor/selectors';
import { useMessage } from '@/selectors';
import { PageType } from '@/types';
import GroupItem from './GroupItem';
import PageItem from './PageItem';

const StyledTreeWrapper = styled.div`
  padding-inline: 12px;
  padding-block: 4px;
`;

const GroupList = observer(() => {
  const app = useApp();
  const message = useMessage();
  const [expandedKeys, setExpandedKeys] = useExpandKeys(app.pageIds);

  const treeData = useMemo(
    () =>
      app.pages
        .filter((item) => !item.parentId)
        .map((group) => ({
          key: group.id,
          canDrop: group.type === PageType.GROUP,
          canDrag: true,
          selectable: group.type !== PageType.GROUP,
          hoverable: group.type !== PageType.GROUP,
          attachedData: { type: 'group', order: group.order },

          title:
            group.type === PageType.GROUP ? (
              <GroupItem group={group} />
            ) : (
              <PageItem page={group} selected={app.curPage?.id === group.id} />
            ),

          children: app.pages
            .filter((page) => page.parentId === group.id)
            .map((page) => ({
              key: page.id,
              canDrop: false,
              canDrag: true,
              attachedData: { type: 'page', order: page.order },

              title: (
                <PageItem page={page} selected={app.curPage?.id === page.id} />
              ),
            })),
        })),
    [app.pages, app.curPage?.id],
  );

  const handleDrop = async (args: DragArgs | undefined) => {
    if (!args || !args.dragKey || !args.dropKey) {
      return;
    }

    const { dragItemConfig, dropItemConfig } = args;
    const dragPage = app.findPage(args.dragKey);
    const dropPage = app.findPage(args.dropKey);

    if (!dragItemConfig || !dropItemConfig || !dragPage || !dropPage) {
      return;
    }

    let toIndex: number = dropPage.order;
    let toPId = dropPage.parentId;

    if (args.placement === 'inner') {
      toIndex = 0;
      toPId = dropPage.id;
    } else {
      toIndex = toIndex + (args.placement === 'before' ? 0 : 1);
    }

    const resp = await app.reorderPage(args.dragKey, toPId, toIndex);

    if (resp?.success) {
      message.success(t('Success'));
    } else {
      message.error(resp?.message ?? t('Failed'));
    }
  };

  return (
    <Skeleton
      active
      loading={app.requestStates.fetchPages.status === 'pending'}
    >
      <StyledTreeWrapper>
        <DraggableTree
          data={treeData}
          indent={8}
          rootCanDrop={true}
          selectable={true}
          selectedKey={app.curPage?.id}
          onSelect={(key) => app.setCurPage(key)}
          expandedKeys={expandedKeys}
          onExpand={(keys) => setExpandedKeys(keys)}
          onDrop={(args) => handleDrop(args)}
        />
      </StyledTreeWrapper>
    </Skeleton>
  );
});

export default GroupList;
