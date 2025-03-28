import type { ButtonProps } from 'antd';
import { Button, Flex } from 'antd';
import { t } from 'i18next';
import type { ColorType } from '@/components/ColorBox';
import ColorBox from '@/components/ColorBox';

export const colors: {
  label: string;
  options: { label: string; value: ColorType }[];
}[] = [
  {
    label: t('Type'),
    options: [
      { value: 'default', label: t('Default') },
      { value: 'primary', label: t('Primary') },
      { value: 'danger', label: t('Danger') },
    ],
  },
  {
    label: t('Color'),
    options: [
      { value: 'blue', label: t('Blue') },
      { value: 'purple', label: t('Purple') },
      { value: 'cyan', label: t('Cyan') },
      { value: 'green', label: t('Green') },
      { value: 'magenta', label: t('Magenta') },
      { value: 'red', label: t('Red') },
      { value: 'orange', label: t('Orange') },
      { value: 'yellow', label: t('Yellow') },
      { value: 'volcano', label: t('Volcano') },
      { value: 'geekblue', label: t('Geekblue') },
      { value: 'lime', label: t('Lime') },
      { value: 'gold', label: t('Gold') },
    ],
  },
];

export const colorOptions = colors.map((item) => ({
  label: item.label,
  options: item.options.map((option) => ({
    value: option.value,
    label: (
      <Flex align="center" gap={6}>
        <ColorBox color={option.value} size={16} />
        <span>{option.label}</span>
      </Flex>
    ),
  })),
}));

export const genVariantOptions = (color: ButtonProps['color']) => {
  const options: { value: ButtonProps['variant']; label: string }[] = [
    {
      value: 'solid',
      label: t('Solid'),
    },
    {
      value: 'outlined',
      label: t('Outlined'),
    },
    {
      value: 'dashed',
      label: t('Dashed'),
    },
    {
      value: 'filled',
      label: t('Filled'),
    },
    {
      value: 'text',
      label: t('Text'),
    },
    {
      value: 'link',
      label: t('Link'),
    },
  ];

  return options.map((item) => ({
    value: item.value,
    label: (
      <Flex align="center" gap={6}>
        <Button
          color={color}
          variant={item.value}
          size="small"
          style={{ height: 16, width: 16, fontSize: 10 }}
        >
          A
        </Button>
        <span>{item.label}</span>
      </Flex>
    ),
  }));
};
