import { t } from 'i18next';
import { generateNewLabel } from '@/utils/helpers';
import type { TreeOptionsValueType } from '../type';

export function collectSpecifiedPropValues(
  nodes: TreeOptionsValueType[],
  propertyName: keyof TreeOptionsValueType,
) {
  const values: string[] = [];
  const loop = (nodes: TreeOptionsValueType[]) => {
    nodes.forEach((node) => {
      values.push(node[propertyName]);
      loop(node.children || []);
    });
  };
  loop(nodes);
  return values;
}

export function findTreeNode(
  nodes: TreeOptionsValueType[],
  key: string,
  callback?: (
    nodes: TreeOptionsValueType[],
    node: TreeOptionsValueType,
  ) => void,
): boolean {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.value === key) {
      callback?.(nodes, node);
      return true;
    }
    if (node.children?.length) {
      if (findTreeNode(node.children, key, callback)) {
        return true;
      }
    }
  }
  return false;
}

export function addTreeNode(
  treeData: TreeOptionsValueType[],
  key?: string,
): TreeOptionsValueType[] {
  const data = JSON.parse(JSON.stringify(treeData));

  const newLabel = generateNewLabel(
    t('Option'),
    collectSpecifiedPropValues(data, 'label'),
  );
  const newTreeNode = { label: newLabel, value: newLabel };

  if (key) {
    findTreeNode(data, key, (_, node) => {
      node.children = [...(node.children || []), newTreeNode];
    }) || data.push(newTreeNode);
  } else {
    data.push(newTreeNode);
  }

  return data;
}

export function removeTreeNode(
  nodes: TreeOptionsValueType[],
  key?: string,
): TreeOptionsValueType[] {
  const data = JSON.parse(JSON.stringify(nodes));

  if (key) {
    findTreeNode(data, key, (nodes, node) => {
      nodes.splice(nodes.indexOf(node), 1);
    });
  }

  return data;
}

export function modifyTreeNode(
  nodes: TreeOptionsValueType[],
  key?: string,
  newLabel?: string,
): TreeOptionsValueType[] {
  const data = JSON.parse(JSON.stringify(nodes));

  if (key) {
    findTreeNode(data, key, (_, node) => {
      node.label = newLabel || node.label;
    });
  }

  return data;
}

export function moveTreeNode(
  nodes: TreeOptionsValueType[],
  info: any,
): TreeOptionsValueType[] {
  const data = JSON.parse(JSON.stringify(nodes));

  const dropKey = info.node.key;
  const dragKey = info.dragNode.key;
  const dropPos = info.node.pos.split('-');
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

  const loop = (
    data: TreeOptionsValueType[],
    key: string,
    callback: (
      node: TreeOptionsValueType,
      i: number,
      data: TreeOptionsValueType[],
    ) => void,
  ) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value === key) {
        return callback(data[i], i, data);
      }
      if (data[i].children) {
        loop(data[i].children!, key, callback);
      }
    }
  };

  // Find dragObject
  let dragObject: TreeOptionsValueType;
  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1);
    dragObject = item;
  });

  if (!info.dropToGap) {
    // Drop on the content
    loop(data, dropKey, (item) => {
      item.children = item.children || [];
      // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
      item.children.unshift(dragObject);
    });
  } else {
    let ar: TreeOptionsValueType[] = [];
    let i: number;
    loop(data, dropKey, (_item, index, arr) => {
      ar = arr;
      i = index;
    });
    if (dropPosition === -1) {
      // Drop on the top of the drop node
      ar.splice(i!, 0, dragObject!);
    } else {
      // Drop on the bottom of the drop node
      ar.splice(i! + 1, 0, dragObject!);
    }
  }
  return data;
}
