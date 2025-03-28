import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import type { WidgetProps } from '@/types';

const { TextArea } = Input;

const TextareaView = (props: WidgetProps<TextAreaProps>) => {
  const { className, style, ...restProps } = props;
  return <TextArea {...restProps} rootClassName={className} style={style} />;
};

export default TextareaView;
