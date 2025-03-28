import { IconClearFormatting } from '@tabler/icons-react';
import { useEditorRef } from '@udecode/plate-common/react';
import AntdIcon from '@/components/AntdIcon';
import CommonButton from './CommonButton';

const ClearButton = () => {
  const editor = useEditorRef();
  return (
    <CommonButton onClick={() => editor.unwrapNodes()}>
      <AntdIcon content={IconClearFormatting} />
    </CommonButton>
  );
};

export default ClearButton;
