import NoWidget from '@/components/NoWidget';
import type { WidgetProps } from '@/types';
import { hasChildren } from '@/utils/helpers';

interface LinkProps {
  href: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const LinkView = ({ children, ...restProps }: WidgetProps<LinkProps>) => {
  return (
    <a {...restProps}>
      {hasChildren(children) ? children : <NoWidget width={60} />}
    </a>
  );
};

export default LinkView;
