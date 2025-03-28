import type { FlexViewProps } from '../FlexWidget/View';
import FlexView from '../FlexWidget/View';

interface InnerContainerViewProps extends FlexViewProps {}

const InnerContainerView = (props: InnerContainerViewProps) => {
  return <FlexView {...props} />;
};

export default InnerContainerView;
