import {
  focusEditor,
  useEditorRef,
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from '@udecode/plate-common/react';
import classNames from 'classnames';
import CommonButton from './CommonButton';

export interface MarkButtonProps {
  nodeType: string;
  clear?: string | string[] | undefined;
  icon?: React.ReactNode;
}

const MarkButton = (props: MarkButtonProps) => {
  const { nodeType, clear, icon } = props;
  const editor = useEditorRef();
  const state = useMarkToolbarButtonState({ nodeType, clear });
  const {
    props: { pressed, onClick },
  } = useMarkToolbarButton(state);

  return (
    <CommonButton
      className={classNames({ active: pressed })}
      onClick={() => {
        onClick();
        focusEditor(editor);
      }}
    >
      {icon}
    </CommonButton>
  );
};

export default MarkButton;
