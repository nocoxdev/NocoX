import { useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useControllableValue } from 'ahooks';
import { Button, Flex } from 'antd';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import OptionList from '@/components/OptionList';
import type { OptionItemType } from '@/components/OptionList/OptionItem';
import type { ValueLabel } from '@/types';
import { generateNewLabel, reorder } from '@/utils/helpers';
import EditBox from './EditBox';

interface CustomOptionsProps {
  defaultValue?: ValueLabel<any>[];
  value?: ValueLabel<any>[];
  size?: SizeType;
  variant?: Variant;
  onChange: (value: ValueLabel<any>[]) => void;
}

const CustomOptions = (props: CustomOptionsProps) => {
  const [value, setValue] = useControllableValue<ValueLabel<any>[]>(props);
  const { size, variant } = props;

  const handleSortComplete = (startIndex: number, endIndex: number) => {
    setValue(reorder(value, startIndex, endIndex));
  };

  const handleAdd = () => {
    setValue((pre) => {
      const newLabel = generateNewLabel(
        t('Option'),
        pre.map((item) => item.label),
      );

      return [...pre, { label: newLabel, value: newLabel }];
    });
  };

  const handleRemove = (index: number) =>
    setValue((pre) => pre.filter((_, _index) => index !== _index));

  const handleOptionChange = (val: ValueLabel<any>, index: number) => {
    setValue((pre) =>
      pre.map((item, curIndex) => (curIndex === index ? val : item)),
    );
  };

  const items = useMemo(
    () =>
      value.map<OptionItemType>((option, index) => ({
        key: option.value.toString(),
        label: option.label,
        panel: (
          <EditBox
            onChange={(val) => handleOptionChange(val, index)}
            value={option}
            size={size}
            variant={variant}
          />
        ),
      })),
    [value, size, variant],
  );

  return (
    <Flex vertical gap={6} flex={1}>
      <OptionList
        onReorder={handleSortComplete}
        onRemove={handleRemove}
        options={items}
        size={size}
        style={{ gap: 4 }}
        // optionStyle={(dragging) =>
        //   dragging
        //     ? {
        //         backgroundColor: theme.colorPrimaryBgHover,
        //         border: 'none',
        //       }
        //     : { backgroundColor: theme.colorFillTertiary, border: 'none' }
        // }
      />

      <Button
        icon={<PlusOutlined />}
        size={size}
        style={{ width: '100%', height: 28 }}
        color="default"
        variant="dashed"
        onClick={() => handleAdd()}
      >
        {t('New option')}
      </Button>
    </Flex>
  );
};

export default CustomOptions;
