import type { Key } from 'react';
import { use, useEffect, useMemo, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Tree } from 'antd';
import styled from 'styled-components';
import type { EventConfig } from '@/editor/actions/type';
import type { NodeEvent } from '@/types';
import { EventSettingContext } from './EventSettingContext';
import type { TreeNode } from './type';
import { getAllKeys, makeEventTree, moveEventNode } from './utils';

const TREENODE_CONTENT_CLASS = '.ant-tree-node-content-wrapper';

const StyledContainer = styled.div`
  width: 100%;

  .ant-tree {
    .ant-tree-indent-unit {
      width: 20px;
    }
    .ant-tree-treenode {
      height: ${({ theme }) => theme.controlHeightSM - 2}px;
      padding: 0px;
      margin-bottom: 1px;

      .ant-tree-switcher {
        width: 12px;
        margin-inline-end: 2px;
        text-align: left;
        &::before {
          width: 16px;
        }

        .ant-tree-switcher-icon {
          color: ${({ theme }) => theme.colorTextTertiary};
          font-size: 8px;
        }

        &:not(.ant-tree-switcher-noop):hover:before {
          background-color: transparent;
        }
      }

      .ant-tree-node-content-wrapper {
        padding-inline: 4px;
        /* border: 1px solid transparent; */
        &.ant-tree-node-selected {
          background-color: ${({ theme }) =>
            theme.colorPrimaryBorder}aa !important;
        }
        &:hover:not(&.ant-tree-node-selected) {
          background-color: ${({ theme }) => theme.colorPrimaryBg}aa !important;
        }
      }

      &.dragging {
        .ant-tree-node-content-wrapper {
          background-color: ${({ theme }) => theme.colorPrimaryBgHover};
        }
        &::after {
          border: none !important;
        }
      }
    }
  }
`;

interface ActionTreeProps {
  config: EventConfig;
  value: NodeEvent;
  onChange: (value: NodeEvent) => void;
}

const ActionTree = (props: ActionTreeProps) => {
  const { config } = props;
  const [value, setValue] = useControllableValue<NodeEvent>(props);
  const [renderKey, setRenderKey] = useState(0);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const { configs, node } = use(EventSettingContext);

  const treeData = useMemo(
    () =>
      makeEventTree(node.id, value, config, configs, (val) => {
        setValue((pre) => ({ ...pre, ...val }));
        setRenderKey((pre) => pre + 1);
      }).children,
    [config, node.id, value],
  );

  useEffect(() => {
    expandedKeys.length === 0 && setExpandedKeys(getAllKeys(value));
  }, [value]);

  const handleDrop = (info: any) => {
    const dragNode = info.dragNode as TreeNode;
    const dropNode = info.node as TreeNode;
    const dropPosition = info.dropPosition;
    const toIndex = dragNode.pKey === dropNode.key ? 0 : dropPosition;

    const newEvent = moveEventNode(
      value,
      dragNode.pKey,
      dragNode.key as string,
      toIndex,
    );

    setValue(newEvent);
  };

  return (
    <StyledContainer>
      <Tree<TreeNode>
        key={renderKey}
        blockNode
        treeData={treeData as any}
        defaultExpandAll
        switcherIcon={<DownOutlined />}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
        draggable={{
          icon: false,
        }}
        allowDrop={({ dragNode, dropNode, dropPosition }) => {
          return (
            (dragNode.pKey === dropNode.pKey && dropPosition !== 0) ||
            (dropPosition === 0 && dropNode.key === dragNode.pKey)
          );
        }}
        onDragStart={(info: any) => {
          // Reset drag image, change mouse pointer to top left corner
          info.event.dataTransfer.setDragImage(
            info.event.target.querySelector(TREENODE_CONTENT_CLASS),
            0,
            0,
          );
        }}
        onDrop={handleDrop}
      />
    </StyledContainer>
  );
};

export default ActionTree;
