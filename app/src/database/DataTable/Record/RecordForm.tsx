import { Fragment } from 'react';
import { Button, Flex, Form } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import { useCurrentSize, useCurrentTable } from '@/database/selectors';
import { configs } from '../configs';
import { ValueColumnComponentContext } from '../context';

interface RecordFormProps {
  initialValues?: Record<string, any>;
  loading: boolean;
  onCancel?: () => void;
  onSave: (values: Record<string, any>) => void;
}

const RecordForm = observer((props: RecordFormProps) => {
  const { initialValues, loading, onSave } = props;

  const table = useCurrentTable();
  const { columnStore } = table;
  const size = useCurrentSize();
  const theme = useTheme();

  return (
    <Form
      layout="vertical"
      initialValues={initialValues}
      colon={false}
      size={size}
      onFinish={onSave}
    >
      {columnStore.columns
        .filter((item) => !item.info.system)
        .map((item) => {
          const config = configs.find((conf) => conf.type === item.uiType);
          if (!config) return <Fragment key={item.id} />;

          const { formComponent: Component, icon: Icon } = config;
          const { columnName: columnName, required, title, id } = item;

          return (
            <ValueColumnComponentContext.Provider
              key={id}
              value={{ column: item.info }}
            >
              <Form.Item
                name={columnName}
                required={required}
                rules={[{ required: required, message: '' }]}
                label={
                  <Flex gap={6} align="center">
                    <Icon size={13} color={theme.colorTextTertiary} />
                    {title}
                  </Flex>
                }
              >
                <Component />
              </Form.Item>
            </ValueColumnComponentContext.Provider>
          );
        })}

      <Form.Item noStyle key="action">
        <Flex justify="flex-end" gap={8}>
          <Button
            color="primary"
            variant="text"
            style={{ width: 60 }}
            htmlType="reset"
          >
            {t('Reset')}
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: 60 }}
            loading={loading}
          >
            {t('Save')}
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
});

export default RecordForm;
