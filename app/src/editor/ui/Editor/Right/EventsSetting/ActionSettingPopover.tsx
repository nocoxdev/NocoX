import { use, useMemo, useState } from 'react';
import { useControllableValue } from 'ahooks';
import { Button, Flex, Form, Tag, Tooltip } from 'antd';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import styled from 'styled-components';
import type { DraggablePopoverProps } from '@/components/DraggablePopover';
import DraggablePopover from '@/components/DraggablePopover';
import { useMessage } from '@/selectors';
import type { NodeEvent, NodeEventAction } from '@/types';
import { generateKey } from '@/utils/helpers';
import ActionSelector from './ActionSelector';
import { EventSettingContext } from './EventSettingContext';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

interface ActionPanelProps extends DraggablePopoverProps {
  size?: SizeType;
  placeholder?: string;
  variant?: Variant;
  event?: NodeEvent;
  action?: NodeEventAction;
  onConfirm: (action: NodeEventAction) => void;
}

const ActionSettingPopover = (props: ActionPanelProps) => {
  const { size, variant, title, event, action, onConfirm, ...restProps } =
    props;
  const [actionName, setActionName] = useState<string>(action?.name || '');
  const message = useMessage();
  const { node } = use(EventSettingContext);
  const { configs } = use(EventSettingContext);
  const [open, setOpen] = useControllableValue(restProps, {
    valuePropName: 'open',
    trigger: 'onOpenChange',
  });

  const currentActionConfig = useMemo(
    () => configs.find((item) => item.name === actionName),
    [actionName],
  );

  const ConfigView = useMemo(
    () => currentActionConfig?.configView,
    [currentActionConfig],
  );

  const handleConfirm = (values: any) => {
    if (!currentActionConfig) {
      message.warning(t('Please select action'));
      return;
    }

    let newAction: NodeEventAction;

    if (!action) {
      newAction = {
        id: generateKey(currentActionConfig.name, '-'),
        name: currentActionConfig.name,
        config: values,
        callbacks: (currentActionConfig?.callbacks || []).map((item) => ({
          id: generateKey(item.name, '-'),
          name: item.name,
          actions: [],
          availableParams: item.availableParams,
        })),
      };
    } else {
      if (action.name === actionName) {
        newAction = {
          ...action,
          config: values,
        };
      } else {
        newAction = {
          ...action,
          name: currentActionConfig.name,
          config: values,
          callbacks: (currentActionConfig?.callbacks || []).map((item) => ({
            id: generateKey(item.name, '-'),
            name: item.name,
            label: item.label,
            actions: [],
            availableParams: item.availableParams,
          })),
        };
      }
    }

    onConfirm(newAction);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success(t('Copy success'));
  };

  const content = (
    <StyledContainer>
      <Form
        layout="vertical"
        colon={false}
        size={size}
        initialValues={action?.config}
        onFinish={(values) => handleConfirm(values)}
      >
        {event?.availableParams && (
          <Form.Item label={t('Available parameters')}>
            <Flex gap={8}>
              {event.availableParams.map((item) => {
                const text = `{{${item}}}`;
                return (
                  <Tooltip title={t('Click to copy')} key={item}>
                    <Tag
                      color="processing"
                      onClick={() => handleCopy(text)}
                      style={{ cursor: 'pointer' }}
                    >
                      {text}
                    </Tag>
                  </Tooltip>
                );
              })}
            </Flex>
          </Form.Item>
        )}

        <Form.Item label={t('Action')}>
          <ActionSelector
            size={size}
            variant={variant}
            value={actionName}
            onChange={setActionName}
          />
        </Form.Item>
        {ConfigView && (
          <ConfigView size={size} node={node} data={action?.config} />
        )}
        <Form.Item noStyle>
          <Flex justify="end" gap={8}>
            <Button type="text" size="small" onClick={() => setOpen(false)}>
              {t('Cancel')}
            </Button>
            <Button type="primary" htmlType="submit" size="small">
              <Flex align="center" gap={4}>
                {t('Confirm')}
              </Flex>
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </StyledContainer>
  );

  return (
    <DraggablePopover
      {...restProps}
      open={open}
      onOpenChange={setOpen}
      arrow={false}
      destroyTooltipOnHide
      title={title}
      content={content}
      width={300}
    />
  );
};

export default ActionSettingPopover;
