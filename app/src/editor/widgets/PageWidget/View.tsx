import { t } from 'i18next';
import { styled } from 'styled-components';
import NoWidget from '@/components/NoWidget';
import { IS_WIDGET_CLASS } from '@/editor/constants';
import { hasChildren } from '@/utils/helpers/hasChildren';
import type { PageSizeType } from './type';

const StyledContainer = styled.div`
  display: block;
  box-sizing: border-box;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius}px;
`;

export interface PageViewProps {
  size?: PageSizeType;
  style?: React.CSSProperties;
  className?: string;
}

const PageView = (props: React.PropsWithChildren<PageViewProps>) => {
  const { style, className, children } = props;

  if (!hasChildren(children) && className?.includes(`${IS_WIDGET_CLASS}`)) {
    return (
      <NoWidget
        className={className}
        style={{ ...style, background: 'white' }}
        description={t('Drag components or blocks from the left panel')}
      />
    );
  }

  return (
    <StyledContainer className={className} style={style}>
      {props.children}
    </StyledContainer>
  );
};

export default PageView;
