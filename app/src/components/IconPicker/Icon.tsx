import AntdIcon from '../AntdIcon';
import type { AntdIconProps } from '../AntdIcon/type';
import { getIcon } from './utils';

export interface IconProps
  extends Omit<AntdIconProps, 'component' | 'content'> {
  name: string;
}

const Icon = ({ name, ...restProps }: IconProps) => {
  const icon = getIcon(name);

  return icon && <AntdIcon content={icon.content} {...restProps} />;
};

export default Icon;
