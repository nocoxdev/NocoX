import type { LayoutProps } from 'antd';
import { Layout } from 'antd';
import NoWidget from '@/components/NoWidget';
import { hasChildren } from '@/utils/helpers';

const FooterView = (props: LayoutProps) => {
  const { children, style } = props;
  return (
    <Layout.Footer {...props} style={{ textAlign: 'center', ...style }}>
      {hasChildren(children) ? (
        children
      ) : (
        <NoWidget width="100%" height="100%" />
      )}
    </Layout.Footer>
  );
};

export default FooterView;
