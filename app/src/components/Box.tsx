import type { CSSProperties } from 'react';

interface BoxProps extends CSSProperties {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Box = (props: BoxProps) => {
  const { children, className, style, onClick, ...rest } = props;

  return (
    <div className={className} style={{ ...rest, ...style }} onClick={onClick}>
      {children}
    </div>
  );
};

export default Box;
