import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { IconFilter } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { Button, Flex } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import { t } from 'i18next';
import styled from 'styled-components';
import type { DraggablePopoverProps } from '@/components/DraggablePopover';
import DraggablePopover from '@/components/DraggablePopover';
import type { IDataField, IDataFieldGroup } from '@/types';
import { DataFilterContext } from './DataFilterContext';
import Panel from './Panel';
import { FilterConjunction, type IFilterInfo } from './type';

const StyledButton = styled(Button)<{ $bg?: string }>`
  background-color: ${({ theme, $bg }) => $bg || theme.colorFillTertiary};
  color: ${({ theme }) => theme.colorTextSecondary};
  &.active {
    background: ${({ theme }) => theme.colorPrimaryBg};
    color: ${({ theme }) => theme.colorPrimary} !important;
    &:hover {
      background: ${({ theme }) => theme.colorPrimary}22 !important;
    }
  }
`;

export interface DataFilterProps
  extends Omit<DraggablePopoverProps, 'content'> {
  fields?: (IDataField | IDataFieldGroup)[];
  size?: SizeType;
  value?: IFilterInfo;
  defaultValue?: IFilterInfo[];
  maskClosable?: boolean;
  style?: CSSProperties;
  bg?: string;
  className?: string;
  onChange?: (queries: IFilterInfo) => void;
}

const DataFilter = (props: DataFilterProps) => {
  const {
    size,
    fields = [],
    maskClosable = false,
    style,
    bg,
    className,
    ...rest
  } = props;
  const [filter, setFilter] = useControllableValue<IFilterInfo>(props, {
    defaultValue: {
      conditions: [],
      conjunction: FilterConjunction.And,
    },
  });
  const [open, setOpen] = useState(false);

  const contextValue = useMemo(
    () => ({
      size,
      fields,
    }),
    [size, fields],
  );

  const handleChange = (info: IFilterInfo) => {
    setFilter(info);
    setOpen(false);
  };

  return (
    <DataFilterContext.Provider value={contextValue}>
      <DraggablePopover
        content={<Panel defaultFilter={filter} onFilter={handleChange} />}
        placement="bottomLeft"
        title="Filter"
        maskClosable={maskClosable}
        trigger="click"
        arrow={false}
        open={open}
        onOpenChange={setOpen}
        {...rest}
      >
        <StyledButton
          size={size}
          type="text"
          onClick={() => setOpen(!open)}
          className={classNames(
            { active: filter && filter.conditions.length > 0 },
            className,
          )}
          $bg={bg}
          style={style}
        >
          <Flex gap={4} align="center">
            <IconFilter stroke={2} size={14} />
            <span>
              {t('Filter')}
              {filter &&
                filter.conditions.length > 0 &&
                `(${filter.conditions.length})`}
            </span>
          </Flex>
        </StyledButton>
      </DraggablePopover>
    </DataFilterContext.Provider>
  );
};

export default DataFilter;
