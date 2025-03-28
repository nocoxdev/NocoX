import { useMemo } from 'react';
import { useControllableValue } from 'ahooks';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { t } from 'i18next';
import { styled } from 'styled-components';
import type { PermissionCheckboxOptionType } from './CheckGroup';
import PermissionCheckGroup from './CheckGroup';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCheckBoxAll = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};

  .ant-checkbox-wrapper {
    span {
      color: ${({ theme }) => theme.colorTextSecondary};
    }
  }
`;

interface PermissionCheckListProps {
  groups: {
    value: string;
    label: string;
    options: PermissionCheckboxOptionType[];
  }[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

const PermissionCheckList = (props: PermissionCheckListProps) => {
  const { groups = [] } = props;

  const [value, setValue] = useControllableValue<string[]>(props, {
    defaultValue: [],
  });

  const allChecked = useMemo(
    () => groups.flatMap((item) => item.options).length === value.length,
    [groups, value],
  );

  const indeterminate = useMemo(
    () =>
      value.length > 0 &&
      value.length < groups.flatMap((item) => item.options).length,
    [groups, value],
  );

  const handleChange = (list: string[], val: string[]) => {
    setValue((pre) =>
      pre.filter((item) => list.indexOf(item) === -1).concat(val),
    );
  };

  const handleCheckAll = (e: CheckboxChangeEvent) => {
    setValue(
      e.target.checked
        ? groups.flatMap((item) => item.options).map((item) => item.value)
        : [],
    );
  };

  return (
    <StyledContainer>
      <StyledCheckBoxAll>
        <Checkbox
          indeterminate={indeterminate}
          checked={allChecked}
          onChange={handleCheckAll}
        >
          {t('All')}
        </Checkbox>
      </StyledCheckBoxAll>

      {groups.map((item) => (
        <PermissionCheckGroup
          label={item.label}
          options={item.options}
          key={item.value}
          value={value.filter((id) =>
            item.options.map((opt) => opt.value).includes(id),
          )}
          onChange={(val) =>
            handleChange(
              item.options.map((opt) => opt.value),
              val,
            )
          }
        />
      ))}
    </StyledContainer>
  );
};

export default PermissionCheckList;
