import { useNavigate } from 'react-router';
import { IconPencil, IconSend } from '@tabler/icons-react';
import { Button, Flex } from 'antd';
import classNames from 'classnames';
import { t } from 'i18next';
import { styled } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';

const StyledAppCardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  opacity: 0;
  transition: opacity 0.2s;

  &.visible {
    opacity: 1;
  }
`;

export interface AppActionsProps {
  id: string;
  visible?: boolean;
}

const AppActions = (props: AppActionsProps) => {
  const { id, visible } = props;
  const nagivate = useNavigate();

  return (
    <StyledAppCardActions className={classNames({ visible })}>
      <Flex gap={12} justify="space-between">
        <Button
          size="small"
          type="primary"
          style={{ width: 80 }}
          icon={<AntdIcon content={IconPencil} size={14} />}
          onClick={() => nagivate(`/edit/${id}`)}
        >
          {t('Edit')}
        </Button>
        <Button
          size="small"
          icon={<AntdIcon content={IconSend} size={14} />}
          onClick={() => window.open(`/preview/${id}`, '_blank')}
          style={{ width: 80 }}
        >
          {t('Preview')}
        </Button>
      </Flex>
    </StyledAppCardActions>
  );
};

export default AppActions;
