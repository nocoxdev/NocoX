import type { LayoutProps } from 'antd';
import { Flex, Layout } from 'antd';
import { styled } from 'styled-components';
import { UserAvatar } from '@/pages/common/PageHeader';
import { StyledAvatarContainer } from '@/pages/common/styled';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const HeaderView = (props: LayoutProps) => {
  return (
    <Layout.Header
      {...props}
      style={{ background: 'white', padding: 0, ...props.style }}
    >
      <StyledContainer>
        <Flex align="center" justify="center" className={props.className}>
          {props.children || <div />}
        </Flex>

        <StyledAvatarContainer>
          <UserAvatar />
        </StyledAvatarContainer>
      </StyledContainer>
    </Layout.Header>
  );
};

export default HeaderView;
