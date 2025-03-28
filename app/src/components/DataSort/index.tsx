import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { IconArrowsSort } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { Button, Flex } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import { t } from 'i18next';
import styled from 'styled-components';
import type { DraggablePopoverProps } from '@/components/DraggablePopover';
import DraggablePopover from '@/components/DraggablePopover';
import type { IDataField } from '@/types';
import { configs } from './config';
import { DataSortContext } from './DataSortContext';
import Panel from './Panel';
import type { ISortItem } from './type';

const StyledButton = styled(Button)<{ $bg?: string }>`
  background-color: ${({ theme, $bg }) => $bg || theme.colorFillTertiary};
  color: ${({ theme }) => theme.colorTextSecondary};
  &.active {
    background: ${({ theme }) => theme.colorPrimaryBg};

    &:hover {
      background: ${({ theme }) => theme.colorPrimary}22 !important;
    }

    color: ${({ theme }) => theme.colorPrimary} !important;
  }
`;

export interface DataSortProps extends Omit<DraggablePopoverProps, 'content'> {
  size?: SizeType;
  fields?: IDataField[];
  value?: ISortItem[];
  defaultValue?: ISortItem[];
  maskClosable?: boolean;
  style?: CSSProperties;
  bg?: string;
  className?: string;
  onChange?: (sorts: ISortItem[]) => void;
}

const DataSort = (props: DataSortProps) => {
  const {
    size,
    fields = [],
    maskClosable = false,
    style,
    bg,
    className,
    ...rest
  } = props;
  const [sorts, setSorts] = useControllableValue<ISortItem[]>(props, {
    defaultValue: [],
  });
  const [open, setOpen] = useState(false);

  const contextValue = useMemo(
    () => ({ size, fields, configs }),
    [size, fields],
  );

  return (
    <DataSortContext.Provider value={contextValue}>
      <DraggablePopover
        content={
          <Panel
            defaultSorts={sorts}
            onChange={(sorts) => {
              setSorts(sorts);
              setOpen(false);
            }}
          />
        }
        placement="bottomLeft"
        title="Sort by"
        maskClosable={maskClosable}
        trigger="click"
        onOpenChange={setOpen}
        open={open}
        destroyTooltipOnHide
        arrow={false}
        {...rest}
      >
        <StyledButton
          size={size}
          type="text"
          onClick={() => setOpen(!open)}
          className={classNames(
            { active: sorts && sorts.length > 0 },
            className,
          )}
          style={style}
          $bg={bg}
        >
          <Flex gap={4} align="center">
            <IconArrowsSort stroke={2} size={14} />
            <span>
              {t('Sort')}
              {sorts && sorts.length > 0 && `(${sorts.length})`}
            </span>
          </Flex>
        </StyledButton>
      </DraggablePopover>
    </DataSortContext.Provider>
  );
};

export default DataSort;
