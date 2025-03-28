import { IconAlignBoxLeftTop } from '@tabler/icons-react';
import { t } from 'i18next';
import { AppDataApi } from '@/services/api';
import type { NodeEvent } from '@/types/node';
import {
  FailLabel,
  SuccessLabel,
  ValidateFailLabel,
  ValidateSuccessLabel,
} from '../Labels';
import type { ActionConfig } from '../type';
import SubmitFormConfigView from './ConfigView';

const action: ActionConfig = {
  name: 'submit',
  icon: IconAlignBoxLeftTop,
  type: 'widget',
  label: t('Submit form'),
  handler: async ({ node, action, data = {} }) => {
    const { error, values } = data;
    const { callbacks, config = {} } = action;

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

    if (error) {
      const event = callbacks?.find(
        (item) => item.name === 'onValidateFailure',
      );
      triggerCallback(event, { params: { message: error } });
      return;
    } else {
      const event = callbacks?.find(
        (item) => item.name === 'onValidateSuccess',
      );
      triggerCallback(event, { values });
    }

    const { nodeId } = config;
    const formNode = node.page.nodes.find((item) => item.id === nodeId);

    if (!formNode) {
      return;
    }

    const tableId = formNode.props.record['dataTable'];

    const resp = await AppDataApi.add(tableId, values);

    const event = callbacks?.find(
      (item) => item.name === (resp.success ? 'onSuccess' : 'onFailure'),
    );

    triggerCallback(event, { params: { message: resp.message } });
  },
  callbacks: [
    {
      name: 'onValidateSuccess',
      label: ValidateSuccessLabel(t('Validate success')),
      icon: '',
    },
    {
      name: 'onValidateFailure',
      label: ValidateFailLabel(t('Validate failure')),
      icon: '',
      availableParams: ['message'],
    },
    {
      name: 'onSuccess',
      label: SuccessLabel(t('Submit success')),
      icon: '',
    },
    {
      name: 'onFailure',
      label: FailLabel(t('Submit failure')),
      icon: '',
      availableParams: ['message'],
    },
  ],
  configView: SubmitFormConfigView,
  hidden: (node) =>
    node.page.nodes.filter((item) => item.name === 'form').length === 0,
};

export default action;
