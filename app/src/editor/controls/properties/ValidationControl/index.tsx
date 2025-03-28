import { Fragment, useMemo, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { Button, Flex, Select } from 'antd';
import { t } from 'i18next';
import styled from 'styled-components';
import OptionList from '@/components/OptionList';
import type { OptionItemType } from '@/components/OptionList/OptionItem';
import type { ControlProps } from '@/editor/controls/type';
import { useMessage } from '@/selectors';
import { removeByIndex, reorder } from '@/utils/helpers';
import config from './config';
import EditForm from './EditForm';
import type { ValidationValue } from './type';

const StyledValidationsSelect = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export interface ValidationControlProps {}

const ValidationControl = (props: ControlProps<ValidationControlProps>) => {
  const { size, variant } = props;
  const message = useMessage();

  const [validtaions, setValidations] = useControllableValue<ValidationValue[]>(
    props,
    { defaultValue: [] },
  );

  const [currentSelected, setCurrentSelected] = useState();

  const handleChange = (val: ValidationValue) => {
    const value = validtaions.map((item) =>
      item.name === val.name ? val : item,
    );

    setValidations(value);
  };

  const handleAdd = () => {
    if (!currentSelected) {
      message.info(t('Please select a validation type'));
      return;
    }

    const validationConfig = config.find(
      (item) => item.name === currentSelected,
    );

    if (!validationConfig) {
      message.error(t('Validation type not found'));
      return;
    }

    if (
      validationConfig?.fields &&
      validtaions.every((item) => item.name !== currentSelected)
    ) {
      const fieldValues = validationConfig.defaultValue;
      const value = { name: currentSelected, ...fieldValues };
      const newValidations = [...validtaions, value];

      setValidations(newValidations);
    } else {
      message.warning(t('The selected validation type already exists'));
    }
    setCurrentSelected(undefined);
  };
  const options = useMemo(() => {
    return validtaions?.reduce<OptionItemType[]>((acc, cur) => {
      const validationConfig = config.find((item) => item.name === cur.name);
      if (!validationConfig) return acc;

      return [
        ...acc,
        {
          key: cur.name,
          label: validationConfig.label,
          panel: (
            <EditForm
              value={cur}
              onChange={(val) => handleChange({ ...val })}
              fields={validationConfig.fields}
            />
          ),
        },
      ];
    }, []);
  }, [validtaions]);

  return (
    <Flex vertical gap={6} style={{ width: '100%' }}>
      <StyledValidationsSelect>
        <Select
          allowClear
          placeholder={t('Please select a validation type')}
          style={{ width: 'calc(100% - 36px)' }}
          options={config.map((item) => ({
            value: item.name,
            label: item.label,
          }))}
          value={currentSelected}
          onChange={(val) => setCurrentSelected(val)}
          size={size}
          variant={variant}
        />
        <Fragment>
          <Button
            icon={<IconPlus size={12} stroke={1} />}
            onClick={() => handleAdd()}
            size={size}
          />
        </Fragment>
      </StyledValidationsSelect>

      <OptionList
        options={options}
        onReorder={(srcIndex, dstIndex) => {
          const newValidations = reorder(validtaions, srcIndex, dstIndex);
          setValidations(newValidations);
        }}
        size={size}
        onRemove={(index) => {
          const newValidations = removeByIndex(validtaions, index);
          setValidations(newValidations);
        }}
      />
    </Flex>
  );
};

export default ValidationControl;
