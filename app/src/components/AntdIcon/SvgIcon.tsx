import type { SVGProps } from 'react';
import Icon from '@ant-design/icons';
import type { DOMNode, HTMLReactParserOptions } from 'html-react-parser';
import parse, {
  attributesToProps,
  domToReact,
  Element,
} from 'html-react-parser';
import type { AntdIconProps } from './type';

export interface SvgIconProps extends AntdIconProps {
  content: string;
}

const SvgIcon = (props: SvgIconProps) => {
  const { color, size, stroke, content: component, className, style } = props;

  if (!component) return null;

  const options: HTMLReactParserOptions = {
    replace(domNode: DOMNode) {
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.tagName === 'svg'
      ) {
        const defaultProps = attributesToProps(domNode.attribs);

        const iconColor =
          (defaultProps['fill'] as string) === 'none'
            ? { stroke: 'currentColor' }
            : { fill: 'currentColor' };

        const props: SVGProps<SVGSVGElement> = {
          xmlns: 'http://www.w3.org/2000/svg',
          ...defaultProps,
          width: size || '1em',
          height: size || '1em',
          color: color,
          ...iconColor,
          strokeWidth: stroke || 1.5,
        };
        return (
          <svg {...props}>{domToReact(domNode.children as DOMNode[])}</svg>
        );
      }
    },
  };

  return (
    <Icon
      component={() => parse(component, options)}
      className={className}
      style={style}
    />
  );
};

export default SvgIcon;
