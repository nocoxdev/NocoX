import { Splitter } from 'antd';
import { styled } from 'styled-components';
import OutlineTree from './OutlineTree';
import Pages from './Pages';

const StyledContainer = styled.div`
  display: block;
  width: 100%;
  height: calc(100vh - 20px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2px 0px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const AppPages = () => {
  return (
    <StyledContainer>
      <Splitter layout="vertical">
        <Splitter.Panel min={100} max={600} defaultSize={250}>
          <Pages />
        </Splitter.Panel>
        <Splitter.Panel>
          <OutlineTree />
        </Splitter.Panel>
      </Splitter>
    </StyledContainer>
  );
};

export default AppPages;
