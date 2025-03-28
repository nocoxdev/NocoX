import { t } from 'i18next';
import { UiType } from '@/types';
import {
  FilterConjunction,
  type IFilterOperatorInfo,
  Operator,
  type ValueTypeFilterOperators as ValueTypeFilterInfo,
} from './type';
import {
  DatePickerComponent,
  InputComponent,
  InputNumberComponent,
  SelectComponent,
  TimePickerComponent,
} from './valueComponents';

export const conjunctions: { value: FilterConjunction; label: string }[] = [
  {
    value: FilterConjunction.And,
    label: t('And'),
  },
  {
    value: FilterConjunction.Or,
    label: t('Or'),
  },
];

export const operators: IFilterOperatorInfo[] = [
  {
    operator: Operator.Contain,
    label: t('contains'),
    hasValue: true,
  },
  {
    operator: Operator.NotContain,
    label: t('does not contain'),
    hasValue: true,
  },
  {
    operator: Operator.Equal,
    label: t('is equal to'),
    hasValue: true,
  },
  {
    operator: Operator.NotEqual,
    label: t('is not equal to'),
    hasValue: true,
  },
  {
    operator: Operator.GreaterThan,
    label: t('is greater than'),
    hasValue: true,
  },
  {
    operator: Operator.GreaterThanEqual,
    label: t('is greater than or equal to'),
    hasValue: true,
  },
  {
    operator: Operator.LessThan,
    label: t('is less than'),
    hasValue: true,
  },
  {
    operator: Operator.LessThanEqual,
    label: t('is less than or equal to'),
    hasValue: true,
  },
];

//  Bool = 1,
//   SingleText,
//   LongText,
//   Integer,
//   Decimal,
//   Time,
//   Date,
//   DateTime,
//   Percent,
//   Image,
//   Attachment,
//   Relation,

export const valueTypeMapOperators: ValueTypeFilterInfo[] = [
  {
    types: [
      UiType.Id,
      UiType.SingleText,
      UiType.LongText,
      UiType.LastModifiedBy,
      UiType.CreatedBy,
      UiType.DeletedBy,
    ],
    operators: [Operator.Contain, Operator.NotContain],
    valueComponent: InputComponent,
  },
  {
    types: [
      UiType.DateTime,
      UiType.CreatedTime,
      UiType.LastModifiedTime,
      UiType.DeletedTime,
    ],
    operators: [
      Operator.Equal,
      Operator.NotEqual,
      Operator.GreaterThan,
      Operator.GreaterThanEqual,
      Operator.LessThan,
      Operator.LessThanEqual,
    ],
    valueComponent: DatePickerComponent,
    props: {
      format: 'YYYY-MM-DD  HH:mm:ss',
      showTime: true,
    },
  },
  {
    types: [UiType.Date],
    operators: [
      Operator.Equal,
      Operator.NotEqual,
      Operator.GreaterThan,
      Operator.GreaterThanEqual,
      Operator.LessThan,
      Operator.LessThanEqual,
    ],
    valueComponent: DatePickerComponent,
    props: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    types: [UiType.Time],
    operators: [
      Operator.Equal,
      Operator.NotEqual,
      Operator.GreaterThan,
      Operator.GreaterThanEqual,
      Operator.LessThan,
      Operator.LessThanEqual,
    ],
    valueComponent: TimePickerComponent,
  },
  {
    types: [UiType.Bool, UiType.IsDeleted],
    operators: [Operator.Equal, Operator.NotEqual],
    valueComponent: SelectComponent,
    props: {
      options: [
        { value: true, label: t('True') },
        { value: false, label: t('False') },
      ],
    },
  },
  {
    types: [UiType.Integer, UiType.Decimal, UiType.Percent],
    operators: [
      Operator.Equal,
      Operator.NotEqual,
      Operator.GreaterThan,
      Operator.GreaterThanEqual,
      Operator.LessThan,
      Operator.LessThanEqual,
    ],
    valueComponent: InputNumberComponent,
  },
];
