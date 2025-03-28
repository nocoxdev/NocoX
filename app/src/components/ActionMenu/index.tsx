import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { useControllableValue } from 'ahooks';
import { Divider, Popover } from 'antd';
import type { TooltipPlacement } from 'antd/es/tooltip';
import { styled } from 'styled-components';
import type { ActionMenuItemProps } from './ActionMenuItem';
import ActionMenuItem from './ActionMenuItem';

export const StyledMenusContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export type ActionMenusType = (
  | (ActionMenuItemProps & { visible?: boolean })
  | 'divider'
  | undefined
  | null
)[];

export type ActionMenuProps = {
  items: ActionMenusType;
  defaultOpen?: boolean;
  open?: boolean;
  placement?: TooltipPlacement | undefined;
  width?: number | string | undefined;
  onOpenChange?: (val: boolean) => void;
};

const ActionMenu = (props: PropsWithChildren<ActionMenuProps>) => {
  const { items, children, width, placement = 'rightTop' } = props;

  const [open, setOpen] = useControllableValue(props, {
    defaultValue: false,
    defaultValuePropName: 'defaultOpen',
    valuePropName: 'open',
    trigger: 'onOpenChange',
  });

  const content = useMemo(
    () => (
      <StyledMenusContainer>
        {items.map((item, index) => {
          if (!item) return null;

          if (item === 'divider') {
            return (
              items[index - 1] &&
              items[index + 1] && (
                <Divider style={{ margin: 0 }} key={`divider${index}`} />
              )
            );
          } else {
            return (
              item.visible !== false && (
                <ActionMenuItem key={item.title} {...item} />
              )
            );
          }
        })}
      </StyledMenusContainer>
    ),
    [items],
  );

  return (
    items.length > 0 && (
      <Popover
        placement={placement}
        content={content}
        trigger="click"
        arrow={false}
        styles={{
          body: {
            width: width || 120,
            padding: 4,
          },
        }}
        open={open}
        onOpenChange={(value) => setOpen(value)}
      >
        {children}
      </Popover>
    )
  );
};

export default ActionMenu;
