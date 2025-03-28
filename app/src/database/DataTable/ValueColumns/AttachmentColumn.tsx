import AttachmentSelect from '@/components/AttachmentSelect';
import type { ValueComponentProps } from '@/types';

export const AttachmentColumn = (props: ValueComponentProps) => {
  return <AttachmentSelect {...props} />;
};
