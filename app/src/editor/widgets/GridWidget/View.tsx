import type { RowProps } from 'antd';
import { Row } from 'antd';
import type { Gutter } from 'antd/lib/grid/row';
import { t } from 'i18next';
import { styled } from 'styled-components';
import NoWidget from '@/components/NoWidget';
import { hasChildren } from '@/utils/helpers/hasChildren';

const StyledRow = styled(Row)`
  width: 100%;
  height: 100%;
  min-height: 28px;
`;

export interface RowViewProps extends RowProps {
  horizontalGutter?: number;
  verticalGutter?: number;
}

const RowView = (props: RowViewProps) => {
  const {
    horizontalGutter = 0,
    verticalGutter = 0,
    children,
    className,
    ...restProps
  } = props;

  const gutter: [Gutter, Gutter] = [horizontalGutter, verticalGutter];
  return (
    <StyledRow {...restProps} gutter={gutter} className={className}>
      {hasChildren(children) ? (
        children
      ) : (
        <NoWidget description={t('Please add columns')} />
      )}
    </StyledRow>
  );
};

export default RowView;
