import { IconCheck } from '@tabler/icons-react';
import { t } from 'i18next';
import { toAntdIcon } from '@/components/AntdIcon/utils';
import { toJSX } from '@/components/PlateEditor/utils';
import type { WidgetTypeConfig } from '@/types';
import { defaultTemplate } from './defaultTemplate';
import PopconfirmView from './View';

const widget: WidgetTypeConfig = {
  name: 'popconfirm',
  view: PopconfirmView,
  label: t('Confirm'),
  icon: IconCheck,
  showInExplorer: true,
  canDrag: true,
  canDrop: true,
  canDelete: true,
  canCopy: true,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'open',
          label: t('Open'),
          helpText: 'Only work when editing',
          control: 'boolean',
          defaultValue: true,
          mode: 'edit',
        },
        {
          name: 'color',
          control: 'color',
          label: t('Background Color'),
        },
        {
          name: 'icon',
          control: 'icon',
          label: t('Icon'),
          controlProps: {
            useSize: true,
            useColor: true,
          },
          computed: {
            default: ({ prop }) => {
              const prefixIcon = prop.value;
              if (!prefixIcon) return {};
              return { prefix: toAntdIcon(prefixIcon) };
            },
          },
        },
        {
          name: 'title',
          label: t('Title'),
          helpText: t('Text prompt title'),
          control: 'rich-input',
          defaultValue: 'prompt text',
          computed: {
            default: ({ prop }) => {
              const p = {
                title: toJSX(prop.value, true),
              };
              return p;
            },
          },
        },
        {
          name: 'description',
          label: t('Description'),
          helpText: t('Confirm Description'),
          control: 'rich-input',
          defaultValue: '',
          computed: {
            default: ({ prop }) => {
              const p = {
                description: toJSX(prop.value, true),
              };
              return p;
            },
          },
        },
        {
          name: 'placement',
          label: t('Placement'),
          control: 'select',
          controlProps: () => {
            const options = [
              { value: 'top', label: t('Top') },
              { value: 'left', label: t('Left') },
              { value: 'right', label: t('Right') },
              { value: 'bottom', label: t('Bottom') },
              { value: 'topLeft', label: t('Top Left') },
              { value: 'topRight', label: t('Top Right') },
              { value: 'bottomLeft', label: t('Bottom Left') },
              { value: 'bottomRight', label: t('Bottom Right') },
              { value: 'leftTop', label: t('Left Top') },
              { value: 'leftBottom', label: t('Left Bottom') },
              { value: 'rightTop', label: t('Right Top') },
              { value: 'rightBottom', label: t('Right Bottom') },
            ];

            return { options };
          },
        },
        {
          name: 'arrow',
          control: 'boolean',
          label: t('Arrow'),
          defaultValue: true,
          computed: {
            default: ({ props }) => {
              return {
                arrow: {
                  pointAtCenter: !!props.pointAtCenter,
                },
              };
            },
          },
        },
        {
          name: 'pointAtCenter',
          control: 'boolean',
          label: t('Arrow Point At Center'),
          defaultValue: false,
          assist: true,
          visible: ({ props }) => props.arrow,
        },
        {
          name: 'trigger',
          control: 'select',
          label: t('Trigger'),
          controlProps: () => {
            const options = [
              { value: 'click', label: t('Click') },
              { value: 'hover', label: t('Hover') },
            ];

            return { options, mode: 'multiple' };
          },
        },
      ],
    },
  ],
  styleGroups: [],
  actions: ['open', 'close'],
  events: [
    {
      name: 'onConfirm',
      label: t('Confirm Event'),
      helpText: t('Confirm Event'),
    },
  ],
  defaultTemplate,
};

export default widget;
