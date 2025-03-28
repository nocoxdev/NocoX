import { IconStar } from '@tabler/icons-react';
import { t } from 'i18next';
import { toAntdIcon } from '@/components/AntdIcon/utils';
import type { WidgetTypeConfig } from '@/types';
import { readOnly } from '../config/generalProps';
import { fontGroup, layoutGroup } from '../config/generalStyle';
import RateView from './View';

const widget: WidgetTypeConfig = {
  name: 'rate',
  view: RateView,
  label: t('Rate'),
  icon: IconStar,
  showInExplorer: true,
  canDrag: true,
  canDrop: false,
  canDelete: true,
  canCopy: true,
  color: (theme) => theme.green6,
  propGroups: [
    {
      name: 'general',
      label: t('General'),
      description: t('General'),
      children: [
        {
          name: 'defaultValue',
          control: 'number',
          label: t('Default Value'),
          defaultValue: 0,
          controlProps: ({ props }) => {
            const allowHalf = props.allowHalf;
            return { min: 0, max: 10, step: allowHalf ? 0.5 : 1 };
          },
          computed: {
            edit: ({ prop }) => {
              return { value: prop.value };
            },
          },
        },
        {
          name: 'characterType',
          control: 'radio',
          label: t('Type'),
          helpText: t('Set the type of the rating symbol, the default is star'),
          assist: true,
          defaultValue: 'default',
          controlProps: {
            optionType: 'button',
            buttonStyle: 'solid',
            options: [
              {
                label: t('Default'),
                value: 'default',
              },
              { label: t('Character'), value: 'char' },
              { label: t('Icon'), value: 'icon' },
              { label: t('Emoji'), value: 'emoji' },
            ],
          },
        },
        {
          name: 'emoji',
          label: '',
          assist: true,
          direction: 'horizontal',
          children: [
            {
              name: 'emoji0',
              control: 'emoji',
              assist: true,
              span: 4,
              controlProps: {
                closeAfterSelect: true,
                size: 'small',
              },
            },
            {
              name: 'emoji1',
              control: 'emoji',
              assist: true,
              span: 4,
              controlProps: {
                closeAfterSelect: true,
                size: 'small',
              },
            },
            {
              name: 'emoji2',
              control: 'emoji',
              assist: true,
              span: 4,
              controlProps: {
                closeAfterSelect: true,
                size: 'small',
              },
            },
            {
              name: 'emoji3',
              control: 'emoji',
              assist: true,
              span: 4,
              controlProps: {
                closeAfterSelect: true,
                size: 'small',
              },
            },
            {
              name: 'emoji4',
              control: 'emoji',
              assist: true,
              span: 4,
              controlProps: {
                closeAfterSelect: true,
                size: 'small',
              },
            },
          ],

          visible: ({ props }) => {
            const characterType = props.characterType;
            return characterType === 'emoji';
          },
        },
        {
          name: 'icon',
          label: '',
          assist: true,
          direction: 'horizontal',
          children: [
            {
              name: 'icon0',
              control: 'icon',
              assist: true,
              span: 4,
              controlProps: {
                useSize: false,
                useColor: false,
                allowClear: false,
                closeAfterSelect: true,
              },
            },
            {
              name: 'icon1',
              control: 'icon',
              assist: true,
              span: 4,
              controlProps: {
                useSize: false,
                useColor: false,
                allowClear: false,
                closeAfterSelect: true,
              },
            },
            {
              name: 'icon2',
              control: 'icon',
              assist: true,
              span: 4,
              controlProps: {
                useSize: false,
                useColor: false,
                allowClear: false,
                closeAfterSelect: true,
              },
            },
            {
              name: 'icon3',
              control: 'icon',
              assist: true,
              span: 4,
              controlProps: {
                useSize: false,
                useColor: false,
                allowClear: false,
                closeAfterSelect: true,
              },
            },
            {
              name: 'icon4',
              control: 'icon',
              assist: true,
              span: 4,
              controlProps: {
                useSize: false,
                useColor: false,
                allowClear: false,
                closeAfterSelect: true,
              },
            },
          ],
          visible: ({ props }) => {
            const characterType = props.characterType;
            return characterType === 'icon';
          },
        },
        {
          name: 'char',
          label: '',
          assist: true,
          direction: 'horizontal',
          children: [
            {
              name: 'char0',
              control: 'input',
              assist: true,
              span: 4,
              controlProps: {
                allowClear: false,
              },
            },
            {
              name: 'char1',
              control: 'input',
              assist: true,
              span: 4,
              controlProps: {
                allowClear: false,
              },
            },
            {
              name: 'char2',
              control: 'input',
              assist: true,
              span: 4,
              controlProps: {
                allowClear: false,
              },
            },
            {
              name: 'char3',
              control: 'input',
              assist: true,
              span: 4,
              controlProps: {
                allowClear: false,
              },
            },
            {
              name: 'char4',
              control: 'input',
              assist: true,
              span: 4,
              controlProps: {
                allowClear: false,
              },
            },
          ],
          visible: ({ props }) => {
            const characterType = props.characterType;
            return characterType === 'char';
          },
        },
        {
          name: 'character',
          control: '',
          label: t('Symbol'),
          visible: false,
          computed: {
            default: ({ props }) => {
              const characterType = props.characterType;
              if (!characterType || characterType === 'default') return {};

              return {
                character: ({ index = 0 }) =>
                  characterType === 'icon'
                    ? toAntdIcon(props[`${characterType}${index}`])
                    : props[`${characterType}${index}`],
              };
            },
          },
        },
        {
          name: 'allowHalf',
          label: t('Allow Half Selection'),
          control: 'boolean',
          defaultValue: true,
        },
        {
          ...readOnly,
          name: 'disabled',
        },
      ],
    },
  ],
  styleGroups: [fontGroup, layoutGroup],
};

export default widget;
