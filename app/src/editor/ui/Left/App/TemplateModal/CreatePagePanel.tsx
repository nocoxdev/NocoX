import { use, useMemo } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import { useApp } from '@/editor/selectors';
import { useMessage } from '@/selectors';
import { PageType } from '@/types';
import { PageTempateContext } from './context';

const StyledContainer = styled.div`
  display: flex;
  margin-top: 43px;
  width: 300px;
  border-top: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  border-left: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  box-shadow: -4px 0px 8px -4px rgba(0, 0, 0, 0.08);
  padding: 12px;
  padding-right: 0px;
  overflow: auto;
  height: 500px;
`;

const StyledDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.colorTextSecondary};
`;

export interface CreatePageFormValues {
  path: string;
  title: string;
  description: string;
}

interface CreatePagePanelProps {
  onOk: () => void;
  onCancel: () => void;
}

const CreatePagePanel = (props: CreatePagePanelProps) => {
  const { onOk, onCancel } = props;
  const theme = useTheme();
  const app = useApp();
  const message = useMessage();

  const { templates, current, parentId } = use(PageTempateContext);

  const parent = useMemo(() => {
    return app.findPage(parentId);
  }, [parentId]);

  const template = useMemo(() => {
    return templates.find((t) => t.id === current);
  }, [current]);

  const handleAddPage = async (values: CreatePageFormValues) => {
    if (!template) {
      message.error(t('Please select a template'));
      return;
    }

    const layouts = app.pages.filter(
      (item) => item.type === PageType.LAYOUT && parent?.id === item.parentId,
    );

    if (template.type === PageType.LAYOUT && layouts?.length) {
      message.error(t('Each group can only have one layout'));
      return;
    }

    const resp = await app?.addPage(
      template.type,
      parent?.id || null,
      values.path,
      values.title,
      values.description,
      JSON.stringify(template?.content),
    );

    if (resp?.success) {
      message.success(t('Add page success'));
      onOk();
    } else {
      message.error(resp?.message);
    }
  };

  return (
    <StyledContainer>
      {template ? (
        <Form
          layout="vertical"
          style={{ width: '100%', padding: '12px 2px' }}
          onFinish={handleAddPage}
          initialValues={{ path: '/' }}
        >
          <Form.Item label={template.title} name="icon">
            <StyledDescription>{template.description}</StyledDescription>
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: t('Please enter the title') }]}
            name="title"
            label={t('Title')}
            required
          >
            <Input size="small" />
          </Form.Item>

          <Form.Item name="path" label={t('Page path')}>
            <Input size="small" />
          </Form.Item>

          <Form.Item name="description" label={t('Page description')}>
            <Input.TextArea size="small" rows={4} />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-end" gap={8}>
              <Button onClick={onCancel} size="small" type="text">
                {t('Cancel')}
              </Button>
              <Button
                type="primary"
                size="small"
                loading={app?.requestStates.addPage.status === 'pending'}
                htmlType="submit"
              >
                {t('Create')}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      ) : (
        <Flex
          align="center"
          justify="center"
          style={{ width: '100%', color: theme.colorTextSecondary }}
        >
          {t('Please select a template')}
        </Flex>
      )}
    </StyledContainer>
  );
};

export default CreatePagePanel;
