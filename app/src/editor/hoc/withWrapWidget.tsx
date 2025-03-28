import type { ComponentType } from 'react';
import { use, useEffect, useRef } from 'react';
import { keys } from 'lodash-es';
import type { BaseWidgetProps, Noop, WidgetActionCallbackFn } from '@/types';
import { NodeContext, ParamsContext } from '../context';
import { useEventManager } from '../selectors';

export const withWrapWidget = <P extends BaseWidgetProps>(
  Component: ComponentType<P>,
) => {
  return (props: P) => {
    const { node, ...restProps } = props;
    const { id: nodeId, actions } = node;
    const { params } = use(ParamsContext);

    let additionalProps = {};

    const ref = useRef<Record<string, WidgetActionCallbackFn>>({});
    const eventManager = useEventManager();

    if (actions && actions.length > 0) {
      additionalProps = {
        ref,
      };
    }

    useEffect(() => {
      if (actions && actions.length > 0) {
        const offCbFnList: Noop[] = [];

        actions.forEach((action) => {
          const name = `${action.name}${nodeId ? `-${nodeId}` : ''}`;
          const off = eventManager.on(name, (args) => {
            node.transferParams(args.params);

            if (node.app.mode === 'production' || node.app.mode === 'preview') {
              ref.current?.[action.name]?.((data: Record<string, any>) =>
                action.handler?.({
                  ...args,
                  data,
                }),
              );
            }
          });
          offCbFnList.push(off);
        });

        return () => offCbFnList.forEach((off) => off());
      }
    }, [actions]);

    let eventsProps = {};
    keys(restProps).map((key) => {
      if (node.events.list.map((event) => event.name).includes(key)) {
        const handler = (e: any) => {
          const propHandler = restProps[key as keyof typeof restProps];
          if (typeof propHandler === 'function') {
            console.log('args.params', params);
            propHandler(params, e);
          }
        };

        eventsProps = {
          ...eventsProps,
          [key]: handler,
        };
      }
    });

    return (
      <NodeContext.Provider value={{ node }}>
        <Component
          {...(restProps as P)}
          {...eventsProps}
          {...additionalProps}
        />
      </NodeContext.Provider>
    );
  };
};
