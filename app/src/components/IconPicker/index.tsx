import type { CSSProperties } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { Button, Tooltip } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import classNames from 'classnames';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import { useControlSize } from '@/utils/hooks';
import type { DraggablePopoverProps } from '../DraggablePopover';
import DraggablePopover from '../DraggablePopover';
import Icon from './Icon';
import IconClear from './IconClear';
import IconPanel from './IconPanel';

const StyledCurrentIcon = styled.div<{ $height: number }>`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: ${({ $height }) => $height}px;
  height: ${({ $height }) => $height}px;
  border: 1px solid ${({ theme }) => theme.colorBorder};
  color: ${({ theme }) => theme.colorText};
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.1s;

  &:hover,
  &.active {
    border-color: ${({ theme }) => theme.colorPrimary};
  }
`;

export interface IconPickerProps extends DraggablePopoverProps {
  defaultValue?: string;
  value?: string;
  showClear?: boolean;
  closeAfterSelect?: boolean;
  size?: SizeType;
  showCurrentIcon?: boolean;
  style?: CSSProperties;
  onChange: (name?: string) => void;
}

const IconPicker = (props: IconPickerProps) => {
  const {
    showClear = true,
    closeAfterSelect = false,
    showCurrentIcon = true,
    style,
    size,
    ...restProps
  } = props;
  const [value, setValue] = useControllableValue<string>(props);
  const [open, setOpen] = useControllableValue(props, {
    valuePropName: 'open',
    trigger: 'onOpenChange',
    defaultValuePropName: 'defaultOpen',
    defaultValue: false,
  });

  const theme = useTheme();

  const height = useControlSize(size);

  const PopoverContent = (
    <IconPanel
      size={size}
      value={value}
      onChange={(val) => {
        setValue(val || '');
        if (closeAfterSelect) setOpen(false);
      }}
    />
  );

  const titleExtra = showClear && (
    <Tooltip title="Clear">
      <Button
        type="text"
        size="small"
        danger
        icon={<IconTrash color={theme.colorErrorText} size={14} />}
        onClick={() => setValue('')}
      />
    </Tooltip>
  );

  return (
    <DraggablePopover
      trigger="click"
      maskClosable
      placement="bottom"
      contentStyle={{ padding: 0 }}
      {...restProps}
      content={PopoverContent}
      open={open}
      onOpenChange={(val) => setOpen(val)}
      title={t('Select icon')}
      titleExtra={titleExtra}
    >
      {showCurrentIcon && (
        <StyledCurrentIcon
          $height={height}
          className={classNames({ active: open })}
          style={style}
        >
          {value ? <Icon name={value} size="18" /> : <IconClear size="small" />}
        </StyledCurrentIcon>
      )}
    </DraggablePopover>
  );
};

export default IconPicker;
