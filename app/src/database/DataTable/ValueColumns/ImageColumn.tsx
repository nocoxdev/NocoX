import ImageSelect from '@/components/ImageSelect';
import type { ValueComponentProps } from '@/types';

export const ImageColumn = (props: ValueComponentProps) => {
  return <ImageSelect {...props} />;
};
