import { Fragment } from 'react';
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
} from '@tabler/icons-react';
import type { RadioButtonProps } from './RadioButton';
import RadioButton from './RadioButton';
import type { RadioType } from './type';

const radios: RadioType[] = [
  { alignment: 'left', icon: IconAlignLeft },
  { alignment: 'center', icon: IconAlignCenter },
  { alignment: 'right', icon: IconAlignRight },
];

export type RadioGroupProps = Omit<RadioButtonProps, 'item'>;

const RadioGroup = (props: RadioGroupProps) => {
  return (
    <Fragment>
      {radios.map((item) => (
        <RadioButton item={item} {...props} key={item.alignment} />
      ))}
    </Fragment>
  );
};

export default RadioGroup;
