import { useMemo, useRef } from 'react';
import classNames from 'classnames';
import { isFunction } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import DraggableTree from '@/components/DraggableTree';
import type { DragArgs } from '@/components/DraggableTree/type';
import { useExpandKeys } from '@/editor/hooks';
import { useCurPage, useDnd, useSelection } from '@/editor/selectors';
import OutlineTreeNode from './OutlineTreeNode';
import { genTreeData } from './utils';

const StyledWrapper = styled.div`
  padding-block: 8px 30px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100% - 72px);
  padding-left: 12px;
  padding-right: 4px;
  margin-right: 0px;
  margin-bottom: 1px;
`;

const OutlineTree = observer(() => {
  const selection = useSelection();
  const curPage = useCurPage();
  const dnd = useDnd();

  const ref = useRef<HTMLDivElement>(null);
  const [expandedKeys, setExpandedKeys] = useExpandKeys(curPage?.ids);

  const treeData = useMemo(
    () =>
      genTreeData(curPage?.rootNodes || [], (pNode, node, level) => {
        if (pNode) {
          const config = pNode.props.getConfig(node.attrName);

          if (config) {
            const cbArgs = pNode.getCbArgs(config.name);
            const visible = isFunction(config?.treeVisible)
              ? config.treeVisible(cbArgs)
              : config?.treeVisible !== false;

            if (!visible) {
              return;
            }
          }
        }

        return {
          key: node.id,
          title: <OutlineTreeNode node={node} level={level} />,
          canDrop: node.widget.canDrop,
          canDrag: node.widget.canDrag,
        };
      }),
    [curPage?.rootNodes, selection.node?.props.record],
  );

  const handleDragStart = (key: string) => {
    selection.select();
    dnd.drag({
      dragId: key,
      type: 'update',
    });
  };

  const handleMove = (args?: DragArgs) => {
    if (!args) {
      dnd.move();
      return;
    }
    const { dropKey, placement } = args;
    const dropNode = curPage?.findNode(dropKey);

    if (!dropNode) {
      dnd.move();
    } else {
      dnd.move({
        overId: dropKey,
        placement,
      });
    }
  };

  const handleDrop = () => {
    dnd.drop();
  };

  return (
    curPage && (
      <StyledWrapper
        ref={ref}
        className={classNames({ dragging: dnd.dragging })}
      >
        <DraggableTree
          key={curPage.id}
          data={treeData}
          indent={18}
          selectable={true}
          selectedKey={selection.id}
          onSelect={(key) => selection.select(key)}
          expandedKeys={expandedKeys}
          onExpand={(keys) => setExpandedKeys(keys)}
          onDragStart={handleDragStart}
          onDragMove={(args) => handleMove(args)}
          onDrop={handleDrop}
          allowDrop={(args) => {
            if (args?.dropKey && !dnd.dropInfo) {
              return true;
            } else {
              return dnd.allowDrop;
            }
          }}
          style={{ height: 'auto' }}
        />
      </StyledWrapper>
    )
  );
});

export default OutlineTree;
