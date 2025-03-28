import { use, useMemo } from 'react';
import type { SelectProps } from 'antd';
import { Flex, Select } from 'antd';
import { t } from 'i18next';
import { useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import { actionGroups } from '@/editor/actions';
import { EventSettingContext } from './EventSettingContext';

const ActionSelector = (props: SelectProps) => {
  const { configs, node } = use(EventSettingContext);
  const theme = useTheme();

  const options = useMemo(() => {
    const filterActionConfigs = configs.filter(
      (config) => !config.hidden || !config.hidden(node),
    );

    return actionGroups.map(({ type, label }) => {
      return {
        label,
        options: filterActionConfigs
          .filter((item) => item.type === type)
          .map((config) => ({
            label: (
              <Flex gap={8}>
                <AntdIcon
                  content={config.icon}
                  size={14}
                  color={theme.colorPrimaryTextActive}
                />
                {config.label}
              </Flex>
            ),
            value: config.name,
          })),
      };
    });
  }, [configs]);

  return (
    <Select
      {...props}
      allowClear
      placeholder={t('Please select action')}
      style={{ width: '100%' }}
      options={options}
    />
  );
};

export default ActionSelector;
