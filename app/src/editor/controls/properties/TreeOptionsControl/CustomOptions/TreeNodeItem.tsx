import { useState } from 'react';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { Tooltip } from 'antd';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import styled from 'styled-components';
import { StyledIconButton } from '@/components/common.styled';
import DraggablePopover from '@/components/DraggablePopover';
import type { TreeOptionsValueType } from '../type';
import EditBox from './EditBox';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
`;

const StyledLabel = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledPopoverWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 0px;
  height: 0px;
`;

const StyledActions = styled.div`
  display: none;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  flex-shrink: 0;
  transition: all 0.2s;

  ${StyledContainer}:hover & {
    display: flex;
  }
`;

interface TreeNodeItemProps {
  size?: SizeType;
  variant?: Variant;
  option: TreeOptionsValueType;
  onEdit: (option: TreeOptionsValueType) => void;
  onAdd: (parentKey: string, option: TreeOptionsValueType) => void;
  onDelete: (key: string) => void;
}

const TreeNodeItem = (props: TreeNodeItemProps) => {
  const { option, onEdit, onAdd, onDelete, size, variant } = props;
  const [open, setOpen] = useState(false);

  const handleOptionChange = (val: TreeOptionsValueType) => {
    onEdit?.(val);
  };

  return (
    <StyledContainer>
      <StyledPopoverWrapper>
        <DraggablePopover
          title={t('Edit')}
          content={
            <EditBox
              onChange={(val) => handleOptionChange(val)}
              value={option}
              size={size}
              variant={variant}
            />
          }
          open={open}
          onOpenChange={(val) => setOpen(val)}
          trigger="click"
          arrow={false}
        />
      </StyledPopoverWrapper>
      <StyledLabel>{option.label}</StyledLabel>
      <StyledActions>
        <Tooltip title={t('Edit')}>
          <StyledIconButton $size={16} onClick={() => setOpen(true)}>
            <IconPencil size={12} />
          </StyledIconButton>
        </Tooltip>
        <Tooltip title={t('Add child data')}>
          <StyledIconButton
            $size={16}
            onClick={() =>
              onAdd(option.value, {
                label: '',
                value: '',
                children: [],
              })
            }
          >
            <IconPlus size={12} />
          </StyledIconButton>
        </Tooltip>
        <Tooltip title={t('Delete')}>
          <StyledIconButton
            $danger
            $size={16}
            onClick={() => onDelete(option.value)}
          >
            <IconTrash size={12} />
          </StyledIconButton>
        </Tooltip>
      </StyledActions>
    </StyledContainer>
  );
};

export default TreeNodeItem;
