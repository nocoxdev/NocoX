export function reorder<T>(
  list: T[],
  fromIndex: number,
  toIndex: number,
  length?: number,
): T[] {
  const result = Array.from(list);
  const removed = result.splice(fromIndex, length || 1);
  result.splice(toIndex, 0, ...removed);

  return result;
}

export function removeByIndex<T>(arr: T[], index: number): T[] {
  if (index < 0 || index >= arr.length) {
    return arr.slice();
  }
  const newArr = arr.slice();
  newArr.splice(index, 1);
  return newArr;
}

export function insert<T>(list: T[], index: number, ...items: T[]): T[] {
  const result = Array.from(list);
  result.splice(index, 0, ...items);
  return result;
}

export function reorderByIndex<T extends { id: string; order: number }>(
  list: T[],
  fromId: string,
  toIndex: number,
) {
  const from = list.find((item) => item.id === fromId);

  if (!from) {
    return list;
  }

  const fromIndex = from.order;

  if (!from || fromIndex === toIndex || toIndex < 0) {
    return list;
  }

  const toAfter = toIndex > fromIndex;

  const newList = list.reduce<T[]>((acc, item) => {
    if (item.id === fromId) {
      item.order = toIndex;
      return [...acc, item];
    }

    if (toAfter) {
      if (item.order <= toIndex && item.order > fromIndex) {
        item.order--;
      }
    } else {
      if (item.order >= toIndex && item.order < fromIndex) {
        item.order++;
      }
    }

    return [...acc, item];
  }, []);

  return newList;
}
