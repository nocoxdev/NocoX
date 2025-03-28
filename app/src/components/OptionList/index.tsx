import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { styled } from 'styled-components';
import Sortable from '@/components/Sortable';
import type { SortableItemType } from '../Sortable/types';
import type { OptionItemType } from './OptionItem';
import OptionItem from './OptionItem';

const StyledListContainer = styled.div`
  display: flex;
  width: 100%;
`;

export interface OptionListProps {
  options: OptionItemType[];
  size?: SizeType;
  onReorder?: (srcIndex: number, dstIndex: number) => void;
  onRemove?: (index: number) => void;
  style?: React.CSSProperties;
  optionStyle?: SortableItemType['style'];
}

const OptionList = (props: OptionListProps) => {
  const { options, size, style, optionStyle, onReorder, onRemove } = props;
  const handleDragEnd = (startIndex: number, endIndex: number) => {
    onReorder?.(startIndex, endIndex);
  };

  return (
    <StyledListContainer>
      <Sortable
        size={size}
        onSortComplete={handleDragEnd}
        onRemove={onRemove}
        items={options.map((option) => ({
          id: option.key,
          content: <OptionItem size={size} option={option} />,
          handle: true,
          remove: true,
          style: optionStyle,
        }))}
        style={style}
      />
    </StyledListContainer>
  );
};

export default OptionList;
