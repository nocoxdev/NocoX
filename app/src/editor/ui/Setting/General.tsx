import { Divider } from 'antd';
import type { CSSProperties } from 'styled-components';
import AppNameChanger from './AppNameChanger';
import FaviconChanger from './FaviconChanger';
import { StyledContainer } from './styled';

interface GeneralProps {
  style?: CSSProperties;
}

const General = ({ style }: GeneralProps) => {
  return (
    <StyledContainer style={style}>
      <AppNameChanger />
      <Divider />
      <FaviconChanger />
    </StyledContainer>
  );
};

export default General;
