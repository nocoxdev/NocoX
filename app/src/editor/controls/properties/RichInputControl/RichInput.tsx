import type { SizeType } from 'antd/es/config-provider/SizeContext';
import PlateEditor from '@/components/PlateEditor';

export interface RichInputProps {
  size?: SizeType;
  value?: any;
  onChange: (val: any) => void;
}

const RichInput = (props: RichInputProps) => {
  const { size, value, onChange } = props;

  return (
    <PlateEditor
      value={value}
      singleLine
      toolbar={[
        'fontSize',
        'bold',
        'italic',
        'underline',
        'color',
        'backgroundColor',
        'emoji',
      ]}
      size={size}
      onChange={onChange}
      placement="topLeft"
    />
  );
};

export default RichInput;
