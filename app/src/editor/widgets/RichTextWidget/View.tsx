import type { CSSProperties } from 'react';
import type { IPlateNode } from '@/components/PlateEditor/type';
import { toJSX } from '@/components/PlateEditor/utils';
import type { WidgetProps } from '@/types';

export interface TextWidgetProps {
  value: IPlateNode[] | string;
  className?: string;
  style?: CSSProperties;
  singleLine?: boolean;
}

const RichTextView = (props: WidgetProps<TextWidgetProps>) => {
  const { value, className, style, singleLine } = props;

  return (
    <div className={className} style={{ ...style, display: 'inline-block' }}>
      {toJSX(value, singleLine)}
    </div>
  );
};

export default RichTextView;
