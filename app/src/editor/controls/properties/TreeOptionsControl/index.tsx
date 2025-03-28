import { Fragment, useMemo } from 'react';
import { useControllableValue } from 'ahooks';
import { Radio } from 'antd';
import { t } from 'i18next';
import styled from 'styled-components';
import type { ControlProps, OptionsDataType } from '@/editor/controls/type';
import type { EnhancedOptions, UniqueArray } from '@/types';
import CustomOptions from './CustomOptions';
import DataModelOptions from './DataModelOptions';
import DictionaryOptions from './DictionaryOptions';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  .ant-radio-button-wrapper {
    padding-inline: 4px;
  }
`;

interface TreeOptionsControlProps {
  types?: UniqueArray<OptionsDataType>;
}

const TreeOptionsControl = (props: ControlProps<TreeOptionsControlProps>) => {
  const [value, setValue] = useControllableValue<EnhancedOptions>(props, {
    defaultValue: { type: 'custom', options: [] },
  });

  const { types = ['custom', 'dataTable', 'dictionary'] } =
    props.controlProps || {};

  const options = useMemo(() => {
    const items = [
      {
        label: t('Custom'),
        value: 'custom',
        children: (
          <CustomOptions
            {...props}
            value={value?.options || []}
            onChange={(val) => setValue({ ...value, options: val })}
          />
        ),
      },
      {
        label: t('DataTable'),
        value: 'dataTable',
        children: (
          <DataModelOptions
            {...props}
            value={value?.dataTable}
            onChange={(val) => setValue({ ...value, dataTable: val })}
          />
        ),
      },
      {
        label: t('Dictionary'),
        value: 'dictionary',
        children: (
          <DictionaryOptions
            {...props}
            value={value?.dictionary}
            onChange={(val) =>
              setValue({
                ...value,
                dictionary: val,
              })
            }
          />
        ),
      },
    ];

    return items.filter((item) =>
      types.includes(item.value as OptionsDataType),
    );
  }, [types, value]);

  return (
    <StyledContainer>
      {options.length !== 1 && (
        <Radio.Group
          block
          options={options}
          optionType="button"
          buttonStyle="solid"
          size="small"
          value={value?.type}
          onChange={(e) => setValue({ ...value, type: e.target.value })}
        />
      )}

      {options.map((option) => {
        return (
          <Fragment key={option.value}>
            {value?.type === option.value && option.children}
          </Fragment>
        );
      })}
    </StyledContainer>
  );
};

export default TreeOptionsControl;
