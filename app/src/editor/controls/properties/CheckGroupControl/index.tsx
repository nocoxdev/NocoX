import { useMemo } from 'react';
import { Checkbox, Space } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { keys } from 'lodash-es';
import type { ControlProps } from '@/editor/controls/type';

type Option = { value: string; label: string };

export type CheckGroupControlProps = {
  options: Option[];
} & Omit<CheckboxGroupProps, 'options'>;

const CheckGroupControl = (props: ControlProps<CheckGroupControlProps>) => {
  const { controlProps, defaultValue, onChange } = props;

  const { options = [], ...restProps } = controlProps || {};

  const handleChange = (vals: string[]) => {
    const noSelections = options
      .filter((item) => !vals.includes(item.value))
      .reduce((pre: Record<string, boolean>, cur: Option) => {
        return { ...pre, [cur.value]: false };
      }, {});

    const selections = vals.reduce(
      (pre: Record<string, boolean>, cur: string) => {
        return { ...pre, [cur]: true };
      },
      {},
    );

    onChange({ ...noSelections, ...selections });
  };

  const values = useMemo(
    () => keys(defaultValue || {}).filter((key) => defaultValue[key]),
    [defaultValue],
  );

  return (
    <Checkbox.Group
      onChange={(vals) => handleChange(vals.map((val) => val.toString()))}
      defaultValue={values}
      {...restProps}
    >
      <Space wrap size={[8, 8]}>
        {options.map((item) => (
          <Checkbox
            value={item.value}
            key={item.value}
            style={{ minWidth: 80 }}
          >
            {item.label}
          </Checkbox>
        ))}
      </Space>
    </Checkbox.Group>
  );
};

export default CheckGroupControl;
