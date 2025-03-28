import type { IconValueType } from '@/types';
import AntdIcon from '.';

export function toAntdIcon(icon: IconValueType): React.ReactNode {
  return (
    <AntdIcon content={icon?.content} size={icon?.size} color={icon?.color} />
  );
}
