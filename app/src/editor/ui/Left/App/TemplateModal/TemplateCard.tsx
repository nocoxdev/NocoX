import { use } from 'react';
import { Flex, Image } from 'antd';
import classNames from 'classnames';
import { styled } from 'styled-components';
import type { PageTemplateType } from '@/types';
import { PageTempateContext } from './context';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: 162px;
  height: 200px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  }

  &.selected {
    border: 1px solid ${({ theme }) => theme.colorPrimary};
  }
`;

const StyledCover = styled.div`
  display: flex;
  width: 100%;
  height: 140px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme }) => theme.colorPrimaryBg};
  padding: 8px;
  box-sizing: border-box;
  img {
    object-fit: contain;
  }
  .ant-image-mask {
    &:hover {
      opacity: 0.6;
    }
  }
`;

const StyledTitle = styled.div`
  color: ${({ theme }) => theme.colorText};
  padding-inline: 12px;
  font-size: 13px;
`;

const StyledDescription = styled.div`
  display: block;
  color: ${({ theme }) => theme.colorTextSecondary};
  padding-inline: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface TemplateCardProps {
  item: PageTemplateType;
}

const TemplateCard = ({ item }: TemplateCardProps) => {
  const { title, description, cover } = item;

  const { current, setCurrent } = use(PageTempateContext);

  return (
    <StyledContainer
      onClick={() => setCurrent(item.id)}
      className={classNames({ selected: current === item.id })}
    >
      <StyledCover>
        <Image src={cover} height={80} />
      </StyledCover>
      <Flex vertical gap={2}>
        <StyledTitle> {title}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
      </Flex>
    </StyledContainer>
  );
};

export default TemplateCard;
