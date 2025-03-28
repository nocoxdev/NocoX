import CodeEditor from '@/components/CodeEditor';
import type { ExColorPickerProps } from '@/components/ExColorPicker';
import type { ControlProps } from '@/editor/controls/type';

const CodeEditorControl = (props: ControlProps<ExColorPickerProps>) => {
  const { defaultValue, onChange } = props;

  return <CodeEditor defaultValue={defaultValue} onChange={onChange} />;
};

export default CodeEditorControl;
