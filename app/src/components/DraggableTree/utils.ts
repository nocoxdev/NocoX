import type { DropPlacement, Position } from '@/types';
import type { IndicatorInstruction, TreeNodeData } from './type';

export function hasChildren(item: TreeNodeData): boolean {
  return item.children ? item.children.length > 0 : false;
}

export function find(
  data: TreeNodeData[],
  predicate: (item: TreeNodeData) => boolean,
): TreeNodeData | undefined {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (predicate(item)) {
      return item;
    }

    if (hasChildren(item)) {
      const result = find(item.children!, predicate);
      if (result) {
        return result;
      }
    }
  }
}

export function findParent(
  data: TreeNodeData[],
  itemId: string,
): TreeNodeData | undefined {
  return find(data, (item) =>
    item.children ? item.children.some((child) => child.key === itemId) : false,
  );
}

export function calcLevel(
  data: TreeNodeData[],
  itemId: string,
  level: number = 0,
): number {
  const item = findParent(data, itemId);

  if (!item) {
    return level;
  }

  return calcLevel(data, item.key, level + 1);
}

export function findLastDescendant(
  data: TreeNodeData[],
  itemId: string,
): TreeNodeData | undefined {
  const item = find(data, (item) => item.key === itemId);

  if (!item) {
    return;
  }

  if (item.children && item.children.length > 0) {
    const lastChild = item.children[item.children.length - 1];
    return findLastDescendant(item.children, lastChild.key);
  } else {
    return item;
  }
}

export function getDropPlacement(
  data: TreeNodeData[],
  dragKey: string,
  dropItem: TreeNodeData,
  element: Element,
  position: Position,
  indent: number,
): { placement: DropPlacement; dropKey: string } {
  const rect = element.getBoundingClientRect();

  let placement: DropPlacement | undefined;
  let level = calcLevel(data, dropItem.key);
  let dropKey = dropItem.key;

  if (dropItem.canDrop !== false && dropItem.key !== dragKey) {
    const quarterOfHeight = rect.height / 4;

    if (position.y < rect.top + quarterOfHeight) {
      placement = 'before';
    } else {
      if (hasChildren(dropItem)) {
        placement = 'before';
        dropKey = dropItem.children![0].key;
      } else {
        if (position.y > rect.bottom - quarterOfHeight) {
          placement = 'after';
        } else {
          placement = 'inner';
        }
      }
    }
  } else {
    const halfOfHeight = rect.height / 2;

    if (position.y < rect.top + halfOfHeight) {
      placement = 'before';
    } else {
      if (hasChildren(dropItem) && dropItem.key !== dragKey) {
        placement = 'before';
        dropKey = dropItem.children![0].key;
      } else {
        placement = 'after';
      }
    }
  }

  const parent = findParent(data, dropItem.key);
  const last =
    parent?.children?.[parent.children.length - 1]?.key === dropItem.key;

  if (
    last &&
    placement === 'after' &&
    (!hasChildren(dropItem) || dragKey == dropKey)
  ) {
    const diff = rect.left + level * indent - position.x;

    let tartgetItem: TreeNodeData = dropItem;

    let cur = 0;

    while (cur < level) {
      if (diff <= cur * indent) {
        break;
      }
      const parent = findParent(data, tartgetItem.key);

      if (!parent) {
        break;
      }

      tartgetItem = parent;
      cur++;
    }

    dropKey = tartgetItem.key;
  }

  return { placement, dropKey };
}

export function genInstruction(
  data: TreeNodeData[],
  dragKey: string,
  dropKey: string,
  placement: DropPlacement,
  rootCanDrop?: boolean,
): IndicatorInstruction | undefined {
  const item = find(data, (item) => item.key === dropKey);
  if (!item) {
    return;
  }

  const level = calcLevel(data, dropKey);

  const instruction: IndicatorInstruction = {
    dragKey,
    level,
    placement,
    canDrop: true,
    dropKey: item.key,
    indicatorKey: item.key,
  };

  if (placement === 'inner') {
    return instruction;
  }

  const parent = findParent(data, dropKey);

  if (!rootCanDrop && !parent) {
    return;
  }

  if (!parent || parent.canDrop) {
    if (placement === 'after' && dragKey !== dropKey) {
      const lastDescendant = findLastDescendant(data, dropKey);

      if (lastDescendant) {
        return {
          ...instruction,
          indicatorKey: lastDescendant.key,
        };
      }
    }

    return instruction;
  }

  return genInstruction(data, dragKey, parent.key, placement, rootCanDrop);
}
