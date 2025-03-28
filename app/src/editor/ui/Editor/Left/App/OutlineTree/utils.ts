import type { TreeNodeData } from '@/components/DraggableTree/type';
import type { PageNode } from '@/editor/stores';

export type Callback = (
  pnode: PageNode | undefined,
  node: PageNode,
  level: number,
) => TreeNodeData | undefined;

export function genTreeData(nodes: PageNode[], cb: Callback) {
  const loop = (
    pnode: PageNode | undefined,
    nodes: PageNode[],
    level: number,
  ): TreeNodeData[] => {
    return nodes.reduce((acc: TreeNodeData[], node) => {
      const data = cb(pnode, node, level);

      return data
        ? acc.concat({
            ...data,
            children: loop(node, node.children, level + 1),
          })
        : acc;
    }, []);
  };
  return loop(undefined, nodes, 0);
}
