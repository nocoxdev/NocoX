import type { Ref } from 'react';
import { use, useImperativeHandle, useMemo, useState } from 'react';
import { useAsyncEffect, useRequest } from 'ahooks';
import type { FormProps } from 'antd';
import { Empty, Flex, Form, Skeleton } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import NoWidget from '@/components/NoWidget';
import { NodeContext } from '@/editor/context';
import { useCollectStates, useFormDataId } from '@/editor/hooks';
import { useAppRunningMode } from '@/editor/selectors';
import { AppDataApi } from '@/services/api';
import { type BaseWidgetProps, type WidgetActionCallbackFn } from '@/types';
import { hasChildren } from '@/utils/helpers';
import { FormContext } from './context';

const StyledForm = styled(Form)<{ $fieldsGutter: number }>`
  width: 100%;
  .ant-form-item {
    margin-bottom: ${({ $fieldsGutter }) => $fieldsGutter}px;
  }
`;

export interface FormViewProps extends FormProps {
  type: 'edit' | 'create';
  fieldsGutter?: number;
  children?: React.ReactNode | React.ReactNode[];
  ref: Ref<FormActions>;
}

interface FormActions {
  submit: (callback: WidgetActionCallbackFn) => void;
  validate: () => void;
  reset: () => void;
}

const FormView = ({ ref, ...props }: FormViewProps & BaseWidgetProps) => {
  const { type, fieldsGutter = 16, children, className, ...restProps } = props;
  const [form] = Form.useForm();
  const [record, setRecord] = useState<Record<string, any>>();
  const [initialValues, setInitialValues] = useState<Record<string, any>>();

  const mode = useAppRunningMode();
  const { node } = use(NodeContext);

  const formDataId = useFormDataId();

  const { loading, runAsync } = useRequest(AppDataApi.getById, {
    manual: true,
  });

  const tableId = useMemo(() => {
    const bindDataTableId = node?.props.record['dataTable'];
    return bindDataTableId;
  }, [node?.props.record['dataTable']]);

  const fields = useMemo(() => {
    const table = node.app.tableStore.tables.find((t) => t.id === tableId);

    return table?.columnStore.columns;
  }, [node.app.tableStore.tables.map((item) => item.columnStore.columns)]);

  useCollectStates(
    {
      name: 'Fields',
      title: t('Fields'),
      items:
        fields?.map((item) => ({
          name: item.columnName,
          value: record?.[item.columnName],
          title: item.title,
          valueType: item.uiType,
        })) || [],
    },
    [record, fields],
  );

  const handleSubmit = (callback: WidgetActionCallbackFn) => {
    form
      .validateFields()
      .then((values) => {
        callback?.({ values });
      })
      .catch(({ errorFields }) => {
        callback?.({
          error: errorFields.map(
            (field: any) => `${field.name[0]}: ${field.errors[0]}`,
          ),
        });
      });
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
    validate: form.validateFields,
    reset: form.resetFields,
  }));

  useAsyncEffect(async () => {
    if (type === 'create' || !formDataId) {
      return;
    }
    const resp = await runAsync(tableId, formDataId);
    if (resp?.success) {
      setInitialValues(resp.data?.data);
    }
  }, [formDataId]);

  const contextValue = useMemo(
    () => ({
      record: record || {},
    }),
    [record],
  );

  return type === 'edit' && !formDataId && mode !== 'edit' ? (
    <Flex
      justify="center"
      align="center"
      style={{ height: '100%', width: '100%' }}
    >
      <Empty description={t('Please select data first')} />
    </Flex>
  ) : (
    <FormContext.Provider value={contextValue}>
      <Skeleton active loading={loading}>
        <StyledForm
          {...restProps}
          $fieldsGutter={fieldsGutter}
          form={form}
          rootClassName={className}
          onValuesChange={(changedValues) => {
            setRecord((prev) => ({ ...prev, ...changedValues }));
          }}
          initialValues={initialValues}
        >
          {hasChildren(children) ? (
            children
          ) : (
            <NoWidget
              height={60}
              width="100%"
              description={t('Drag form fields here')}
            />
          )}
        </StyledForm>
      </Skeleton>
    </FormContext.Provider>
  );
};
export default FormView;
