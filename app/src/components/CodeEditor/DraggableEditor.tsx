import { IconExternalLink, IconGripVertical } from '@tabler/icons-react';
import { Button, Flex } from 'antd';
import { t } from 'i18next';
import { useTheme } from 'styled-components';
import type { DraggablePopoverProps } from '../DraggablePopover';
import DraggablePopover from '../DraggablePopover';
import Editor from './Editor';

interface DraggableEditorProps extends DraggablePopoverProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const DraggableEditor = (props: DraggableEditorProps) => {
  const { defaultValue, value, onChange, ...restProps } = props;
  const theme = useTheme();

  return (
    <DraggablePopover
      trigger="click"
      maskClosable
      placement="left"
      arrow={false}
      titleStyle={{
        padding: '2px 4px',
      }}
      contentStyle={{
        padding: 0,
        height: 'calc(100% - 32px)',
      }}
      title={
        <Flex align="center" gap={2}>
          <IconGripVertical size={12} color={theme.colorTextQuaternary} />
          {t('Edit')}
        </Flex>
      }
      titleExtra={
        <Button
          type="primary"
          size="small"
          onClick={() => {}}
          style={{ height: 20 }}
        >
          <Flex align="center" gap={4}>
            <IconExternalLink size={12} />
            <span style={{ fontSize: 10 }}>{t('Done')}</span>
          </Flex>
        </Button>
      }
      showCloseButton={false}
      resizable={{
        minHeight: 50,
        minWidth: 100,
        defaultSize: { width: 500, height: 300 },
        enable: {
          top: false,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        },
      }}
      content={
        <Editor
          defaultValue={defaultValue}
          width="100%"
          height="100%"
          value={value}
          // onChange={handleChange}
        />
      }
      {...restProps}
    />
  );
};

export default DraggableEditor;
