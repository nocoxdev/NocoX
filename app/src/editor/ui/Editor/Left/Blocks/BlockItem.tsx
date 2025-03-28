import type { CSSProperties } from 'react';
import { Flex } from 'antd';
import { styled } from 'styled-components';
import ImageView from '@/components/ImageView';

const StyledContainer = styled(Flex)`
  position: relative;
  cursor: pointer;
  margin-bottom: 16px;

  > span {
    color: ${({ theme }) => theme.colorTextSecondary};
    font-size: ${({ theme }) => theme.fontSize}px;
  }
`;

const StyledCoverWrapper = styled.div`
  width: 100%;
  height: 150px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colorBgLayout};
  &:hover {
    background-color: ${({ theme }) => theme.colorPrimaryBgHover};
  }
`;

interface BlockItemProps {
  cover: string;
  title: string;
  style?: CSSProperties;
}

const BlockItem = (props: BlockItemProps) => {
  const { cover, title, style } = props;

  return (
    <StyledContainer
      vertical
      gap={4}
      align="center"
      style={style}
      draggable={false}
    >
      <StyledCoverWrapper>
        <ImageView id={cover} preview={false} />
      </StyledCoverWrapper>
      <span>{title}</span>
    </StyledContainer>
  );
};

export default BlockItem;
