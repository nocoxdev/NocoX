import type { PlateEditorProps } from '@/components/PlateEditor';
import PlateEditor from '@/components/PlateEditor';
import type { WidgetProps } from '@/types';
import { useForceRenderKey } from '@/utils/hooks';

export interface RichTextAreaWidgetProps extends PlateEditorProps {
  className?: string;
}

const RichTextAreaView = (props: WidgetProps<RichTextAreaWidgetProps>) => {
  const { className, style, defaultValue, value, ...restProps } = props;
  const key = useForceRenderKey([defaultValue]);

  return (
    <PlateEditor
      key={key}
      className={className}
      toolbar={[
        'fontSize',
        'bold',
        'italic',
        'underline',
        'color',
        'backgroundColor',
        'emoji',
        'img',
      ]}
      placement="top"
      style={{
        display: 'inline-block',
        minHeight: 200,
        ...style,
      }}
      {...restProps}
      value={defaultValue ?? value}
    />
  );
};

export default RichTextAreaView;
