import { IconTrash } from '@tabler/icons-react';
import { t } from 'i18next';
import { AppDataApi } from '@/services/api';
import type { NodeEvent } from '@/types/node';
import { FailLabel, SuccessLabel } from '../Labels';
import type { ActionConfig } from '../type';
import DeleteTableDataAction from './ConfigView';

const action: ActionConfig = {
  name: 'deleteData',
  icon: IconTrash,
  type: 'widget',
  label: t('Delete records'),
  handler: async ({ node, action, params = {}, data = {} }) => {
    const { callbacks, config = {} } = action;
    const { type, nodeId: tableNodeId } = config;
    const table = node.page.findNode(tableNodeId);
    const tableId = table?.props.record['dataTable'];

    console.log('params', params);

    const triggerCallback = (
      event: NodeEvent | undefined,
      args?: Record<string, any> | undefined,
    ) => {
      event?.actions.forEach((action) => {
        const nodeId = action.config?.nodeId;
        const name = `${action.name}${nodeId ? `-${nodeId}` : ''}`;

        node.app.eventManager.emit(name, {
          node,
          action,
          ...args,
        });
      });
    };

    const failureEvent = callbacks?.find((item) => item.name === 'onFailure');
    const successEvent = callbacks?.find((item) => item.name === 'onSuccess');

    if (!tableId) {
      triggerCallback(failureEvent, {
        params: { message: t('No table bind') },
      });
      return;
    }

    const ids =
      type === 'current'
        ? params.dataId && [params.dataId]
        : data['selectedIds'];

    if (ids == undefined || ids.length === 0) {
      triggerCallback(failureEvent, {
        params: { message: t('No data is selected') },
      });

      return;
    }

    const resp = await AppDataApi.delete(tableId, ids);

    console.log(resp, successEvent, failureEvent);
    triggerCallback(resp.success ? successEvent : failureEvent, {
      params: { message: resp.message },
    });
  },
  callbacks: [
    {
      name: 'onSuccess',
      label: SuccessLabel(t('Delete success')),
      icon: '',
    },
    {
      name: 'onFailure',
      label: FailLabel(t('Delete failure')),
      icon: '',
      availableParams: ['message'],
    },
  ],
  configView: DeleteTableDataAction,
  hidden: (node) =>
    node.page.nodes.filter((item) => item.name === 'table').length === 0,
};

export default action;
