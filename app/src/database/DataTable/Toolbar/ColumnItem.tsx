import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IconGripVertical } from '@tabler/icons-react';
import { ConfigProvider, Flex, Switch } from 'antd';
import styled, { useTheme } from 'styled-components';
import type { Column } from '@/database/stores';
import { ColumnTitle } from '../components';

const StyledContainer = styled.div`
  display: flex;
  height: ${({ theme }) => theme.controlHeightSM}px;
  align-items: center;
  padding: 0 8px;
  gap: 8px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  justify-content: space-between;
`;

const StyledDragContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 16px;
  cursor: move;
`;

// const StyledColumnName = styled.div`
//   display: flex;
//   color: ${({ theme }) => theme.colorText};
//   gap: 4px;
//   align-items: center;
//   &.system {
//     > svg {
//       path:last-child {
//         stroke: ${({ theme }) => theme.colorPrimary};
//       }
//     }
//   }
// `;

interface ColumnItemProps {
  column: Column;
  onCheck: () => void;
  style?: React.CSSProperties;
}

const ColumnItem = (props: ColumnItemProps) => {
  const { column, onCheck, style } = props;

  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
    setActivatorNodeRef,
  } = useSortable({
    id: column.id,
    animateLayoutChanges: defaultAnimateLayoutChanges,
  });

  const theme = useTheme();

  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : undefined,
    backgroundColor: (isDragging && theme.colorInfoBg) || undefined,
  };

  const draggableProps = {
    ref: (ref: any) => setNodeRef(ref),
    style: {
      ...sortableStyle,
      ...style,
    },
    ...attributes,
  };

  const handleProps = {
    ref: (ref: any) => setActivatorNodeRef(ref),
    ...listeners,
  };

  return (
    <StyledContainer {...draggableProps}>
      <Flex align="center" gap={4}>
        <StyledDragContainer {...handleProps}>
          <IconGripVertical size={12} color={theme.colorTextQuaternary} />
        </StyledDragContainer>

        <ColumnTitle
          title={column.title}
          type={column.uiType}
          iconSize={16}
          system={column.info.system}
          primaryKey={column.info.primaryKey}
        />
      </Flex>

      <ConfigProvider
        theme={{
          components: {
            Switch: {
              handleSizeSM: 8,
              innerMaxMarginSM: 12,
              innerMinMarginSM: 4,
              trackHeightSM: 12,
              trackMinWidthSM: 20,
            },
          },
        }}
      >
        <Switch checked={!column.hidden} onChange={onCheck} size="small" />
      </ConfigProvider>
    </StyledContainer>
  );
};

export default ColumnItem;
