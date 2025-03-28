import { Flex, Tag, Typography } from 'antd';
import { styled, useTheme } from 'styled-components';

const StyledTemplateCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: 222px;
  height: 264px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  }
`;

const StyledTemplateCardCover = styled.div`
  display: flex;
  width: 100%;
  height: 140px;
  background-color: ${({ theme }) => theme.colorPrimaryBg};
  padding: 20px;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

interface TemplateCardProps {
  cover: string;
  title: string;
  tags: string[];
  description: string;
  onClick?: () => void;
}

const TemplateCard = (props: TemplateCardProps) => {
  const { cover, title, tags, description, onClick } = props;
  const theme = useTheme();

  return (
    <StyledTemplateCard onClick={onClick}>
      <StyledTemplateCardCover>
        <img src={cover} alt="cover" />
      </StyledTemplateCardCover>
      <Flex style={{ paddingInline: 12 }}>
        {tags.map((tag) => (
          <Tag key={tag} color={theme.colorPrimary}>
            {tag}
          </Tag>
        ))}
      </Flex>
      <Flex vertical gap={2} style={{ paddingInline: 12, paddingBottom: 20 }}>
        <Typography.Title level={5} style={{ marginBlock: 0 }}>
          {title}
        </Typography.Title>
        <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ marginBlock: 0 }}>
          {description}
        </Typography.Paragraph>
      </Flex>
    </StyledTemplateCard>
  );
};

export default TemplateCard;
