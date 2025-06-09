import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import { StyledIconButton } from '@/components/common.styled';
import type { EventConfig } from '@/editor/actions/type';
import { useMessage } from '@/selectors';
import type { NodeEvent } from '@/types';
import ActionSettingPopover from './ActionSettingPopover';
import { StyledLabel, StyledLabelContainer } from './styled';

const StyledContainer = styled.div`
  display: flex;
`;

const StyledEventItem = styled.div`
  display: flex;
  flex: 1;
  height: ${({ theme }) => theme.controlHeightSM}px;
  align-items: center;
`;

const StyledAddButton = styled(StyledIconButton)`
  visibility: hidden;
  ${StyledContainer}:hover & {
    visibility: visible;
  }
`;

interface EventItemProps {
  event: NodeEvent;
  size?: SizeType;
  variant?: Variant;
  config: EventConfig;
  style?: React.CSSProperties;
  onEventChange: (event: NodeEvent) => void;
}

const EventItem = (props: EventItemProps) => {
  const { event, variant, size, config, style, onEventChange } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const message = useMessage();

  return (
    <StyledContainer style={style}>
      <ActionSettingPopover
        title={config.label}
        destroyTooltipOnHide
        event={event}
        width={268}
        open={open}
        onOpenChange={(open) => setOpen(open)}
        size={size}
        variant={variant}
        onConfirm={(action) => {
          if (event.actions.find((item) => item.name === action.name)) {
            message.error(t('Already exists same action'));
            return;
          }

          onEventChange({ ...event, actions: event.actions.concat(action) });
          setOpen(false);
        }}
      />
      <StyledEventItem>
        <StyledLabelContainer>
          {config.icon && (
            <AntdIcon
              content={config.icon}
              size={14}
              color={theme.colorPrimaryTextActive}
            />
          )}
          <StyledLabel>{config.label}</StyledLabel>
        </StyledLabelContainer>

        <StyledAddButton onClick={() => setOpen((pre) => !pre)} $size={16}>
          <IconPlus stroke={1.5} size={13} />
        </StyledAddButton>
      </StyledEventItem>
    </StyledContainer>
  );
};

export default EventItem;
