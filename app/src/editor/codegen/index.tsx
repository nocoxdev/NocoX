import classNames from 'classnames';
import { keys } from 'lodash-es';
import type { AppRunningMode, WidgetTypeConfig } from '@/types';
import {
  IS_WIDGET_CLASS,
  NODE_ID_MARK,
  NODE_ROOT_CLASS,
  WIDGET_CAN_DRAG,
  WIDGET_CAN_DROP,
  WIDGET_NAME_MARK,
} from '../constants';
import type { PageNode } from '../stores';

function normalizeMarkClass(node: PageNode, mode: AppRunningMode) {
  if (mode !== 'edit') return '';

  return classNames(
    IS_WIDGET_CLASS,
    { [NODE_ROOT_CLASS]: node.name === 'page' },
    `${NODE_ID_MARK}${node.id}`,
    `${WIDGET_NAME_MARK}${node.name}`,
    { [WIDGET_CAN_DROP]: node.widget.canDrop },
    { [WIDGET_CAN_DRAG]: node.widget.canDrag },
  );
}

export function genJSX(
  node: PageNode,
  widgets: WidgetTypeConfig[],
  mode: AppRunningMode,
) {
  if (!node.visible) return;

  const markClassNames = normalizeMarkClass(node, mode);

  const modeProps =
    mode === 'edit' ? node.props.editing : node.props.producting;

  const props = {
    ...modeProps,
    node,
    className: classNames(modeProps?.className, markClassNames),
    style: node.styles.producting,
  };

  const events = node.events.list.reduce<Record<string, any>>((acc, event) => {
    return {
      ...acc,
      [event.name]: (params: Record<string, any>, ...e: any[]) => {
        event.actions.forEach((action) => {
          const nodeId = action.config?.nodeId;
          const name = `${action.name}${nodeId ? `-${nodeId}` : ''}`;

          const args = {
            node,
            action,
            params,
            e,
          };

          node.app.eventManager.emit(name, args);
        });
      },
    };
  }, {});

  const elements = (keys(node.elements) || {}).reduce((acc, key) => {
    return {
      ...acc,
      [key]: node.elements[key].map((node) => genJSX(node, widgets, mode)),
    };
  }, {});

  const Widget = node.widget.view;

  return <Widget {...props} {...elements} {...events} key={node.id} />;
}
