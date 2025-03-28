import { Checkbox, Space } from 'antd';
import type { ControlProps } from '@/editor/controls/type';

type Option = { value: string | number; label: string };

export interface CheckControlProps {
  options: Option[];
}

const CheckControl = (props: ControlProps<CheckControlProps>) => {
  const { controlProps, defaultValue, onChange } = props;
  const { options = [], ...restProps } = controlProps || {};

  return (
    <Checkbox.Group
      {...restProps}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      <Space wrap>
        {options.map((item) => (
          <Checkbox value={item.value} key={item.value}>
            {item.label}
          </Checkbox>
        ))}
      </Space>
    </Checkbox.Group>
  );
};

export default CheckControl;
