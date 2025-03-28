import type { TablePaginationConfig } from 'antd';
import { Pagination } from 'antd';

const PaginationView = (props: TablePaginationConfig) => {
  const { className, ...restProps } = props;
  return <Pagination {...restProps} rootClassName={className} />;
};

export default PaginationView;
