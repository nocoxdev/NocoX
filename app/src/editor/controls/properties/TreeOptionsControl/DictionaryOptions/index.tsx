import { useMemo } from 'react';
import { useControllableValue, useRequest } from 'ahooks';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { styled } from 'styled-components';
import { DictionaryGroupApi } from '@/services/api';
import type { EnhancedOptions } from '@/types';
import DictionarySelect from './DictionarySelect';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

type DictionaryOptionsValue = EnhancedOptions['dictionary'];

interface DictionaryOptionsProps {
  size?: SizeType;
  variant?: Variant;
  value?: DictionaryOptionsValue;
  onChange?: (value: DictionaryOptionsValue) => void;
}

const DictionaryOptions = (props: DictionaryOptionsProps) => {
  const { size, variant } = props;

  const [value, setValue] = useControllableValue<DictionaryOptionsValue>(props);
  const { data: resp, loading } = useRequest(() =>
    DictionaryGroupApi.getList(),
  );

  const options = useMemo(
    () => resp?.data?.map((item) => ({ label: item.title, value: item.id })),
    [resp],
  );

  return (
    <StyledContainer>
      <DictionarySelect
        size={size}
        variant={variant}
        style={{ width: '100%' }}
        value={value?.groupId}
        onChange={(groupId) => setValue({ groupId })}
        options={options}
        loading={loading}
      />
    </StyledContainer>
  );
};

export default DictionaryOptions;
