import type { DataNode } from 'antd/es/tree';

export type TreeNode = DataNode & { pKey: string };
