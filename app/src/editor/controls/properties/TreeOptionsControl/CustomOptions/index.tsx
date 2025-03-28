import { useEffect, useMemo, useState } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { useControllableValue, usePrevious } from 'ahooks';
import { Button, Tree } from 'antd';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { DataNode } from 'antd/es/tree';
import { t } from 'i18next';
import styled, { css } from 'styled-components';
import type { TreeOptionsValueType } from '../type';
import TreeNodeItem from './TreeNodeItem';
import {
  addTreeNode,
  collectSpecifiedPropValues,
  modifyTreeNode,
  moveTreeNode,
  removeTreeNode,
} from './utils';

const StyledContainer = styled.div<{ $dragging: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;

  .ant-tree-switcher {
    width: 12px;
    margin-inline-end: 4px;
    .ant-tree-switcher-icon {
      font-size: 8px;
    }

    &::before {
      display: none;
    }

    &:hover {
      .ant-tree-switcher-icon {
        color: ${({ theme }) => theme.colorPrimary};
      }
    }
  }

  .ant-tree .ant-tree-treenode {
    margin-bottom: 4px;
    .ant-tree-node-content-wrapper {
      border: 1px solid transparent;
      background-color: ${({ theme }) => theme.colorPrimaryBg}aa;
      box-sizing: border-box;

      &:hover {
        background-color: ${({ theme }) => theme.colorPrimaryBgHover};
      }
    }

    &.dragging {
      .ant-tree-node-content-wrapper {
        background-color: ${({ theme }) => theme.colorPrimaryBgHover};
        border: 1px solid ${({ theme }) => theme.colorPrimary};
      }
      &::after {
        border: none !important;
      }
    }
  }

  ${({ $dragging }) =>
    !$dragging &&
    css`
      .ant-tree {
        .ant-tree-node-content-wrapper {
          overflow: hidden !important;
        }
      }
    `}
`;

const TREENODE_CONTENT_CLASS = '.ant-tree-node-content-wrapper';

interface CustomOptionsProps {
  defaultValue?: TreeOptionsValueType[];
  value?: TreeOptionsValueType[];
  size?: SizeType;
  variant?: Variant;
  onChange: (value: TreeOptionsValueType[]) => void;
}

const CustomOptions = (props: CustomOptionsProps) => {
  const [value, setValue] = useControllableValue<TreeOptionsValueType[]>(props);
  const { size, variant } = props;
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const previous = usePrevious(value);

  const [dragging, setDragging] = useState(false);

  const handleDrop = (info: any) => {
    setValue((pre) => moveTreeNode(pre, info));
  };

  const handleAdd = (parentKey?: string) => {
    setValue((pre) => addTreeNode(pre, parentKey));
  };

  const handleEdit = (option: TreeOptionsValueType) => {
    setValue((pre) => modifyTreeNode(pre, option.value, option.label));
  };

  const handleDelete = (key: string) => {
    setValue((pre) => removeTreeNode(pre, key));
  };

  const items = useMemo(() => {
    // Generate tree data
    const loop = (data: TreeOptionsValueType[]): DataNode[] => {
      return data.map((item) => {
        const title = (
          <TreeNodeItem
            size={size}
            variant={variant}
            option={item}
            onEdit={handleEdit}
            onAdd={handleAdd}
            onDelete={handleDelete}
          />
        );
        return {
          key: item.value,
          selectable: false,
          title,
          children: loop(item.children || []),
        };
      });
    };

    return loop(value || []);
  }, [value]);

  const handleDragEnter = (info: any) => {
    setExpandedKeys(info.expandedKeys);
  };

  useEffect(() => {
    const allKeys = collectSpecifiedPropValues(value, 'value');
    const previousKeys = collectSpecifiedPropValues(previous || [], 'value');

    setExpandedKeys((pre) =>
      pre
        .filter((item) => allKeys.includes(item))
        .concat(
          allKeys
            .filter((item) => !previousKeys.includes(item))
            .map((item) => item),
        ),
    );
  }, [value]);

  return (
    <StyledContainer $dragging={dragging}>
      <Tree
        blockNode
        treeData={items}
        showIcon={false}
        selectable={false}
        expandedKeys={expandedKeys}
        onExpand={(keys) => {
          setExpandedKeys(keys as string[]);
        }}
        switcherIcon={<DownOutlined />}
        draggable={{
          icon: false,
        }}
        onDragStart={(info: any) => {
          setDragging(true);
          // Reset drag image, change mouse pointer to top left corner
          info.event.dataTransfer.setDragImage(
            info.event.target.querySelector(TREENODE_CONTENT_CLASS),
            0,
            0,
          );
        }}
        onDragEnter={handleDragEnter}
        onDragEnd={() => {
          setDragging(false);
        }}
        onDrop={handleDrop}
      />

      <Button
        icon={<PlusOutlined />}
        size={size}
        style={{ width: '100%', height: 28 }}
        color="default"
        variant="dashed"
        onClick={() => handleAdd()}
      >
        {t('New option')}
      </Button>
    </StyledContainer>
  );
};

export default CustomOptions;
