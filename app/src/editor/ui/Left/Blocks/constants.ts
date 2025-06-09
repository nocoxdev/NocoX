import { t } from 'i18next';
import { BlockType } from '@/types';

export const options = [
  { value: BlockType.All, label: t('All') },
  { value: BlockType.Public, label: t('Public') },
  { value: BlockType.Private, label: t('Personal') },
];
