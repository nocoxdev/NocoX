import { ProForm, ProFormDependency } from '@ant-design/pro-components';
import { Button, Checkbox, Flex, Form, Input, Select } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import { useCurrentSize, useStore } from '@/database/selectors';
import { UiType } from '@/types';
import { getSystemColumnName } from '../../utils';
import TypeSelect from './TypeSelect';

const StyledContainer = styled.div`
  margin-top: 6px;
  width: 280px;
  max-height: 600px;
  overflow: scroll;
  margin-right: 1px;
  padding-inline: 20px;
`;

export interface ColumnFormValuesType {
  columnName: string;
  title: string;
  uiType: UiType;
  relatedTableId?: string | null;
  relatedTableDisplayColumnId?: string | null;
  required: boolean;
  description: string;
}

interface ColumnFormProps {
  initialValues?: ColumnFormValuesType;
  submiting: boolean;
  onFinish: (value: ColumnFormValuesType) => void;
}

const ColumnForm = observer((props: ColumnFormProps) => {
  const { initialValues, submiting, onFinish } = props;
  const size = useCurrentSize();
  const store = useStore();
  const [form] = Form.useForm();

  const rules = [{ required: true, message: '' }];
  return (
    <StyledContainer>
      <ProForm
        layout="vertical"
        onFinish={onFinish}
        size={size}
        initialValues={initialValues}
        submitter={false}
        form={form}
      >
        <ProFormDependency name={['uiType']}>
          {({ uiType }) => {
            const systemName = getSystemColumnName(uiType);
            systemName && form.setFieldValue('columnName', systemName);

            return (
              <Form.Item
                name="columnName"
                label={t('Column name')}
                initialValue={systemName}
                rules={[
                  {
                    required: true,
                    message: t(
                      'Only a-z,A-Z,_ are allowed and it must start with lowercase',
                    ),
                    pattern: /^[a-z][a-zA-Z0-9_]*$/,
                  },
                ]}
              >
                <Input readOnly={!!systemName} />
              </Form.Item>
            );
          }}
        </ProFormDependency>

        <Form.Item name="title" label={t('Title')} rules={rules}>
          <Input />
        </Form.Item>

        <Form.Item name="uiType" label={t('Select type')} rules={rules}>
          <TypeSelect style={{ width: '100%' }} />
        </Form.Item>
        <ProFormDependency name={['uiType']}>
          {({ uiType }) =>
            uiType === UiType.Relation && (
              <>
                <Form.Item
                  name={['relation', 'tableId']}
                  label={t('Select related table')}
                  rules={rules}
                >
                  <Select
                    options={store.tables.map((item) => ({
                      value: item.id,
                      label: item.title,
                    }))}
                  />
                </Form.Item>

                <ProFormDependency name={[['relation', 'tableId']]}>
                  {({ relation: { tableId } }) => {
                    const selectedTable = store.tables.find(
                      (item) => item.id === tableId,
                    );

                    const options = selectedTable?.columnStore.columns
                      .filter((item) => item.uiType !== UiType.Relation)
                      .map((item) => ({
                        value: item.id,
                        label: item.title,
                      }));

                    return (
                      <Form.Item
                        name={['relation', 'displayColumnId']}
                        label={t('Select display column')}
                        rules={rules}
                      >
                        <Select options={options} />
                      </Form.Item>
                    );
                  }}
                </ProFormDependency>
              </>
            )
          }
        </ProFormDependency>

        <Form.Item
          name="required"
          label={t('Required')}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item name="description" label={t('Description')}>
          <Input.TextArea
            rows={3}
            placeholder={t('Please enter description')}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 8 }}>
          <Flex gap={8} justify="flex-end">
            <Button type="text" style={{ width: 60 }} htmlType="reset">
              {t('Reset')}
            </Button>
            <Button
              type="primary"
              style={{ width: 60 }}
              htmlType="submit"
              loading={submiting}
            >
              {t('Save')}
            </Button>
          </Flex>
        </Form.Item>
      </ProForm>
    </StyledContainer>
  );
});

export default ColumnForm;
