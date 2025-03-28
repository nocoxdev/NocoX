import type { FlexProps } from 'antd';
import { Flex } from 'antd';
import NoWidget from '@/components/NoWidget';
import { hasChildren } from '@/utils/helpers';

export interface FlexViewProps extends FlexProps {
  children: React.ReactNode | undefined;
  direction?: 'horizontal' | 'vertical';
  emptyText?: string;
  flexGrow?: boolean;
  flexShrink?: boolean;
  emptyStyle?: React.CSSProperties;
}

const FlexView = (props: FlexViewProps) => {
  const {
    children,
    direction,
    emptyText,
    flexGrow,
    flexShrink,
    className,
    emptyStyle,
    style,
    ...restProps
  } = props;

  return (
    <Flex
      {...restProps}
      rootClassName={className}
      vertical={direction === 'vertical'}
      // flex={`${flexGrow ? 1 : 0} ${flexShrink ? 1 : 0} 0`}
      style={{
        ...style,
        ...(flexGrow && { flexGrow: 1 }),
        ...(flexShrink && { flexShrink: 1 }),
      }}
    >
      {hasChildren(children) ? (
        children
      ) : (
        <NoWidget height={28} description={emptyText} style={emptyStyle} />
      )}
    </Flex>
  );
};

export default FlexView;
