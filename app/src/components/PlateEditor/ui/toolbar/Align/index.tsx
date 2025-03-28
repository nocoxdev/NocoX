import {
  useAlignDropdownMenu,
  useAlignDropdownMenuState,
} from '@udecode/plate-alignment/react';
import RadioGroup from './RadioGroup';

const AlignButtonGroup = () => {
  const state = useAlignDropdownMenuState();
  const { radioGroupProps } = useAlignDropdownMenu(state);

  return <RadioGroup {...radioGroupProps} />;
};

export default AlignButtonGroup;
