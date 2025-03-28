import { UiType } from '@/types/table';

export function getSystemColumnName(uiType: UiType) {
  switch (uiType) {
    case UiType.CreatedBy:
      return 'createdBy';
    case UiType.CreatedTime:
      return 'createdTime';
    case UiType.LastModifiedBy:
      return 'lastModifiedBy';
    case UiType.LastModifiedTime:
      return 'lastModifiedTime';
    case UiType.DeletedBy:
      return 'deletedBy';
    case UiType.DeletedTime:
      return 'deletedTime';
    case UiType.IsDeleted:
      return 'isDeleted';
    default:
      return '';
  }
}
