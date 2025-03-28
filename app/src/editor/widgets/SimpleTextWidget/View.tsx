import type { CSSProperties } from 'react';
import parse from 'html-react-parser';

export interface SimpleTextWidgetProps {
  value: string;
  className?: string;
  style?: CSSProperties;
}

const SimpleTextView = (props: SimpleTextWidgetProps) => {
  const { value = '', className, style } = props;

  return (
    <div className={className} style={{ ...style, display: 'inline-block' }}>
      {parse(value.toString())}
    </div>
  );
};

export default SimpleTextView;
