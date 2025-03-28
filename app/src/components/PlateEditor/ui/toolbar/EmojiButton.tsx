import { useState } from 'react';
import React from 'react';
import { IconMoodSmile } from '@tabler/icons-react';
import type { TEditor } from '@udecode/plate-common';
import { insertText, withoutNormalizing } from '@udecode/plate-common';
import { useEditorRef } from '@udecode/plate-common/react';
import AntdIcon from '@/components/AntdIcon';
import DraggablePopover from '@/components/DraggablePopover';
import InnerEmojiPicker from '@/components/EmojiPicker/InnerEmojiPicker';
import CommonButton from './CommonButton';

const insertEmoji = (editor: TEditor, emoji: string) => {
  withoutNormalizing(editor, () => {
    insertText(editor, emoji);
  });
};

const EmojiButton = () => {
  const [open, setOpen] = useState(false);
  const editor = useEditorRef();

  return (
    <DraggablePopover
      open={open}
      onOpenChange={(val) => setOpen(val)}
      content={
        <InnerEmojiPicker onChange={(emoji) => insertEmoji(editor, emoji)} />
      }
      placement="bottomLeft"
      trigger="click"
      contentStyle={{ padding: 0 }}
      title="Emoji"
      arrow={false}
      maskClosable={false}
      zIndex={10000}
    >
      <div>
        <CommonButton>
          <AntdIcon content={IconMoodSmile} />
        </CommonButton>
      </div>
    </DraggablePopover>
  );
};

export default EmojiButton;
