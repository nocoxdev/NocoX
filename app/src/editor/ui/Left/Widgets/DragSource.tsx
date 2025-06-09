import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import {
  IS_WIDGET_CLASS,
  WIDGET_CAN_DRAG,
  WIDGET_NAME_MARK,
} from '@/editor/constants';

export interface DragSourceProps {
  name: string;
}

const DragSource = (props: PropsWithChildren<DragSourceProps>) => {
  const { name, children } = props;

  const className = useMemo(() => {
    return `${IS_WIDGET_CLASS} ${WIDGET_NAME_MARK}${name} ${WIDGET_CAN_DRAG}`;
  }, [name]);

  return <div className={className}>{children}</div>;
};

export default DragSource;
