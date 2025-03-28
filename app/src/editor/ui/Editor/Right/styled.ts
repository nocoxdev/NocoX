import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 50px;
  gap: 8px;
`;
