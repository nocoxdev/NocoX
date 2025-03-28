export function hasChildren(children: any) {
  return children && (!Array.isArray(children) || children.length > 0);
}
