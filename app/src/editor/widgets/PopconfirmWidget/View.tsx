import { type Ref, useImperativeHandle, useState } from 'react';
import type { PopconfirmProps } from 'antd';
import { Popover } from 'antd';
import { t } from 'i18next';
import styled from 'styled-components';
import NoWidget from '@/components/NoWidget';
import { CANVAS_ID } from '@/constants';
import { useAppRunningMode } from '@/editor/selectors';
import { hasChildren } from '@/utils/helpers/hasChildren';
import Overlay from './Overlay';

const StyledChildrenContainer = styled.div`
  display: inline;
  width: min-content;
`;
interface PopconfirmViewAction {
  open: () => void;
  close: () => void;
}

interface PopconfirmView extends PopconfirmProps {
  actions: React.ReactNode;

  ref: Ref<PopconfirmViewAction>;
}

const PopconfirmView = ({ ref, ...props }: PopconfirmView) => {
  const {
    actions,
    children,
    className,
    icon,
    title,
    description,
    ...restProps
  } = props;

  const [open, setOpen] = useState(false);
  const mode = useAppRunningMode();

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const editProps =
    mode === 'edit'
      ? {
          getPopupContainer: () => document.getElementById(CANVAS_ID)!,
          zIndex: 1,
        }
      : {};

  return !hasChildren(children) ? (
    <NoWidget
      className={className}
      description={t('Drag the confirm button here')}
      style={{ height: 28, maxWidth: 200 }}
    />
  ) : (
    <Popover
      {...restProps}
      {...editProps}
      open={props.open || open}
      onOpenChange={setOpen}
      content={
        <Overlay
          actions={actions}
          icon={icon}
          title={title}
          description={description}
        />
      }
    >
      <StyledChildrenContainer className={className}>
        {children}
      </StyledChildrenContainer>
    </Popover>
  );
};

export default PopconfirmView;
