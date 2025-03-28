import type { CSSProperties, Ref } from 'react';
import { useImperativeHandle, useRef } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import {
  IconCheck,
  IconExclamationMark,
  IconPencil,
  IconX,
} from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import type { InputRef } from 'antd';
import { Flex, Input, Spin, Tooltip } from 'antd';
import type { InputProps } from 'antd/lib';
import { t } from 'i18next';
import styled, { useTheme } from 'styled-components';

const StyledInput = styled(Input)`
  font-size: 14px;
  border-radius: ${({ theme }) => theme.borderRadius}px;

  .ant-input-group-addon {
    padding-inline: 8px;
  }

  .ant-input {
    padding-inline: 8px;
    font-size: 13px;
    &[readonly] {
      cursor: default;
    }
  }
`;

export type ConfirmInputMode = 'inputing' | 'loading' | 'readonly';

export interface ConfirmInputActions {
  focusAll: () => void;
}

export interface ConfirmInputProps
  extends Omit<InputProps, 'status' | 'onChange'> {
  mode: ConfirmInputMode;
  error?: string;
  defaultValue?: string;
  style?: CSSProperties;
  allowEmpty?: boolean;
  onChange?: (value: string) => void;
  onConfirm?: (value: string) => void;
  onCancel?: () => void;
  onEdit?: () => void;
  ref?: Ref<ConfirmInputActions>;
}

const ConfirmInput = ({ ref, ...props }: ConfirmInputProps) => {
  const {
    defaultValue,
    mode,
    error,
    allowEmpty = false,
    style,
    onConfirm,
    onCancel,
    onEdit,
    ...restProps
  } = props;
  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useControllableValue(props);
  const theme = useTheme();

  const statusIconMap = {
    inputing: (
      <Flex gap={8}>
        <Tooltip title={t('Confirm')}>
          <IconCheck
            size={13}
            stroke={1.5}
            onClick={() => handleConfirm()}
            color={theme.colorPrimary}
            style={{ cursor: 'pointer' }}
          />
        </Tooltip>
        <Tooltip title={t('Cancel')}>
          <IconX
            size={13}
            stroke={1.5}
            onClick={() => handleCancel()}
            color={theme.colorPrimary}
            style={{ cursor: 'pointer' }}
          />
        </Tooltip>
      </Flex>
    ),
    loading: <Spin indicator={<LoadingOutlined spin />} size="small" />,
    readonly: (
      <IconPencil
        size={13}
        stroke={1.5}
        onClick={() => handleEdit()}
        style={{ cursor: 'pointer' }}
        color={theme.colorPrimary}
      />
    ),
  };

  const handleEdit = () => {
    inputRef.current!.focus({
      cursor: 'all',
    });

    onEdit?.();
  };

  const handleConfirm = () => {
    onConfirm?.(value);
  };

  const handleCancel = () => {
    setValue(defaultValue);
    onCancel?.();
  };

  useImperativeHandle(ref, () => ({
    focusAll: () => {
      if (inputRef.current) {
        inputRef.current.focus({
          cursor: 'all',
        });
      }
    },
  }));

  const mergedStyle = {
    backgroundColor: !value && !allowEmpty ? theme.colorErrorBg : '#fff',
    borderBottom:
      mode === 'inputing' ? `1px solid ${theme.colorBorderSecondary}` : 'none',
    ...style,
  };

  const suffix = error && (
    <Tooltip title={error}>
      <IconExclamationMark
        size={14}
        stroke={2}
        color={theme.colorErrorActive}
      />
    </Tooltip>
  );

  return (
    <StyledInput
      {...restProps}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      ref={inputRef}
      readOnly={mode === 'readonly'}
      onPressEnter={() => handleConfirm()}
      style={mergedStyle}
      addonAfter={statusIconMap[mode]}
      suffix={suffix}
    />
  );
};

export default ConfirmInput;
