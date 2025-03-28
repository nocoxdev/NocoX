import { ExclamationCircleFilled } from '@ant-design/icons';
import type { PopconfirmProps } from 'antd';
import { Flex } from 'antd';
import { styled } from 'styled-components';
import { getRenderPropValue } from '@/utils/helpers';

const StyledContainer = styled.div`
  min-width: 100px;
  height: 100%;
  background-color: transparent;
`;

const StyledIcon = styled.div`
  color: ${({ theme }) => theme.colorWarningText};
  font-weight: 600;
  display: flex;
  width: 16px;
`;

const StyledTitle = styled.div`
  color: ${({ theme }) => theme.colorText};
  font-weight: 600;
`;

const StyledDescription = styled.div`
  padding-left: 20px;
  color: ${({ theme }) => theme.colorText};
`;

const StyledActions = styled.div``;

interface OverlayProps
  extends Pick<PopconfirmProps, 'icon' | 'title' | 'description'> {
  actions: React.ReactNode;
}

const Overlay = (props: OverlayProps) => {
  const { icon, title, description, actions } = props;

  return (
    <StyledContainer>
      <Flex vertical gap={4}>
        <Flex gap={2} align="center">
          <StyledIcon>{icon || <ExclamationCircleFilled />}</StyledIcon>

          {title && <StyledTitle>{getRenderPropValue(title)}</StyledTitle>}
        </Flex>
        {description && (
          <StyledDescription>
            {getRenderPropValue(description)}
          </StyledDescription>
        )}
      </Flex>

      <StyledActions>{actions}</StyledActions>
    </StyledContainer>
  );
};

export default Overlay;
