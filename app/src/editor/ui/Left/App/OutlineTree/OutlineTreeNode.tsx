import { useMemo, useState } from 'react';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  IconAlertCircle,
  IconDotsVertical,
  IconEye,
  IconEyeClosed,
  IconPointFilled,
} from '@tabler/icons-react';
import { Flex, Input, Popover, Tooltip } from 'antd';
import { t } from 'i18next';
import { isFunction } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import type { ActionMenusType } from '@/components/ActionMenu';
import ActionMenu from '@/components/ActionMenu';
import AntdIcon from '@/components/AntdIcon';
import { useCurPage, useSelection } from '@/editor/selectors';
import type { PageNode } from '@/editor/stores';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px dashed transparent;
  box-sizing: border-box;
  width: 100%;

  &.dropping {
    border-color: ${({ theme }) => theme.colorPrimary};
    border-radius: ${({ theme }) => theme.borderRadius}px;
    transition: all 0.2s;
  }

  &.dropping.notAllow {
    border-color: transparent;
  }
`;

const StyledLabelContainer = styled.div<{ $level: number }>`
  display: flex;
  gap: 4px;
  align-items: center;
  flex: 1;
  overflow: hidden;
`;

const StyledLabel = styled.div`
  display: inline-block;
  overflow: hidden;
  font-size: ${({ theme }) => Math.max(12, theme.fontSize - 1)}px;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
`;

const StyledActions = styled.div`
  display: none;
  align-items: center;

  ${StyledWrapper}:hover & {
    display: flex;
  }
`;

const StyledAction = styled.div`
  display: flex;
  width: 20px;
  font-weight: 600;
  font-size: 13px;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colorTextTertiary};

  &:hover {
    color: ${({ theme }) => theme.colorText};
  }
`;

export interface OutlineTreeNodeProps {
  node: PageNode;
  level: number;
}

const OutlineTreeNode = observer((props: OutlineTreeNodeProps) => {
  const { node, level } = props;
  const [moreActionOpen, setMoreActionOpen] = useState(false);
  const [changeLabelOpen, setChangeLabelOpen] = useState(false);
  const curPage = useCurPage();
  const selection = useSelection();
  const theme = useTheme();

  const selected = useMemo(
    () => selection.id === node.id,
    [node.id, selection.id],
  );

  if (!node || !curPage) return null;

  const moreMenus: ActionMenusType = [
    {
      icon: <EditOutlined />,
      title: t('Rename'),
      onClick: () => {
        setMoreActionOpen(false);
        setChangeLabelOpen(true);
      },
    },
    {
      icon: <CopyOutlined />,
      title: t('Copy'),
      visible: !(node.widget.canDelete === false),
      onClick: () => {
        curPage.copyNode(node.id);
        setMoreActionOpen(false);
      },
    },
    {
      icon: <DeleteOutlined />,
      title: t('Delete'),
      className: 'danger',
      visible: !(node.widget.canDelete === false),
      onClick: () => {
        curPage.removeNode(node.id);
        selection.clear();
        setMoreActionOpen(false);
      },
    },
  ];

  const color = useMemo(() => {
    return node.ancestorsIsHidden || !node.visible
      ? theme.colorTextDisabled
      : (isFunction(node.widget.color)
          ? node.widget.color(theme)
          : node.widget.color) ||
          (selected ? theme.colorPrimaryTextActive : theme.colorText);
  }, [node.visible, node.widget, selected, theme, node.ancestorsIsHidden]);

  return (
    <StyledWrapper onClick={() => selection.select(node.id)}>
      <StyledLabelContainer $level={level}>
        {node.errors.length > 0 && (
          <Tooltip
            color={theme.colorError}
            placement="topLeft"
            arrow={{ pointAtCenter: true }}
            title={
              <Flex vertical>
                {node.errors.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </Flex>
            }
          >
            <Flex>
              <IconAlertCircle
                size={14}
                color={
                  node.ancestorsIsHidden || !node.visible
                    ? theme.colorTextDisabled
                    : theme.colorErrorText
                }
              />
            </Flex>
          </Tooltip>
        )}
        <AntdIcon
          content={node.widget.icon}
          size={14}
          stroke={selected ? 1.5 : 1}
          color={color}
        />
        <StyledLabel
          style={{
            color,
          }}
        >
          {node.label}
        </StyledLabel>
      </StyledLabelContainer>

      <StyledActions>
        <StyledAction
          onClick={(e) => {
            e.stopPropagation();
            if (!node.ancestorsIsHidden) {
              curPage.toggleNodeVisble(node.id);
            }
          }}
        >
          {node.ancestorsIsHidden ? (
            <IconPointFilled size={13} color={theme.colorTextDisabled} />
          ) : node.visible ? (
            <IconEye size={13} />
          ) : (
            <IconEyeClosed size={13} />
          )}
        </StyledAction>

        <ActionMenu
          items={moreMenus}
          open={moreActionOpen}
          onOpenChange={(val) => setMoreActionOpen(val)}
        >
          <StyledAction
            onClick={(e) => {
              e.stopPropagation();
              setMoreActionOpen(true);
            }}
          >
            <IconDotsVertical size={13} />
          </StyledAction>
        </ActionMenu>
      </StyledActions>

      <Popover
        title={t('Rename node')}
        open={changeLabelOpen}
        onOpenChange={(open) => setChangeLabelOpen(open)}
        placement="rightTop"
        trigger={['click']}
        arrow={{ pointAtCenter: true }}
        content={
          <Input
            size="small"
            placeholder={t('Please enter the node name')}
            value={node.label}
            onChange={(e) => node.changeCustomLabel(e.target.value)}
            onPressEnter={() => setChangeLabelOpen(false)}
            style={{ margin: '12px 0 24px 0', width: 300 }}
          />
        }
      />
    </StyledWrapper>
  );
});

export default OutlineTreeNode;
