import type { CSSProperties } from 'react';
import { Empty as AntdEmpty } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import EmptySvg from './EmptySvg';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  .ant-empty-description {
    color: #888;
    font-size: ${({ theme }) => theme.fontSize}px;
    user-select: none;
  }
  .ant-empty-image {
    width: 100%;
    height: auto;
  }
`;

export type NoEmptyProps = {
  description?: React.ReactNode;
  image?: React.ReactNode;
  style?: CSSProperties;
  showImg?: boolean;
};

const Empty = (props: NoEmptyProps) => {
  const { description = t('Empty'), image, showImg, style } = props;
  return (
    <StyledWrapper style={style}>
      <AntdEmpty
        description={description}
        image={showImg ? image || <EmptySvg /> : null}
      />
    </StyledWrapper>
  );
};

export default Empty;
