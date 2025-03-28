import type { ImageViewProps } from '@/components/ImageView';
import ImageView from '@/components/ImageView';

const Image = (props: ImageViewProps) => {
  const { className, style, ...rest } = props;

  return (
    <ImageView {...rest} wrapperClassName={className} wrapperStyle={style} />
  );
};

export default Image;
