import { t } from 'i18next';
import { UiType } from '@/types';
import { type ISortTypeConfig, SortOrder } from './type';

export const configs: ISortTypeConfig[] = [
  {
    types: [UiType.Integer],
    options: [
      {
        value: SortOrder.Ascending,
        label: '0 → 9',
      },
      {
        value: SortOrder.Descending,
        label: '9 → 0',
      },
    ],
  },
  {
    types: [UiType.Decimal],
    options: [
      {
        value: SortOrder.Ascending,
        label: '0.0 → 9.0',
      },
      {
        value: SortOrder.Descending,
        label: '9.0 → 0.0',
      },
    ],
  },
  {
    types: [UiType.Percent],
    options: [
      {
        value: SortOrder.Ascending,
        label: '0% → 100%',
      },
      {
        value: SortOrder.Descending,
        label: '100% → 0%',
      },
    ],
  },
  {
    types: [
      UiType.Date,
      UiType.Time,
      UiType.DateTime,
      UiType.CreatedTime,
      UiType.LastModifiedTime,
      UiType.DeletedTime,
    ],
    options: [
      {
        value: SortOrder.Ascending,
        label: t('Earliest → Latest'),
      },
      {
        value: SortOrder.Descending,
        label: t('Latest → Earliest'),
      },
    ],
  },
  {
    types: [UiType.Bool, UiType.IsDeleted],
    options: [
      {
        value: SortOrder.Ascending,
        label: t('False → True'),
      },
      {
        value: SortOrder.Descending,
        label: t('True → False'),
      },
    ],
  },
  {
    types: [
      UiType.SingleText,
      UiType.LongText,
      UiType.Image,
      UiType.Id,
      UiType.CreatedBy,
      UiType.LastModifiedBy,
      UiType.DeletedBy,
    ],
    options: [
      {
        value: SortOrder.Ascending,
        label: t('A → Z'),
      },
      {
        value: SortOrder.Descending,
        label: t('Z → A'),
      },
    ],
  },
];
