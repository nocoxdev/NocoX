import { Flex, Tag } from 'antd';
import { uniq } from 'lodash-es';
import styled, { useTheme } from 'styled-components';
import AntdIcon from '../AntdIcon';
import { getIcon } from './utils';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  padding: 12px 20px;
  min-height: 80px;
  overflow: hidden;
`;

const StyledTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colorText};
`;

interface IconPreviewProps {
  name?: string;
}

const IconPreview = ({ name }: IconPreviewProps) => {
  const theme = useTheme();
  const icon = getIcon(name);

  return (
    <StyledContainer>
      {icon && (
        <Flex gap={8}>
          <AntdIcon
            content={icon.content}
            size={64}
            color={theme.colorSuccess}
          />
          <Flex vertical gap={4} justify="center">
            <StyledTitle>{icon.title}</StyledTitle>
            <Flex gap={4} wrap="wrap">
              {uniq(icon.tags)
                .slice(0, 4)
                .map((item) => (
                  <Tag
                    key={item}
                    bordered={false}
                    color="blue"
                    style={{ marginInlineEnd: 0 }}
                  >
                    {item}
                  </Tag>
                ))}
            </Flex>
          </Flex>
        </Flex>
      )}
    </StyledContainer>
  );
};

export default IconPreview;
