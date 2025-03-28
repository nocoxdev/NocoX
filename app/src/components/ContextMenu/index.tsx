import React from 'react';
import type { DropDownProps } from 'antd';
import { Dropdown } from 'antd';

export interface ContextMenuItemProps extends Omit<DropDownProps, 'trigger'> {}

const ContextMenu = (props: ContextMenuItemProps) => {
  const { children, menu } = props;

  return (
    <Dropdown menu={menu} trigger={['contextMenu']}>
      {children}
    </Dropdown>
  );
};

export default ContextMenu;
