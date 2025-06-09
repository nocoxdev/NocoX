import { use, useState } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Popconfirm } from 'antd';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import { StyledIconButton } from '@/components/common.styled';
import type { NodeEvent, NodeEventAction } from '@/types';
import ActionSettingPopover from './ActionSettingPopover';
import { EventSettingContext } from './EventSettingContext';
import { StyledLabel, StyledLabelContainer } from './styled';

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const StyledActionItem = styled.div`
  display: flex;
  width: 100%;
  height: ${({ theme }) => theme.controlHeightSM}px;
  align-items: center;
`;

const StyledButtons = styled.div`
  display: flex;
  gap: 4px;
  visibility: hidden;

  ${StyledContainer}:hover & {
    visibility: visible;
  }
`;

interface EventItemProps {
  event: NodeEvent;
  size?: SizeType;
  variant?: Variant;
  action: NodeEventAction;
  onRemove: () => void;
  onActionChange: (action: NodeEventAction) => void;
}

const EventActionItem = (props: EventItemProps) => {
  const { event, action, variant, size, onActionChange, onRemove } = props;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { configs } = use(EventSettingContext);

  const config = configs.find((item) => item.name === action.name);

  return (
    config && (
      <StyledContainer>
        {open && (
          <ActionSettingPopover
            title={config.label}
            width={268}
            open={open}
            onOpenChange={(open) => setOpen(open)}
            event={event}
            action={action}
            size={size}
            variant={variant}
            onConfirm={(action) => onActionChange(action)}
          />
        )}

        <StyledActionItem>
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

          <StyledButtons>
            <StyledIconButton onClick={() => setOpen(true)} $size={16}>
              <IconEdit stroke={1.5} size={13} />
            </StyledIconButton>
            <Popconfirm
              title={t('Are you sure to delete this action?')}
              onConfirm={() => onRemove()}
              okText={t('Yes')}
              cancelText={t('No')}
              okButtonProps={{
                danger: true,
                size: 'small',
              }}
              cancelButtonProps={{ size: 'small', type: 'text' }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <StyledIconButton $danger $size={16}>
                <IconTrash
                  stroke={1.5}
                  size={13}
                  color={theme.colorErrorText}
                />
              </StyledIconButton>
            </Popconfirm>
          </StyledButtons>
        </StyledActionItem>
      </StyledContainer>
    )
  );
};

export default EventActionItem;
