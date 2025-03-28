import { useMemo } from 'react';
import { useControllableValue } from 'ahooks';
import type { CheckboxOptionType } from 'antd';
import { Checkbox, ConfigProvider, Flex } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { styled, useTheme } from 'styled-components';
import { PermissionType } from '@/services/responses';

const StyledContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-block: 14px;
  border-bottom: 1px solid #f3f3f3;
`;

const StyledGroup = styled.div`
  width: 140px;
  flex-shrink: 0;
  .ant-checkbox-label {
    color: ${({ theme }) => theme.colorText};
    font-weight: 600;
  }
`;

export type PermissionCheckboxOptionType = {
  type: PermissionType;
} & CheckboxOptionType;

interface PermissionCheckGroupProps {
  label: string;
  options: PermissionCheckboxOptionType[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

const PermissionCheckGroup = (props: PermissionCheckGroupProps) => {
  const { label, options } = props;
  const theme = useTheme();

  const [value, setValue] = useControllableValue<string[]>(props, {
    defaultValue: [],
  });

  const allChecked = useMemo(
    () => options.length === value.length,
    [value, options],
  );

  const indeterminate = useMemo(
    () => value.length > 0 && value.length < options.length,
    [value, options],
  );

  const getPermissionTypeColor = (type: PermissionType) => {
    switch (type) {
      case PermissionType.Warning:
        return theme.colorWarningText;
      case PermissionType.Danger:
        return theme.colorErrorText;
      default:
        return theme.colorPrimaryText;
    }
  };

  const handleCheckAll = (e: CheckboxChangeEvent) => {
    setValue(e.target.checked ? options.map((item) => item.value) : []);
  };

  const handleChange = (val: string) => {
    setValue(
      value.includes(val)
        ? value.filter((item) => item !== val)
        : [...value, val],
    );
  };

  return (
    <StyledContainer>
      <StyledGroup>
        <Checkbox
          indeterminate={indeterminate}
          onChange={handleCheckAll}
          checked={allChecked}
        >
          {label}
        </Checkbox>
      </StyledGroup>
      <Flex wrap gap={8}>
        {options.map((item) => {
          const color = getPermissionTypeColor(item.type);

          return (
            <ConfigProvider
              key={item.value}
              theme={{
                token: {
                  colorPrimary: color,
                  colorText: color,
                  colorBorder: color,
                },
              }}
            >
              <Checkbox
                checked={value.includes(item.value)}
                onChange={() => handleChange(item.value)}
                style={{ width: 150 }}
              >
                {item.label}
              </Checkbox>
            </ConfigProvider>
          );
        })}
      </Flex>
    </StyledContainer>
  );
};

export default PermissionCheckGroup;
