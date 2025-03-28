import React from 'react';
import type { DraggablePopoverProps } from '@/components/DraggablePopover';
import DraggablePopover from '@/components/DraggablePopover';

export interface EditBoxPopoverProps extends DraggablePopoverProps {
  width?: number;
  trigger?: 'click' | 'hover';
  style?: React.CSSProperties;
  onOpenChange?: (open: boolean) => void;
}

const EditBoxPopover = (
  props: React.PropsWithChildren<EditBoxPopoverProps>,
) => {
  const {
    placement = 'leftTop',
    destroyTooltipOnHide = false,
    trigger = 'click',
    width,
    ...restProps
  } = props;

  return (
    <DraggablePopover
      arrow={false}
      {...restProps}
      overlayStyle={{ width: width || 258 }}
      trigger={trigger}
      placement={placement}
      destroyTooltipOnHide={destroyTooltipOnHide}
      maskClosable
    />
  );
};

export default EditBoxPopover;
