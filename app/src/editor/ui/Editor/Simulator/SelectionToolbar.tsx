import type { CSSProperties } from 'react';
import { useState } from 'react';
import {
  IconCopy,
  IconDotsVertical,
  IconGripVertical,
  IconTrash,
} from '@tabler/icons-react';
import { Input, Popover, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import type { AntdIconType } from '@/components/AntdIcon/type';
import {
  IS_WIDGET_DRAG_HANDLE_CLASS,
  NODE_TOOLBAR_HEIGHT,
} from '@/editor/constants';
import { useCurPage, useSelection } from '../../../selectors';
import SelectionMoreMenu from './SelectionMoreMenu';

const StyledContainer = styled.div`
  display: flex;
  align-items: stretch;
  width: auto;
  height: ${NODE_TOOLBAR_HEIGHT}px;
  position: absolute;
  pointer-events: none;
  z-index: 2;
  box-shadow: 4px 0px 12px 0px #dee7ff82;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 100%;
  padding: 0 6px;
  color: #fff;
  background-color: ${({ theme }) => theme.colorPrimary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  user-select: none;
  margin-right: 2px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 16px;
      height: 16px;
    }
  }
  > span {
    overflow: hidden;
    color: white;
    font-size: 10px;
    white-space: nowrap;
  }
`;

const StyledDragContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  pointer-events: all;
  cursor: grab;
`;

const StyledActionsContainer = styled.div`
  display: flex;
  height: 100%;
  pointer-events: all;
`;

export const StyledActionItem = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 10px;
  justify-content: center;
  width: 20px;
  background-color: ${({ theme }) => theme.colorPrimary};
  cursor: pointer;

  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius}px;
  }

  &:last-child {
    border-top-right-radius: ${({ theme }) => theme.borderRadius}px;
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius}px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colorPrimaryActive};
  }
`;

export type SelectionToolbarProps = {
  label: string;
  icon?: AntdIconType;
  style?: CSSProperties;
};

const SelectionToolbar = observer((props: SelectionToolbarProps) => {
  const { label, style } = props;

  const selection = useSelection();
  const curPage = useCurPage();
  const selectedNode = curPage?.findNode(selection.id);
  const [labelChangeOpen, setLabelChangeOpen] = useState(false);

  if (!selection.id || !selection.rect || !selectedNode || !curPage) {
    return null;
  }

  const handleRemove = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (selection.id) {
      curPage.removeNode(selection.id);
      selection.clear();
    }
  };

  const handleCopy = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (selection.id && curPage) {
      curPage.copyNode(selection.id);
    }
  };

  return (
    <StyledContainer style={style}>
      <StyledTitleWrapper>
        {selectedNode.widget.canDrag && (
          <StyledDragContainer className={IS_WIDGET_DRAG_HANDLE_CLASS}>
            <IconGripVertical size={10} color="white" />
          </StyledDragContainer>
        )}
        <span>{label}</span>
      </StyledTitleWrapper>

      {selectedNode.widget.showToolbar !== false && (
        <StyledActionsContainer>
          {selectedNode.widget.canCopy && (
            <Tooltip title={t('Copy')} color="black" showArrow={true}>
              <StyledActionItem onClick={handleCopy}>
                <IconCopy size={10} color="white" />
              </StyledActionItem>
            </Tooltip>
          )}
          {selectedNode.widget.canDelete && (
            <Tooltip
              title={t('Delete')}
              color="black"
              showArrow={true}
              placement="top"
            >
              <StyledActionItem onClick={handleRemove}>
                <IconTrash size={10} color="white" />
              </StyledActionItem>
            </Tooltip>
          )}

          {selectedNode.widget.showToolbarMore !== false && (
            <SelectionMoreMenu onLabelChangeOpen={setLabelChangeOpen}>
              <Tooltip title={t('More')} showArrow={true} placement="top">
                <StyledActionItem>
                  <IconDotsVertical size={10} color="white" />
                </StyledActionItem>
              </Tooltip>
            </SelectionMoreMenu>
          )}
        </StyledActionsContainer>
      )}
      <Popover
        title={t('Rename node')}
        open={labelChangeOpen}
        onOpenChange={(open) => setLabelChangeOpen(open)}
        placement="rightTop"
        trigger={['click']}
        arrow={{ pointAtCenter: true }}
        content={
          <Input
            size="small"
            placeholder={t('Please input node name')}
            value={selectedNode.label}
            onChange={(e) => selectedNode.changeCustomLabel(e.target.value)}
            onPressEnter={() => setLabelChangeOpen(false)}
            style={{ margin: '12px 0 24px 0', width: 300 }}
          />
        }
      />
    </StyledContainer>
  );
});

export default SelectionToolbar;
