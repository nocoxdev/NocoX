import type { ModalProps } from 'antd';
import { Button, Flex, Modal, Switch } from 'antd';
import { Form, Input } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import ImageSelect from '@/components/ImageSelect';
import TagInput from '@/components/TagInput';
import { useMessage } from '@/selectors';
import { BlockApi } from '@/services/api';
import { useSelection } from '../../selectors';

const StyledWrapper = styled.div`
  margin-top: 18px;
  .ant-form-item
    .ant-form-item-label
    > label.ant-form-item-required:not(
      .ant-form-item-required-mark-optional
    )::before {
    position: absolute;
    right: 0px;
    font-weight: 600;
  }

  .ant-form {
    > .ant-form-item {
      .ant-upload-select {
        margin-bottom: 0px;
        border: none;
      }
    }
  }
`;

export interface CreateBlockModalProps
  extends Omit<ModalProps, 'title' | 'onCancel'> {
  cover?: string;
  onClose: () => void;
}

const CreateBlockModal = observer((props: CreateBlockModalProps) => {
  const { cover, onOk, onClose, ...modalProps } = props;
  const theme = useTheme();
  const message = useMessage();
  const { node } = useSelection();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const resp = await BlockApi.create({
      ...values,
      content: JSON.stringify(node?.json),
    });

    if (resp.success) {
      message.success(t('Create block success'));
      onClose();
    } else {
      message.error(resp.message);
    }
  };

  const label = node?.widget.label;

  return (
    <Modal
      {...modalProps}
      onOk={onOk}
      onCancel={onClose}
      title={t('Save block')}
      footer={null}
      width={600}
    >
      <StyledWrapper>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          labelAlign="left"
          size="small"
          colon={false}
          form={form}
          initialValues={{ name: label, tags: [label], cover }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label={t('Name')}
            name="name"
            rules={[
              {
                required: true,
                message: t('Please input your block name!'),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('Tags')}
            name="tags"
            rules={[{ required: true, message: t('Please add tags!') }]}
          >
            <TagInput color={theme.colorPrimary} />
          </Form.Item>

          <Form.Item
            label={t('Cover')}
            name="cover"
            rules={[{ required: true, message: t('Please upload cover!') }]}
          >
            <ImageSelect />
          </Form.Item>

          <Form.Item label={t('Is public')} name="isPublic">
            <Switch />
          </Form.Item>

          <Form.Item label={t('Description')} name="description">
            <Input.TextArea rows={3} allowClear />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Flex gap={8} justify="end" flex={1}>
              <Button
                htmlType="reset"
                onClick={() => form.resetFields()}
                style={{ width: 60 }}
              >
                {t('Reset')}
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: 60 }}>
                {t('Save')}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </StyledWrapper>
    </Modal>
  );
});

export default CreateBlockModal;
