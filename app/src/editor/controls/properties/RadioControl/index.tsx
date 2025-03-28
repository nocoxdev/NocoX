import { useControllableValue } from 'ahooks';
import type { RadioGroupProps } from 'antd';
import { Radio } from 'antd';
import type { ControlProps } from '@/editor/controls/type';

export type Item = { value: string | number; label: string };

export interface RadioControlProps extends Omit<RadioGroupProps, 'options'> {
  options: Item[];
}

const RadioControl = (props: ControlProps<RadioControlProps>) => {
  const { controlProps, size } = props;

  const { options = [], optionType, ...restProps } = controlProps || {};
  const [value, setValue] = useControllableValue(props);

  return (
    <Radio.Group
      {...restProps}
      optionType={optionType}
      value={value}
      onChange={(e) => {
        setValue?.(e.target.value);
      }}
      size={size}
    >
      {options.map((item) => {
        const Component = optionType === 'button' ? Radio.Button : Radio;
        return (
          <Component
            key={item.value}
            value={item.value}
            onClick={() => setValue(undefined)}
          >
            {item.label}
          </Component>
        );
      })}
    </Radio.Group>
  );
};

export default RadioControl;
