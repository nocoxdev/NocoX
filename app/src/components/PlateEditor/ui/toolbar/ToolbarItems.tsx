import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import AntdIcon from '@/components/AntdIcon';
import {
  ELEMENT_IMAGE,
  KEY_ALIGN,
  KEY_EMOJI,
  KEY_HISTORY,
  MARK_BG_COLOR,
  MARK_BOLD,
  MARK_COLOR,
  MARK_FONT_SIZE,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from '../../constants';
import AlignButtonGroup from './Align';
import BackgroundColorButton from './BackgroundColorButton';
import EmojiButton from './EmojiButton';
import FontSizeSelect from './FontSize';
import HistoryButton from './HistoryButton';
import ImageButton from './ImageButton';
import MarkButton from './MarkButton';
import TextColorButton from './TextColorButton';

export interface ToolbarProps {
  toolbar?: string[] | undefined;
  size?: SizeType;
}

interface ToolbarItemType {
  key: string;
  content: ReactNode;
}

const toolbarItems: ToolbarItemType[] = [
  { key: KEY_HISTORY, content: <HistoryButton /> },
  { key: MARK_FONT_SIZE, content: <FontSizeSelect /> },
  {
    key: MARK_BOLD,
    content: (
      <MarkButton nodeType={MARK_BOLD} icon={<AntdIcon content={IconBold} />} />
    ),
  },
  {
    key: MARK_ITALIC,
    content: (
      <MarkButton
        nodeType={MARK_ITALIC}
        icon={<AntdIcon content={IconItalic} />}
      />
    ),
  },
  {
    key: MARK_UNDERLINE,
    content: (
      <MarkButton
        nodeType={MARK_UNDERLINE}
        icon={<AntdIcon content={IconUnderline} />}
      />
    ),
  },
  { key: MARK_COLOR, content: <TextColorButton /> },
  {
    key: MARK_BG_COLOR,
    content: <BackgroundColorButton />,
  },
  { key: KEY_ALIGN, content: <AlignButtonGroup /> },
  { key: KEY_EMOJI, content: <EmojiButton /> },
  { key: ELEMENT_IMAGE, content: <ImageButton /> },
];

const ToolbarItems = (props: ToolbarProps) => {
  const { toolbar } = props;

  return (
    <Fragment>
      {toolbar?.map((item) => {
        const toolbarItem = toolbarItems.find((i) => i.key === item);
        return <Fragment key={item}>{toolbarItem?.content}</Fragment>;
      })}
    </Fragment>
  );
};

export default ToolbarItems;
