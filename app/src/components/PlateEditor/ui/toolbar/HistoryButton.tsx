import { Fragment } from 'react';
import { IconArrowBackUp, IconArrowForwardUp } from '@tabler/icons-react';
import { useEditorRef } from '@udecode/plate-common/react';
import AntdIcon from '@/components/AntdIcon';
import CommonButton from './CommonButton';

const HistoryButton = () => {
  const editor = useEditorRef();

  return (
    <Fragment>
      <CommonButton onClick={editor.undo}>
        <AntdIcon content={IconArrowBackUp} />
      </CommonButton>
      <CommonButton onClick={editor.redo}>
        <AntdIcon content={IconArrowForwardUp} />
      </CommonButton>
    </Fragment>
  );
};

export default HistoryButton;
