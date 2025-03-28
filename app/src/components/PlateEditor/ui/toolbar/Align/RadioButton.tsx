import type { Alignment } from '@udecode/plate-alignment';
import classNames from 'classnames';
import AntdIcon from '@/components/AntdIcon';
import CommonButton from '../CommonButton';
import type { RadioType } from './type';

export interface RadioButtonProps {
  value: Alignment;
  onValueChange: (newValue: string) => void;
  item: RadioType;
}

const RadioButton = (props: RadioButtonProps) => {
  const { value, onValueChange, item } = props;

  return (
    <CommonButton
      className={classNames({ active: value === item.alignment })}
      onClick={() => onValueChange(item.alignment)}
    >
      <AntdIcon content={item.icon} />
    </CommonButton>
  );
};

export default RadioButton;
