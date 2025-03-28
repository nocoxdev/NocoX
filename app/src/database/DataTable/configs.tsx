import { UserOutlined } from '@ant-design/icons';
import {
  IconCalendarBolt,
  IconCalendarMonth,
  IconCalendarTime,
  IconCheck,
  IconClockHour5,
  IconHierarchy,
  IconLetterCase,
  IconNumber,
  IconPaperclip,
  IconPhoto,
  IconTextCaption,
  IconUser,
  IconUserBolt,
} from '@tabler/icons-react';
import { Tag } from 'antd';
import { t } from 'i18next';
import AttachmentItem from '@/components/AttachmentSelect/AttachmentItem';
import ImageView from '@/components/ImageView';
import type { ColumnConfig } from '@/types';
import { UiType } from '@/types';
import { formatDate } from '@/utils/helpers';
import { IconKeyBolt, IconTrashBolt } from './Icons';
import {
  AttachmentColumn,
  DateColumn,
  DateTimeColumn,
  ImageColumn,
  InputColumn,
  NumberColumn,
  RelationColumn,
  TextareaColumn,
  TimeColumn,
} from './ValueColumns';

export const configs: ColumnConfig[] = [
  {
    type: UiType.Id,
    title: t('Id'),
    icon: IconKeyBolt,
    system: true,
    primaryKey: true,
    disabled: true,
    formComponent: InputColumn,
    renderCell: (value) => value,
  },
  {
    type: UiType.Bool,
    title: t('Bool'),
    icon: IconCheck,
    formComponent: InputColumn,
    renderCell: (value) =>
      value === true ? (
        <Tag color="success">True</Tag>
      ) : (
        <Tag color="red">False</Tag>
      ),
  },
  {
    type: UiType.SingleText,
    title: t('Single Text'),
    icon: IconLetterCase,
    formComponent: InputColumn,
    renderCell: (value) => value,
  },
  {
    type: UiType.LongText,
    title: t('Long Text'),
    icon: IconTextCaption,
    formComponent: TextareaColumn,
    renderCell: (value) => value,
  },
  {
    type: UiType.Time,
    title: t('Time'),
    icon: IconClockHour5,
    formComponent: TimeColumn,
    renderCell: (value) => value && formatDate(value, 'HH:mm:ss'),
  },
  {
    type: UiType.Date,
    title: t('Date'),
    icon: IconCalendarMonth,
    formComponent: DateColumn,
    renderCell: (value) => value && formatDate(value, 'YYYY-MM-DD'),
  },
  {
    type: UiType.DateTime,
    title: t('Date Time'),
    icon: IconCalendarTime,
    formComponent: DateTimeColumn,
    renderCell: (value) => value && formatDate(value),
  },
  {
    type: UiType.Integer,
    title: t('Integer'),
    icon: IconNumber,
    formComponent: NumberColumn,
    renderCell: (value) => value,
  },
  {
    type: UiType.Image,
    title: t('Image'),
    icon: IconPhoto,
    formComponent: ImageColumn,
    renderCell: (value) => <ImageView simple id={value} />,
  },
  {
    type: UiType.Attachment,
    title: t('Attachment'),
    icon: IconPaperclip,
    formComponent: AttachmentColumn,
    renderCell: (value) => <AttachmentItem id={value} download />,
  },
  {
    type: UiType.Relation,
    title: t('Relation'),
    icon: IconHierarchy,
    formComponent: RelationColumn,
    renderCell: (value, record, column) => {
      if (
        !record ||
        !column?.relation?.displayColumnName ||
        !column?.relation?.tableName
      ) {
        return value;
      }
      const relatedColumName = `${column?.relation?.tableName}${column?.relation?.displayColumnName}`;

      return record[relatedColumName];
    },
  },
  {
    type: UiType.User,
    title: t('User'),
    icon: IconUser,
    formComponent: RelationColumn,
    renderCell: (value) => value,
  },
  {
    type: UiType.CreatedBy,
    title: t('Created By'),
    icon: IconUserBolt,
    system: true,
    formComponent: RelationColumn,
    renderCell: (_, record) => {
      const createdName = record?.['createdName'];
      if (createdName) {
        return (
          <Tag bordered={false} icon={<UserOutlined />} color="blue">
            {createdName}
          </Tag>
        );
      }
    },
  },
  {
    type: UiType.CreatedTime,
    title: t('Created Time'),
    icon: IconCalendarBolt,
    system: true,
    formComponent: RelationColumn,
    renderCell: (value) => value && formatDate(value),
  },
  {
    type: UiType.LastModifiedBy,
    title: t('Last Modified By'),
    icon: IconUserBolt,
    system: true,
    formComponent: RelationColumn,
    renderCell: (_, record) => {
      const lastModifiedName = record?.['lastModifiedName'];
      if (lastModifiedName) {
        return (
          <Tag bordered={false} icon={<UserOutlined />} color="orange">
            {lastModifiedName}
          </Tag>
        );
      }
    },
  },
  {
    type: UiType.LastModifiedTime,
    title: t('Last Modified Time'),
    icon: IconCalendarBolt,
    system: true,
    formComponent: RelationColumn,
    renderCell: (value) => value && formatDate(value),
  },
  {
    type: UiType.DeletedBy,
    title: t('Deleted By'),
    icon: IconUserBolt,
    system: true,
    formComponent: RelationColumn,
    renderCell: (_, record) => {
      const deletedByName = record?.['DeletedName'];
      if (deletedByName) {
        return (
          <Tag bordered={false} icon={<UserOutlined />} color="red">
            {deletedByName}
          </Tag>
        );
      }
    },
  },
  {
    type: UiType.DeletedTime,
    title: t('Deleted Time'),
    system: true,
    icon: IconCalendarBolt,
    formComponent: RelationColumn,
    renderCell: (value) => value && formatDate(value),
  },
  {
    type: UiType.IsDeleted,
    title: t('Is Deleted'),
    system: true,
    icon: IconTrashBolt,
    formComponent: RelationColumn,
    renderCell: (value) =>
      value === true ? (
        <Tag color="error" bordered={false}>
          {t('Yes')}
        </Tag>
      ) : (
        <Tag color="success" bordered={false}>
          {t('No')}
        </Tag>
      ),
  },
];
