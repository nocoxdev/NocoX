import type { ColProps } from 'antd';
import { Col } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import NoWidget from '@/components/NoWidget';
import { hasChildren } from '@/utils/helpers/hasChildren';

export const StyledCol = styled(Col)`
  width: 100%;
  height: 100%;
`;

const ColView = (props: ColProps) => {
  const { children, style, className, ...restProps } = props;
  const mergedStyle = {
    ...style,
    ...(!children ? { height: '100%', maxHeight: 60 } : undefined),
  };

  return (
    <StyledCol {...restProps} style={mergedStyle} className={className}>
      {hasChildren(children) ? (
        children
      ) : (
        <NoWidget description={t('Drag components here')} height={60} />
      )}
    </StyledCol>
  );
};

export default ColView;
