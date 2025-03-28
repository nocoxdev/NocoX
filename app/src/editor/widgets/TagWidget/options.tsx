import { Flex } from 'antd';
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
      { value: 'processing', label: t('Processing') },
      { value: 'error', label: t('Error') },
      { value: 'success', label: t('Success') },
      { value: 'warning', label: t('Warning') },
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

export const statusColorOptions = colors.map((item) => ({
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
