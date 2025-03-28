import { isValidElement } from 'react';
import { isString } from 'lodash-es';
import SvgIcon from './SvgIcon';
import TablerIcon from './TablerIcon';
import type { AntdIconProps } from './type';

const AntdIcon = (props: AntdIconProps) => {
  const { content: component, ...restProps } = props;

  if (!component) return null;

  if (isString(component)) {
    return <SvgIcon content={component} {...restProps} />;
  }

  if (isValidElement(component)) {
    return component;
  } else {
    return <TablerIcon content={component} {...restProps} />;
  }
};
export default AntdIcon;
