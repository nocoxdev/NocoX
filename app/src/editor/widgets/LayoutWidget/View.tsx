import type { LayoutProps } from 'antd';
import { Layout } from 'antd';
import NoWidget from '@/components/NoWidget';
import { useAppRunningMode } from '@/editor/selectors';
import { hasChildren } from '@/utils/helpers';

const LayoutView = (props: LayoutProps) => {
  const { children, style, ...rest } = props;

  const mode = useAppRunningMode();

  return (
    <Layout
      {...rest}
      style={{
        ...style,
        height: mode !== 'edit' ? '100vh' : '100%',
      }}
    >
      {!hasChildren(children) ? <NoWidget height={100} /> : children}
    </Layout>
  );
};

export default LayoutView;
