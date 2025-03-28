import type { ComponentType, ForwardRefExoticComponent } from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import type { IconProps } from '@tabler/icons-react';
import type { AntdIconProps } from './type';

const TablerIcon = (props: AntdIconProps) => {
  const { color, size, stroke, className, style, content: icon } = props;

  const CustomIconComponent = (_props: CustomIconComponentProps) => {
    const Component = icon as ComponentType<IconProps>;
    return (
      <Component
        size={size || _props.height}
        stroke={stroke || 1.5}
        style={{ ..._props.style, ...style, color }}
        className={className}
      />
    );
  };

  return (
    <Icon
      component={
        CustomIconComponent as ForwardRefExoticComponent<CustomIconComponentProps>
      }
      className={className}
      style={{ ...style, color: color, fontSize: size }}
    />
  );
};

export default TablerIcon;
