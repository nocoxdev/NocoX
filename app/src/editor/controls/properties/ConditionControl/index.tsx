import { useMemo, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { Flex } from 'antd';
import { Button } from 'antd';
import { t } from 'i18next';
import { DataFilterContext } from '@/components/DataFilter/DataFilterContext';
import Panel from '@/components/DataFilter/Panel';
import type { IFilterInfo } from '@/components/DataFilter/type';
import { FilterConjunction } from '@/components/DataFilter/type';
import DraggablePopover from '@/components/DraggablePopover';
import type { ControlProps } from '@/editor/controls/type';
import type { IDataField } from '@/types';

interface ConditionControlProps {
  fields?: IDataField[];
}

const ConditionControl = (props: ControlProps<ConditionControlProps>) => {
  const { controlProps = {}, size, variant } = props;
  const { fields = [], ...rest } = controlProps;
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
      variant,
      fields,
    }),
    [size, variant, fields],
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
        title=""
        maskClosable={false}
        trigger="click"
        arrow={false}
        open={open}
        onOpenChange={setOpen}
        {...rest}
      >
        <Button type="primary" onClick={() => setOpen(!open)} block size={size}>
          <Flex gap={4} align="center">
            <IconPlus stroke={2} size={14} />
            <span>
              {t('Add condition')}
              {filter &&
                filter.conditions.length > 0 &&
                `(${filter.conditions.length})`}
            </span>
          </Flex>
        </Button>
      </DraggablePopover>
    </DataFilterContext.Provider>
  );
};

export default ConditionControl;
