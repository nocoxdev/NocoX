import { t } from 'i18next';
import CloseAction from './CloseAction';
import DeleteTableDataAction from './DeleteTableDataAction';
import NavigateAction from './NavigateAction';
import OpenAction from './OpenAction';
import ReloadAction from './ReloadTableAction';
import ShowMessageAction from './ShowMessageAction';
import ShowNotificationAction from './ShowNotificationAction';
import StartLoadingAction from './StartLoadingAction';
import StopLoadingAction from './StopLoadingAction';
import SubmitFormAction from './SubmitFormAction';

const actions = [
  ShowMessageAction,
  ShowNotificationAction,
  NavigateAction,
  OpenAction,
  CloseAction,
  SubmitFormAction,
  ReloadAction,
  StartLoadingAction,
  StopLoadingAction,
  DeleteTableDataAction,
];

export default actions;

export const actionGroups = [
  {
    type: 'normal',
    label: t('Normal'),
  },
  {
    type: 'widget',
    label: t('Widget'),
  },
];
