import { use } from 'react';
import { MenuListContext } from '../../MenusList/MenuListContext';

export const useWorkspaceStore = () => {
  const { workspaceStore } = use(MenuListContext);

  return workspaceStore;
};
