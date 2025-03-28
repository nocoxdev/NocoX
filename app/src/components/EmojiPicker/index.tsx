import { useControllableValue } from 'ahooks';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import { t } from 'i18next';
import { styled } from 'styled-components';
import DraggablePopover from '@/components/DraggablePopover';
import { useControlSize } from '@/utils/hooks';
import type { DraggablePopoverProps } from '../DraggablePopover';
import type { InnerEmojiPickerProps } from './InnerEmojiPicker';
import InnerEmojiPicker from './InnerEmojiPicker';

const CurrentEmojiContainer = styled.div<{ $height: number }>`
  border-radius: ${({ theme }) => theme.borderRadius}px;
  min-width: ${({ $height }) => $height}px;
  height: ${({ $height }) => $height}px;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 16px;
  transition: all 0.2s;

  &:hover,
  &.active {
    border-color: ${({ theme }) => theme.colorPrimary};
  }
`;

export type EmojiPickerProps = InnerEmojiPickerProps &
  DraggablePopoverProps & { closeAfterSelect?: boolean; size?: SizeType };

const EmojiPicker = (props: EmojiPickerProps) => {
  const {
    value,
    defaultValue,
    size,
    closeAfterSelect = false,
    onChange,
    ...restProps
  } = props;

  const [open, setOpen] = useControllableValue(props, {
    valuePropName: 'open',
    trigger: 'onOpenChange',
    defaultValuePropName: 'defaultOpen',
    defaultValue: false,
  });

  const height = useControlSize(size);

  return (
    <DraggablePopover
      contentStyle={{ padding: 0 }}
      trigger="click"
      placement="leftTop"
      title={t('Select emoji')}
      arrow={false}
      {...restProps}
      maskClosable={false}
      content={
        <InnerEmojiPicker
          value={value}
          onChange={(val) => {
            onChange?.(val);
            if (closeAfterSelect) setOpen(false);
          }}
          defaultValue={defaultValue}
        />
      }
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
      }}
    >
      <CurrentEmojiContainer
        $height={height}
        className={classNames({ active: open })}
      >
        {value}
      </CurrentEmojiContainer>
    </DraggablePopover>
  );
};

export default EmojiPicker;
