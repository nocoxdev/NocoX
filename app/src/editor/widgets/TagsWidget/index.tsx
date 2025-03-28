import { IconTags } from '@tabler/icons-react';
import { t } from 'i18next';
import type { WidgetTypeConfig } from '@/types';
import TagsView from './View';

const widget: WidgetTypeConfig = {
  name: 'tags',
  view: TagsView,
  label: t('Tags'),
  icon: IconTags,
  showInExplorer: true,
  canDrag: true,
  canDrop: true,
  canDelete: true,
  canCopy: true,
  color: (theme) => theme.green6,
  limit: {
    children: ['tag'],
  },
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'size',
          control: 'number',
          label: t('Spacing'),
          defaultValue: 8,
          controlProps: {
            min: 0,
          },
        },
        {
          name: 'wrap',
          control: 'boolean',
          label: t('Auto Wrap'),
          defaultValue: true,
        },
        {
          name: 'canAdd',
          control: 'boolean',
          label: t('Can Add'),
          defaultValue: false,
        },
        {
          name: 'children',
          label: t('Tags'),
          control: 'widget',
          helpText: t('Please set the tags'),
          assist: true,
          controlProps: {
            add: () => ({
              name: 'tag',
              elements: {
                children: [
                  {
                    name: 'inner-container',
                    props: {
                      emptyStyle: { width: 60, height: 24 },
                    },
                    elements: {
                      children: [
                        {
                          name: 'simple-text',
                          props: { value: t('Tag') },
                        },
                      ],
                    },
                  },
                ],
              },
            }),
          },
        },
      ],
    },
  ],
  styleGroups: [],
  defaultTemplate: {
    name: 'tags',
    elements: {
      children: [
        {
          name: 'tag',
          props: {
            emptyStyle: { width: 60, height: 24 },
          },
          elements: {
            children: [
              {
                name: 'inner-container',
                props: {
                  emptyStyle: { width: 60, height: 24 },
                },
                elements: {
                  children: [
                    { name: 'simple-text', props: { value: t('Tag') } },
                  ],
                },
              },
            ],
          },
        },
        {
          name: 'tag',
          elements: {
            children: [
              {
                name: 'inner-container',
                props: {
                  emptyStyle: { width: 60, height: 24 },
                },
                elements: {
                  children: [
                    { name: 'simple-text', props: { value: t('Tag') } },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
};

export default widget;
