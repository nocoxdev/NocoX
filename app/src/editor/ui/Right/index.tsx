import { Empty, Flex } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import SegementTabs from '@/components/SegementTabs';
import { useSelection } from '@/editor/selectors';
import { StyledSidebarWrapper } from '../styled';
import EventsSetting from './EventsSetting';
import PropsSetting from './PropsSetting';
import StylesSetting from './StylesSetting';

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
`;

const StyledPaneContainer = styled.div`
  display: block;
  width: calc(100% - 1px);
  overflow: hidden;
`;

const RightSide = observer(() => {
  const { node } = useSelection();

  if (!node) {
    return (
      <Flex
        justify="center"
        align="center"
        style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}
      >
        <Empty description={t('Please select widget')} />
      </Flex>
    );
  }

  const items = [
    {
      label: t('Properties'),
      key: 'props',
      visible: !!node.widget.propGroups?.length,
      content: (
        <StyledPaneContainer>
          <PropsSetting />
        </StyledPaneContainer>
      ),
    },
    {
      label: t('Events'),
      key: 'events',
      visible: !!node.widget.events?.length,
      content: (
        <StyledPaneContainer>
          <EventsSetting />
        </StyledPaneContainer>
      ),
    },
    {
      label: t('Styles'),
      key: 'styles',
      visible: !!node.widget.styleGroups?.length,
      content: (
        <StyledPaneContainer>
          <StylesSetting />
        </StyledPaneContainer>
      ),
    },
  ];

  return (
    <StyledSidebarWrapper style={{ paddingInline: 0 }}>
      <StyledContainer>
        <SegementTabs
          items={items}
          defaultActiveKey="props"
          tabsStyle={{ paddingInline: 12, marginTop: 12 }}
        />
      </StyledContainer>
    </StyledSidebarWrapper>
  );
});

export default RightSide;
