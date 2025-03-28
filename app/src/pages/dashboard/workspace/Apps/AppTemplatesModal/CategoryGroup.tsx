import { Flex } from 'antd';
import classNames from 'classnames';
import { styled } from 'styled-components';

const StyledCategoryGroupTitle = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.controlHeight}px;
  color: ${({ theme }) => theme.colorTextTertiary};
  font-size: ${({ theme }) => theme.fontSize}px;
`;

const StyledCategoryItem = styled.div`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  height: ${({ theme }) => theme.controlHeight}px;
  width: calc(100% - 20px);
  padding: 0 8px;
  transition: all 0.2s;
  box-sizing: border-box;
  cursor: pointer;
  &.selected {
    color: ${({ theme }) => theme.colorPrimaryText};
    background-color: ${({ theme }) => theme.controlItemBgActive};
  }
  &:hover {
    background-color: ${({ theme }) => theme.controlItemBgHover};
  }
`;

const StyledCategoryIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 20px;
  img {
    width: 16px;
    height: 16px;
  }
`;

const StyledCategoryLabel = styled.div`
  display: block;
  width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
`;

export interface CategoryItemType {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CategoryGroupProps {
  label: string;
  items: CategoryItemType[];
  onSelect: (key: string) => void;
  selectedKey?: string;
}

const CategoryGroup = (props: CategoryGroupProps) => {
  const { label, onSelect, selectedKey, items } = props;

  return (
    <Flex vertical gap={2}>
      <StyledCategoryGroupTitle>{label}</StyledCategoryGroupTitle>
      {items.map((item) => (
        <StyledCategoryItem
          key={item.key}
          className={classNames({ selected: item.key === selectedKey })}
          onClick={() => onSelect(selectedKey === item.key ? '' : item.key)}
        >
          <StyledCategoryIcon>{item.icon}</StyledCategoryIcon>
          <StyledCategoryLabel>{item.label}</StyledCategoryLabel>
        </StyledCategoryItem>
      ))}
    </Flex>
  );
};

export default CategoryGroup;
