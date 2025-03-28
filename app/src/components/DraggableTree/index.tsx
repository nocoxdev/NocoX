import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { styled } from 'styled-components';
import type { DraggableTreeContextType } from './DraggableTreeContext';
import { DraggableTreeContext } from './DraggableTreeContext';
import TreeNodeItem from './TreeNodeItem';
import type { IndicatorInstruction, TreeNodeData } from './type';

const StyledTreeWrapper = styled.div<{ $gap: number }>`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  flex-direction: column;
  gap: ${({ $gap }) => $gap}px;
  height: 100%;
`;

export interface DraggableTreeProps
  extends Partial<
    Pick<
      DraggableTreeContextType,
      | 'onDragStart'
      | 'onDragMove'
      | 'onDrop'
      | 'allowDrop'
      | 'indent'
      | 'expandedKeys'
      | 'switchIcon'
      | 'selectedKey'
      | 'selectable'
      | 'rootCanDrop'
    >
  > {
  defaultExpandedKeys?: string[];
  onExpand?: (keys: string[]) => void;
  defaultSelectedKeys?: string[];
  onSelect?: (key: string) => void;
  data?: TreeNodeData[];
  gap?: number;
  style?: CSSProperties;
}

export const DraggableTree = (props: DraggableTreeProps) => {
  const {
    indent = 16,
    switchIcon = IconChevronRight,
    data,
    rootCanDrop,
    onDragMove,
    onDrop,
    onDragStart,
    allowDrop,
    selectable = true,
    gap = 0,
    style,
  } = props;

  const [expandedKeys, setExpandedKeys] = useControllableValue<string[]>(
    props,
    {
      defaultValue: [],
      valuePropName: 'expandedKeys',
      trigger: 'onExpand',
    },
  );
  const [selectedKey, setSelectedKey] = useControllableValue<string>(props, {
    defaultValue: '',
    valuePropName: 'selectedKey',
    trigger: 'onSelect',
  });

  const ref = useRef<HTMLDivElement>(null);

  const [instruction, setInstruction] = useState<IndicatorInstruction>();
  const [sorting, setSorting] = useState<boolean>(false);

  const awaitingEnter = useRef<boolean>(false);

  const setWaitingEnter = (val: boolean) => {
    awaitingEnter.current = val;
  };

  const memoInstruction = useMemo(
    () => instruction,
    [JSON.stringify(instruction)],
  );

  const contextValue = useMemo<DraggableTreeContextType>(
    () => ({
      uniqueContextId: Symbol('unique-id'),
      switchIcon,
      indent,
      expandedKeys,
      selectedKey,
      instruction: memoInstruction,
      selectable,
      data: data ?? [],
      sorting,
      awaitingEnter,
      rootCanDrop,
      gap,
      setSorting,
      setWaitingEnter,
      setExpandedKeys,
      setSelectedKey,
      setInstruction,
      onDragStart,
      onDragMove,
      onDrop,
      allowDrop,
    }),
    [
      indent,
      switchIcon,
      expandedKeys,
      selectedKey,
      memoInstruction,
      rootCanDrop,
      data,
    ],
  );

  useEffect(() => {
    if (memoInstruction) {
      const { placement, dropKey, dragKey } = memoInstruction;
      onDragMove?.({
        dragKey,
        dropKey,
        placement,
      });
    } else {
      onDragMove?.();
    }
  }, [memoInstruction]);

  return (
    <DraggableTreeContext.Provider value={contextValue}>
      <StyledTreeWrapper ref={ref} style={style} $gap={gap}>
        {data?.map((item) => <TreeNodeItem key={item.key} item={item} />)}
      </StyledTreeWrapper>
    </DraggableTreeContext.Provider>
  );
};

export default DraggableTree;
