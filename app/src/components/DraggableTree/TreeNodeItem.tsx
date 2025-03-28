import { use, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import type { Input } from '@atlaskit/pragmatic-drag-and-drop/types';
import { useLatest } from 'ahooks';
import { delay } from 'lodash-es';
import { motion } from 'motion/react';
import { styled } from 'styled-components';
import { DraggableTreeContext } from './DraggableTreeContext';
import DragPreview from './DragPreview';
import DropIndicator from './DropIndicator';
import ParentHighlight from './ParentHighlight';
import SwitchIcon from './SwitchIcon';
import type { TreeNodeData } from './type';
import {
  calcLevel,
  find,
  genInstruction,
  getDropPlacement,
  hasChildren,
} from './utils';

const StyledWapper = styled.div<{ $selected: boolean }>`
  position: relative;
  background: ${({ $selected, theme }) =>
    $selected && `${theme.colorPrimaryBg}66`};
`;

const StyledContainer = styled.div<{
  $dropping: boolean;
  $selected: boolean;
  $hoverable: boolean;
}>`
  display: flex;
  position: relative;
  align-items: center;
  height: ${({ theme }) => theme.controlHeightSM - 2}px;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background: ${({ $selected, theme }) => $selected && theme.colorPrimaryBg};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background: ${({ $dropping, $hoverable, $selected, theme }) =>
      !$dropping && $hoverable && !$selected && theme.colorFillQuaternary};
  }
`;

const StyledTitleContainer = styled.div<{
  $dropping: boolean;
  $dragging: boolean;
  $left: number;
  $hoverable: boolean;
  $showSwitch: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  height: 100%;
  padding-left: ${({ $left }) => $left}px;
  position: relative;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: ${({ $dropping, $hoverable, theme }) =>
      $dropping || !$hoverable ? 'transparent' : theme.colorFillQuaternary};
  }

  &::after {
    display: ${({ $dragging }) => ($dragging ? 'block' : 'none')};
    content: '';
    position: absolute;
    left: ${({ $left, $showSwitch }) => $left + ($showSwitch ? 16 : 0)}px;
    top: 0;
    width: ${({ $left, $showSwitch }) =>
      `calc(100% - ${$left + ($showSwitch ? 16 : 0)}px)`};
    height: 100%;
    background: ${({ theme }) => theme.colorBgContainerDisabled};
    border-radius: ${({ theme }) => theme.borderRadius}px;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 4px;
  height: 100%;
  align-items: center;
`;

interface TreeNodeItemProps {
  item: TreeNodeData;
}

const TreeNodeItem = ({ item }: TreeNodeItemProps) => {
  const {
    indent,
    selectable,
    selectedKey,
    expandedKeys,
    data,
    instruction,
    sorting,
    rootCanDrop,
    awaitingEnter: waitForEnter,
    setWaitingEnter: setWaitForEnter,
    setSelectedKey,
    setExpandedKeys,
    setInstruction,
    onDragStart,
    onDrop,
    allowDrop,
    setSorting,
  } = use(DraggableTreeContext);

  const ref = useRef<HTMLDivElement>(null);

  const latestItem = useLatest(item);
  const latestData = useLatest(data);
  const latestInstruction = useLatest(instruction);

  const [dragging, setDragging] = useState(false);
  const [dropping, setDropping] = useState(false);

  const [previewContainer, setPreviewContainer] = useState<HTMLElement>();

  const expanded = useMemo(() => {
    if (dragging) {
      return false;
    }

    return expandedKeys?.includes(item.key);
  }, [expandedKeys, item.key, dragging]);

  const selected = useMemo(() => {
    return selectedKey === item.key;
  }, [selectedKey, item.key]);

  const handleExpand = () => {
    expanded
      ? setExpandedKeys((prev) => prev.filter((key) => key !== item.key))
      : setExpandedKeys((prev) => [...prev, item.key]);
  };

  const showIndicator = useMemo(() => {
    if (
      dragging &&
      instruction?.placement === 'inner' &&
      instruction.indicatorKey === item.key
    ) {
      return false;
    }
    return instruction && instruction.indicatorKey === item.key;
  }, [dragging, instruction]);

  const showParentHighlight = useMemo(() => {
    if (!instruction) {
      return false;
    }

    if (instruction.placement === 'inner' && instruction.dropKey == item.key) {
      return false;
    }

    return (
      instruction?.dropKey &&
      item.children &&
      item.children.map((child) => child.key).includes(instruction.dropKey)
    );
  }, [instruction, item]);

  const canDrop = useMemo(() => {
    // if (item.key === instruction?.dragKey) {
    //   return false;
    // }

    return allowDrop === undefined ? true : allowDrop(instruction);
  }, [dragging, item, allowDrop, instruction]);

  const level = useMemo(() => {
    return calcLevel(data, item.key);
  }, [data, item.key]);

  useEffect(() => {
    return combine(
      draggable({
        element: ref.current!,
        getInitialData: () => {
          return {
            key: latestItem.current.key,
            config: latestItem.current.attachedData,
          };
        },
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            getOffset: pointerOutsideOfPreview({ x: '0', y: '0' }),
            render: ({ container }) => {
              setPreviewContainer(container);
              return () => setPreviewContainer(undefined);
            },
            nativeSetDragImage,
          });
        },
        canDrag: () => {
          return latestItem.current.canDrag !== false;
        },

        onDragStart: () => {
          setDragging(true);
          setSorting(true);
          onDragStart?.(
            latestItem.current.key,
            latestItem.current.attachedData,
          );
        },

        onDrop: () => {
          setDragging(false);
          onDrop?.(latestInstruction.current);
          setInstruction(undefined);
          setSorting(false);
        },
      }),
      dropTargetForElements({
        element: ref.current!,
        getData: ({ input }) => {
          return { input };
        },
        onDrag: ({ source, self }) => {
          setWaitForEnter(false);
          const input = self.data.input as Input;

          const position = {
            x: input.clientX,
            y: input.clientY,
          };
          const dragKey = source.data.key as string;

          if (!dragging) {
            delay(() => {
              setExpandedKeys((prev) => [...prev, latestItem.current.key]);
            }, 500);
          }

          const { placement, dropKey } = getDropPlacement(
            latestData.current,
            dragKey,
            latestItem.current,
            self.element,
            position,
            indent,
          );

          const newInstruction = genInstruction(
            latestData.current,
            dragKey,
            dropKey,
            placement,
            rootCanDrop,
          );

          setDropping(true);

          const dropItem = find(
            latestData.current,
            (item) => item.key === newInstruction?.dropKey,
          );

          setInstruction(
            newInstruction && {
              ...newInstruction,
              dragItemConfig: source.data.config as Record<string, any>,
              dropItemConfig: dropItem?.attachedData,
            },
          );
        },

        onDragLeave: () => {
          setDropping(false);

          // optimize for the case where the user drags an item from one tree and drops it into another
          // avoid indicator flickering
          setWaitForEnter(true);

          delay(() => {
            if (waitForEnter.current) {
              setWaitForEnter(false);
              setInstruction((pre) => pre && { dragKey: pre?.dragKey });
            }
          }, 1000);
        },

        onDrop: () => {
          setDropping(false);
        },
      }),
    );
  }, []);

  return (
    <StyledWapper $selected={sorting ? false : selected}>
      <StyledContainer
        ref={ref}
        $dropping={dropping}
        $selected={sorting ? false : selected}
        $hoverable={item.hoverable !== false}
        onClick={() =>
          selectable && item.selectable !== false && setSelectedKey(item.key)
        }
      >
        <StyledTitleContainer
          $left={level * indent}
          $dragging={dragging}
          $dropping={dropping}
          $hoverable={item.hoverable !== false}
          $showSwitch={item.showSwitch !== false}
          className={item.className}
        >
          {item.showSwitch !== false && (
            <SwitchIcon
              expanded={expanded}
              onClick={handleExpand}
              visible={hasChildren(item)}
            />
          )}

          <StyledTitle style={item.style}>{item.title}</StyledTitle>
        </StyledTitleContainer>

        {showIndicator && instruction && (
          <DropIndicator
            instruction={instruction}
            canDrop={canDrop}
            showSwitch={item.showSwitch !== false}
          />
        )}
      </StyledContainer>
      {showParentHighlight && instruction && (
        <ParentHighlight level={level} canDrop={canDrop} />
      )}
      {hasChildren(item) && (
        <motion.div
          initial={false}
          animate={
            expanded
              ? { height: 'auto', opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.2 }}
          style={{ display: expanded ? 'block' : 'none' }}
        >
          {item.children!.map((child) => (
            <TreeNodeItem key={child.key} item={child} />
          ))}
        </motion.div>
      )}

      {previewContainer &&
        ReactDOM.createPortal(
          <DragPreview label={item.title} />,
          previewContainer,
        )}
    </StyledWapper>
  );
};

export default TreeNodeItem;
