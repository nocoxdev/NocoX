import type { ResizeCallback } from 're-resizable';
import { Resizable } from 're-resizable';

const ResizableCell = (
  props: React.HTMLAttributes<any> & {
    onResize?: ResizeCallback;
    width?: number;
  },
) => {
  const { onResize, width, ...restProps } = props;

  return (
    <Resizable enable={{ right: true }} as="th" {...restProps}></Resizable>
  );
};

export default ResizableCell;
