import { observer } from 'mobx-react-lite';
import type { DraggablePopoverProps } from '@/components/DraggablePopover';
import DraggablePopover from '@/components/DraggablePopover';
import { useCurrentTable } from '@/database/selectors';
import type { ColumnFormValuesType } from './ColumnForm';
import ColumnForm from './ColumnForm';

interface AddColumnPopoverProps extends DraggablePopoverProps {
  onSubmit: (value: ColumnFormValuesType) => void;
}

const AddColumnPopover = observer((props: AddColumnPopoverProps) => {
  const { onSubmit, ...restProps } = props;

  const table = useCurrentTable();

  return (
    <DraggablePopover
      title="Add Column"
      trigger={['click']}
      arrow={false}
      destroyTooltipOnHide
      placement="bottom"
      contentStyle={{ paddingBottom: 12, paddingInline: 0 }}
      {...restProps}
      content={
        <ColumnForm
          submiting={table.columnStore.requestStates.add.status === 'pending'}
          onFinish={onSubmit}
        />
      }
    />
  );
});

export default AddColumnPopover;
