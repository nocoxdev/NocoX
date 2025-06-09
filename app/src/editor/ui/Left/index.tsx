import { t } from 'i18next';
import { styled } from 'styled-components';
import SegementTabs from '@/components/SegementTabs';
import type { SegementTabItem } from '@/components/SegementTabs/type';
import { StyledSidebarWrapper } from '../styled';
import App from './App';
import Blocks from './Blocks';
import Widgets from './Widgets';

const StyledContainer = styled.div`
  padding-top: 12px;
  height: 100%;
  box-sizing: border-box;
`;

const LeftSide = () => {
  const items: SegementTabItem[] = [
    {
      label: t('Pages'),
      key: 'app',
      content: <App />,
    },
    {
      label: t('Widgets'),
      key: 'widgets',
      content: <Widgets />,
    },
    {
      label: t('Blocks'),
      key: 'blocks',
      content: <Blocks />,
    },
  ];

  return (
    <StyledSidebarWrapper style={{ paddingInline: 0 }}>
      <StyledContainer>
        <SegementTabs
          items={items}
          defaultActiveKey="pages"
          tabsStyle={{ paddingInline: 12 }}
        />
      </StyledContainer>
    </StyledSidebarWrapper>
  );
};

export default LeftSide;
