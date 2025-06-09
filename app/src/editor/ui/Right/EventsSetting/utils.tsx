import type { Key } from 'react';
import type { ActionConfig, EventConfig } from '@/editor/actions/type';
import type { NodeEvent } from '@/types';
import EventActionItem from './EventActionItem';
import EventItem from './EventItem';
import type { TreeNode } from './type';

export function makeEventTree(
  parentKey: string,
  event: NodeEvent,
  config: EventConfig,
  actionConfigs: ActionConfig[],
  onChange: (value: NodeEvent) => void,
): TreeNode {
  return {
    pKey: parentKey,
    key: event.id,
    selectable: false,
    title: (
      <EventItem
        event={event}
        size="small"
        config={config}
        onEventChange={(val) => onChange(val)}
      />
    ),
    children: event.actions.map<TreeNode>((item) => {
      return {
        pKey: event.id,
        key: item.id,
        selectable: false,
        title: (
          <EventActionItem
            size="small"
            event={event}
            action={item}
            onRemove={() =>
              onChange({
                ...event,
                actions: event.actions.filter((a) => a.id !== item.id),
              })
            }
            onActionChange={(val) =>
              onChange({
                ...event,
                actions: event.actions.map((a) => (val.id === a.id ? val : a)),
              })
            }
          />
        ),
        children: item.callbacks.map((cb) => {
          const config = actionConfigs
            .find((ac) => ac.name === item.name)
            ?.callbacks?.find((c) => c.name === cb.name);

          return makeEventTree(item.id, cb, config!, actionConfigs, (val) =>
            onChange({
              ...event,
              actions: event.actions.map((ac) =>
                ac.id === item.id
                  ? {
                      ...ac,
                      callbacks: ac.callbacks.map((cb2) =>
                        cb2.id === cb.id ? val : cb2,
                      ),
                    }
                  : ac,
              ),
            }),
          );
        }),
      };
    }),
  };
}

export function getAllKeys(event: NodeEvent) {
  let keys: Key[] = [event.id];

  event.actions.forEach((action) => {
    keys.push(action.id);
    if (action.callbacks) {
      keys = keys.concat(action.callbacks.flatMap((cb) => getAllKeys(cb)));
    }
  });

  return keys;
}

function loop(event: NodeEvent, pKey: string, key: string, toIndex: number) {
  if (event.id === pKey) {
    const index = event.actions.findIndex((item) => item.id === key);
    const [action] = event.actions.splice(index, 1);
    event.actions.splice(toIndex > index ? toIndex - 1 : toIndex, 0, action);
  } else {
    event.actions.forEach((action) => {
      if (action.id === pKey) {
        const index = action.callbacks.findIndex((item) => item.id === key);
        const [callback] = action.callbacks.splice(index, 1);
        action.callbacks.splice(
          toIndex > index ? toIndex - 1 : toIndex,
          0,
          callback,
        );
      } else {
        action.callbacks.forEach((cb) => {
          loop(cb, pKey, key, toIndex);
        });
      }
    });
  }
}

export function moveEventNode(
  event: NodeEvent,
  pKey: string,
  key: string,
  toIndex: number,
): NodeEvent {
  const data = JSON.parse(JSON.stringify(event)) as NodeEvent;

  loop(data, pKey, key, toIndex);

  return data;
}
