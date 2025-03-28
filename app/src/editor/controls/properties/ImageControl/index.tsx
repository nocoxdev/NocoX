import type { ImageProps } from 'antd';
import type { ControlProps } from '@/editor/controls/type';
import ResourceSelect from '@/pages/common/Resource/ResourceSelect';

const ImageControl = (props: ControlProps<ImageProps>) => {
  const { defaultValue, onChange } = props;
  return (
    <ResourceSelect
      defaultValue={defaultValue}
      onChange={onChange}
      style={{ width: '100%' }}
    />
  );
};

export default ImageControl;
