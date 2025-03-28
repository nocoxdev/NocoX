import { use, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import { generateKey } from '@/utils/helpers';
import { useControlSize } from '@/utils/hooks';
import ConditionItem from './ConditionItem';
import { DataFilterContext } from './DataFilterContext';
import type { IFilterCondition, IFilterInfo } from './type';
import { FilterConjunction } from './type';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s;
  min-width: 400px;

  .drag-handle {
    justify-content: flex-start;
  }
  .drag-delete {
    justify-content: flex-end;
  }
`;

const StyledConditions = styled.div`
  display: flex;
  gap: 8px;
  max-height: 300px;
  overflow: auto;
  flex-direction: column;

  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
  }
`;

const StyledAddFilterButton = styled.div<{ $height: number }>`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize}px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colorPrimaryText};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  height: ${({ $height }) => $height}px;

  > span:first-child {
    margin-right: 4px;
  }

  &:hover {
    color: ${({ theme }) => theme.colorPrimaryTextActive};
  }
`;

interface PanelProps {
  defaultFilter: IFilterInfo;
  onFilter: (filters: IFilterInfo) => void;
}

const Panel = (props: PanelProps) => {
  const { defaultFilter, onFilter } = props;
  const [filter, setFilter] = useState<IFilterInfo>(
    defaultFilter || {
      conjunction: FilterConjunction.And,
      conditions: [],
    },
  );

  const { size } = use(DataFilterContext);
  const height = useControlSize(size);
  const handleAddFilter = () => {
    const newCondition: IFilterCondition = {
      key: generateKey(),
      name: '',
      value: '',
    };

    setFilter((prev) => ({
      ...prev,
      conditions: prev.conditions.concat(newCondition),
    }));
  };

  const handleConjunctionChange = (conjunction: FilterConjunction) => {
    setFilter((prev) => ({ ...prev, conjunction }));
  };

  const handleRemove = (key: string) => {
    setFilter((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((c) => c.key !== key),
    }));
  };

  const handleConditionChange = (condition: IFilterCondition) => {
    setFilter((prev) => ({
      ...prev,
      conditions: prev.conditions.map((c) =>
        c.key === condition.key ? condition : c,
      ),
    }));
  };

  return (
    <StyledContainer>
      <StyledConditions>
        {filter.conditions.map((condition, index) => (
          <ConditionItem
            index={index}
            key={condition.key}
            filter={filter}
            condition={condition}
            onChange={handleConditionChange}
            onConjunctionChange={handleConjunctionChange}
            onRemove={handleRemove}
          />
        ))}
      </StyledConditions>
      <Flex align="center" justify="space-between">
        <StyledAddFilterButton onClick={handleAddFilter} $height={height}>
          <PlusOutlined />
          <span>{t('Add condition')}</span>
        </StyledAddFilterButton>

        <Button
          type="primary"
          size={size}
          style={{ width: 56 }}
          onClick={() => onFilter(filter)}
        >
          {t('Confirm')}
        </Button>
      </Flex>
    </StyledContainer>
  );
};

export default Panel;
