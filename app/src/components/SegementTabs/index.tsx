import { useEffect, useMemo } from 'react';
import { useControllableValue } from 'ahooks';
import { Segmented } from 'antd';
import { styled } from 'styled-components';
import Panel from './Panel';
import type { SegementTabItem } from './type';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;

  .ant-segmented-item {
    .ant-segmented-item-label {
      font-size: ${({ theme }) => theme.fontSize}px;
    }
  }
  .ant-segmented-item-selected {
    .ant-segmented-item-label {
      color: ${({ theme }) => theme.colorPrimary};
      font-weight: 600;
    }
  }
`;

const StyledContent = styled.div`
  flex: 1;
`;

export interface SegementTabsProps {
  activeKey?: string;
  defaultActiveKey?: string;
  items: SegementTabItem[];
  onItemChange?: (key: string) => void;
  tabsStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  style?: React.CSSProperties;
}

const SegementTabs = (props: SegementTabsProps) => {
  const { items, tabsStyle, contentStyle, style } = props;
  const [activeKey, setActiveKey] = useControllableValue<string>(props, {
    defaultValuePropName: 'defaultActiveKey',
    valuePropName: 'activeKey',
    trigger: 'onItemChange',
  });

  const filterItems = useMemo(
    () => items.filter((item) => item.visible !== false),
    [items],
  );

  useEffect(() => {
    if (activeKey) {
      const item = filterItems.find((item) => item.key === activeKey);
      if (!item) {
        filterItems[0]?.key && setActiveKey(filterItems[0]?.key);
      }
    }
  }, [filterItems]);

  return (
    <StyledContainer style={style}>
      {filterItems.length > 1 && (
        <div style={tabsStyle}>
          <Segmented
            block
            options={filterItems.map((item) => ({
              label: item.label,
              value: item.key,
            }))}
            value={activeKey}
            onChange={(val) => setActiveKey(val.toString())}
            style={{ marginBottom: 4 }}
            size="small"
          />
        </div>
      )}
      <StyledContent style={contentStyle}>
        {filterItems.map((item) => (
          <Panel
            key={item.key}
            active={activeKey === item.key}
            style={item.style}
          >
            {item.content}
          </Panel>
        ))}
      </StyledContent>
    </StyledContainer>
  );
};

export default SegementTabs;
