import type { CSSProperties } from 'react';
import Icon from '@/components/AntdIcon';
import { getIcon } from '@/components/IconPicker/utils';
import type { IconValueType } from '@/types';

export interface IconViewProps {
  value?: string | IconValueType;
  color?: string;
  size?: string;
  stroke?: number;
  style?: CSSProperties;
  className?: string;
}

const IconView = (props: IconViewProps) => {
  const { value, color, size, stroke, style, className } = props;

  const icon = getIcon(typeof value === 'string' ? value : value?.name)!;

  return (
    <Icon
      content={icon?.content}
      color={color}
      size={size}
      stroke={stroke}
      className={className}
      style={style}
    />
  );
};

export default IconView;
