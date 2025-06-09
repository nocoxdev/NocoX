import { Fragment, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import { StyledIconButton } from '@/components/common.styled';
import ControlLayout from '@/editor/controls/common/ControlLayout';
import { useMessage } from '@/selectors';
import type { NodeEvent, WidgetEventConfig } from '@/types';
import ActionSettingPopover from './ActionSettingPopover';
import ActionTree from './ActionTree';

interface EventActionsControlProps {
  config: WidgetEventConfig;
  size?: SizeType;
  value?: NodeEvent;
  placeholder?: string;
  variant?: Variant;
  onChange: (value: NodeEvent) => void;
}

const EventActionsControl = (props: EventActionsControlProps) => {
  const { size, variant, config, onChange } = props;
  const [value, setValue] = useControllableValue<NodeEvent>(props);
  const [open, setOpen] = useState(false);
  const message = useMessage();

  const controlExtra = (
    <StyledIconButton
      onClick={() => setOpen(true)}
      style={{ paddingRight: 4 }}
      $size={16}
    >
      <IconPlus stroke={1.5} size={13} />
    </StyledIconButton>
  );

  return (
    <Fragment>
      <ActionSettingPopover
        destroyTooltipOnHide
        title={config.label}
        width={268}
        open={open}
        onOpenChange={(open) => setOpen(open)}
        size={size}
        variant={variant}
        onConfirm={(action) => {
          if (value.actions.find((item) => item.name === action.name)) {
            message.error(t('Already exists same action'));
            return;
          }
          setValue((pre) => ({
            ...pre,
            actions: pre.actions.concat(action),
          }));
          setOpen(false);
        }}
      />
      <ControlLayout
        size={size}
        label={config.label}
        helpText={config.helpText}
        extra={controlExtra}
      >
        <ActionTree config={config} value={value} onChange={onChange} />
      </ControlLayout>
    </Fragment>
  );
};

export default EventActionsControl;
