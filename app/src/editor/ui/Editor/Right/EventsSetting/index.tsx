import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Empty from '@/components/Empty';
import { useSelection } from '@/editor/selectors';
import EventControl from './EventControl';
import { EventSettingContext } from './EventSettingContext';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-inline: 16px;
`;

const EventsSetting = observer(() => {
  const { node } = useSelection();

  if (!node) {
    return <Empty description={t('Please select widget')} />;
  }

  return (
    <StyledContainer key={node.id}>
      <EventSettingContext.Provider
        value={{
          configs: node.app.actions,
          node,
        }}
      >
        {node.events.list.map((event) => {
          const config = node.widget.events?.find(
            (item) => item.name === event.name,
          );

          return (
            <EventControl
              key={event.name}
              config={config!}
              onChange={(val) => node.events.set(val)}
              size="small"
              value={event}
              placeholder={t('Please select event')}
            />
          );
        })}
      </EventSettingContext.Provider>
    </StyledContainer>
  );
});

export default EventsSetting;
