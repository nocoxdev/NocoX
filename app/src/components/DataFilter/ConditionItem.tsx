import { use, useMemo } from 'react';
import { IconTrash } from '@tabler/icons-react';
import { Flex, Select } from 'antd';
import { styled } from 'styled-components';
import type { IDataField } from '@/types';
import { useControlSize } from '@/utils/hooks';
import { conjunctions } from './config';
import { DataFilterContext } from './DataFilterContext';
import type { FilterConjunction, IFilterCondition, IFilterInfo } from './type';
import { useOperator } from './useOperator';

const StyledContainer = styled.div<{ $height: number }>`
  display: flex;
  gap: 8px;
  height: ${({ $height }) => $height}px;
  align-items: center;
`;

const StyledConjunctionContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 70px;

  > span,
  .ant-select-selector {
    padding: 0 11px !important;
  }
`;

const StyledRemove = styled.div`
  display: flex;
  width: 24px;
  height: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colorTextQuaternary};
  transition: all 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colorTextSecondary};
    svg {
      stroke: ${({ theme }) => theme.colorErrorActive};
    }
  }
`;

interface ConditionItemProps {
  index: number;
  filter: IFilterInfo;
  condition: IFilterCondition;
  onConjunctionChange: (conjunction: FilterConjunction) => void;
  onChange: (condition: IFilterCondition) => void;
  onRemove: (key: string) => void;
}

const ConditionItem = (props: ConditionItemProps) => {
  const { index, filter, condition, onConjunctionChange, onChange, onRemove } =
    props;
  const { fields, size } = use(DataFilterContext);
  const height = useControlSize(size);
  const {
    options: operatorOptions,
    component: Component,
    props: componentProps,
  } = useOperator(condition);

  const options = fields.map((item) => {
    if ('fields' in item) {
      return {
        label: item.title,
        options: item.fields.map((field) => ({
          label: field.title,
          value: field.name,
        })),
      };
    } else {
      return {
        label: item.title,
        value: item.name,
      };
    }
  });

  const currentField = useMemo(
    () => fields.find((item) => item.name === condition.name) as IDataField,
    [condition.name],
  );

  return (
    <StyledContainer $height={height}>
      <Flex gap={8} align="center">
        <StyledConjunctionContainer>
          {index === 0 && <span>Where</span>}
          {index === 1 && (
            <Select
              style={{ width: '100%' }}
              size={size}
              value={filter.conjunction}
              options={conjunctions}
              onChange={(val) => onConjunctionChange(val)}
            />
          )}
          {index > 1 && (
            <span>
              {
                conjunctions.find((item) => filter.conjunction === item.value)
                  ?.label
              }
            </span>
          )}
        </StyledConjunctionContainer>
        <Select
          size={size}
          style={{ width: 160 }}
          options={options}
          value={condition.name}
          onChange={(value) => {
            const field = fields.find((item) => item.name === value);

            const type =
              field && 'valueType' in field ? field?.valueType : undefined;

            onChange({
              ...condition,
              name: value,
              operator: undefined,
              value: undefined,
              type,
            });
          }}
        />
        <Select
          size={size}
          style={{ width: 200 }}
          options={operatorOptions}
          value={condition.operator}
          onChange={(val) => onChange({ ...condition, operator: val })}
        />
        {currentField?.options ? (
          <Select
            size={size}
            value={condition.value}
            onChange={(val: any) => onChange({ ...condition, value: val })}
            options={currentField.options}
            style={{ width: 200 }}
          />
        ) : (
          Component && (
            <Component
              {...componentProps}
              size={size}
              value={condition.value}
              onChange={(val: any) => onChange({ ...condition, value: val })}
            />
          )
        )}
      </Flex>
      <StyledRemove onClick={() => onRemove(condition.key)}>
        <IconTrash size={14} />
      </StyledRemove>
    </StyledContainer>
  );
};

export default ConditionItem;
