import { useControllableValue } from 'ahooks';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { styled } from 'styled-components';
import type { EnhancedOptions } from '@/types';
import TableSelect from './TableCascader';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type DataModelOptionsValue = EnhancedOptions['dataTable'];

interface DataModelOptionsProps {
  size?: SizeType;
  variant?: Variant;
  value?: DataModelOptionsValue;
  onChange?: (value: DataModelOptionsValue) => void;
}

const DataModelOptions = (props: DataModelOptionsProps) => {
  const { size, variant } = props;
  const [value, setValue] = useControllableValue<DataModelOptionsValue>(props);

  const handleChange = (tableId?: string, columnName?: string) => {
    const newValue =
      tableId && columnName ? { tableId, columnName } : undefined;
    setValue(newValue);
  };

  return (
    <StyledContainer>
      <TableSelect
        size={size}
        variant={variant}
        style={{ width: '100%' }}
        value={
          value?.tableId && value?.columnName
            ? [value.tableId, value.columnName]
            : undefined
        }
        onChange={([tableId, columnName]) =>
          handleChange(tableId?.toString(), columnName?.toString())
        }
      />
    </StyledContainer>
  );
};

export default DataModelOptions;
