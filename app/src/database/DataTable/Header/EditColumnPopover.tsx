import { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import DraggablePopover from '@/components/DraggablePopover';
import { useCurrentTable } from '@/database/selectors';
import type { ColumnFormValuesType } from './ColumnForm';
import ColumnForm from './ColumnForm';

interface EditColumnPopoverProps {
  open: boolean;
  initialValues?: ColumnFormValuesType;
  children?: React.ReactNode;
  onClose: () => void;
  onSubmit: (value: ColumnFormValuesType) => void;
}

const EditColumnPopover = observer((props: EditColumnPopoverProps) => {
  const { open, initialValues, children, onClose, onSubmit } = props;
  const table = useCurrentTable();

  return (
    <DraggablePopover
      destroyTooltipOnHide
      title="Edit column"
      open={open}
      trigger={['click']}
      arrow={false}
      placement="bottomLeft"
      content={
        <ColumnForm
          initialValues={initialValues}
          submiting={
            table.columnStore.requestStates.update.status === 'pending'
          }
          onFinish={onSubmit}
        />
      }
      contentStyle={{ paddingBottom: 12, paddingInline: 0 }}
      onOpenChange={(val) => !val && onClose()}
    >
      <Fragment>{children}</Fragment>
    </DraggablePopover>
  );
});

export default EditColumnPopover;
