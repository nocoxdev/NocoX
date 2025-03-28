import { use } from 'react';
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import { DataSortContext } from './DataSortContext';
import { type ISortItem, SortOrder } from './type';
import { useSortOrder } from './useSortOrder';

const StyledContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

interface SortItemProps {
  sorts: ISortItem[];
  sort: ISortItem;
  onChange: (item: ISortItem) => void;
}

const SortItem = observer((props: SortItemProps) => {
  const { sorts, sort, onChange } = props;
  const { fields, size } = use(DataSortContext);
  const { options } = useSortOrder(sort);

  const availableFieldOptions = fields
    .filter(
      (field) =>
        field.name === sort.name || sorts.every((s) => s.name !== field.name),
    )
    .map((item) => ({ value: item.name, label: item.title }));

  return (
    <StyledContainer>
      <Select
        size={size}
        style={{ width: 160 }}
        options={availableFieldOptions}
        value={sort.name}
        onChange={(value) => {
          onChange({
            ...sort,
            name: value,
            order: SortOrder.Ascending,
          });
        }}
      />

      <Select
        size={size}
        style={{ width: 160 }}
        options={options}
        value={sort.order}
        onChange={(value) => onChange({ ...sort, order: value })}
      />
    </StyledContainer>
  );
});

export default SortItem;
