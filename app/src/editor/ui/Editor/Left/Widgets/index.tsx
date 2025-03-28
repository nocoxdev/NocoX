import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, Input } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import Empty from '@/components/Empty';
import { useCurPage, useWidgetStore } from '../../../../selectors';
import Group from './WidgetGroup';

const StyledWidgetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 130px);
  width: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
  padding-top: 0;
  margin-right: 1px;
  padding-bottom: 50px;
  gap: 8px;
`;

const StyledSearchWrapper = styled.div`
  padding-inline: 12px;
`;

const Widgets = observer(() => {
  const widgets = useWidgetStore();
  const [groups, setGroups] = useState(widgets.groups);
  const keywordsRef = useRef<string>('');
  const theme = useTheme();
  const curPage = useCurPage();

  return (
    <Flex vertical>
      <StyledSearchWrapper>
        <Input
          placeholder={t('Please enter the widget name')}
          variant="borderless"
          size="large"
          onChange={(e) => (keywordsRef.current = e.target.value)}
          onPressEnter={() => setGroups(widgets.search(keywordsRef.current))}
          onClear={() => setGroups(widgets.search(''))}
          allowClear
          suffix={
            <SearchOutlined
              style={{ color: theme.colorTextTertiary, cursor: 'pointer' }}
              onClick={() => setGroups(widgets.search(keywordsRef.current))}
            />
          }
          styles={{
            affixWrapper: {
              paddingLeft: 0,
              borderBottom: `1px solid ${theme.colorBorderSecondary}`,
              fontSize: theme.fontSize,
            },
            suffix: { position: 'absolute', right: 2, top: 12 },
          }}
        />
      </StyledSearchWrapper>
      <StyledWidgetsContainer>
        {groups.length > 0 ? (
          groups
            .filter(
              (item) =>
                item.showType === 'ALL' || item.showType === curPage?.type,
            )
            .map((item) => (
              <Group
                key={item.name}
                styles={{
                  content: { paddingInline: 12 },
                  header: { paddingInline: 12 },
                }}
                {...item}
              />
            ))
        ) : (
          <Empty description={t('No related widgets')} />
        )}
      </StyledWidgetsContainer>
    </Flex>
  );
});

export default Widgets;
