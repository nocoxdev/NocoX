export interface BodyCellDataTextViewProps {
  value?: string;
  className?: string;
  style?: React.CSSProperties;
}

const BodyCellDataTextView = (props: BodyCellDataTextViewProps) => {
  const { value, style, className } = props;

  return (
    <span className={className} style={{ ...style, display: 'inline-block' }}>
      {value}
    </span>
  );
};

export default BodyCellDataTextView;
