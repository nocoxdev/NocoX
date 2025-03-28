import type { Ref } from 'react';
import data from '@emoji-mart/data';
import i18n from '@emoji-mart/data/i18n/zh.json';
import Picker from '@emoji-mart/react';
import { createGlobalStyle } from 'styled-components';
import tinycolor from 'tinycolor2';

const EmojiPickerGlobalStyle = createGlobalStyle`
  em-emoji-picker {
    --shadow: none;
    --border-radius: ${({ theme }) => theme.borderRadius}px;
    --font-size: ${({ theme }) => theme.fontSize}px;
    --category-icon-size: 16px;
    --rgb-accent: ${({ theme }) => {
      const rgb = tinycolor(theme.colorPrimary).toRgb();
      return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    }};
  }
`;

export interface InnerEmojiPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  ref?: Ref<HTMLDivElement>;
}

const InnerEmojiPicker = ({ ref, ...props }: InnerEmojiPickerProps) => {
  const { value, onChange, defaultValue } = props;

  return (
    <div ref={ref}>
      <EmojiPickerGlobalStyle />
      <Picker
        i18n={i18n}
        data={data}
        emojiSize={18}
        perLine={8}
        defaultValue={defaultValue}
        value={value}
        onEmojiSelect={(emoji: any) => onChange?.(emoji.native)}
      />
    </div>
  );
};

export default InnerEmojiPicker;
