import { Space } from 'antd';
import type { SpaceCompactProps } from 'antd/lib/space/Compact';
import ContainerView from '../ContainerWidget/View';

const SpaceView = (props: SpaceCompactProps) => {
  const { children, style, className, ...restProps } = props;

  const mergedStyle = {
    ...style,
    ...(!children ? { height: '100%', maxHeight: 32 } : undefined),
  };

  return (
    <Space.Compact {...restProps} style={mergedStyle}>
      {children || <ContainerView height="100%" width="300px" />}
    </Space.Compact>
  );
};

export default SpaceView;
