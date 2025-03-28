import { blue, green, red, volcano } from '@ant-design/colors';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';
import { t } from 'i18next';

export const SuccessLabel = (
  label: string = t('Success'),
  color: string = green[4],
) => (
  <Tag color={color} icon={<CheckCircleOutlined />} bordered={false}>
    {label}
  </Tag>
);

export const FailLabel = (
  label: string = t('Failure'),
  color: string = red[4],
) => (
  <Tag color={color} icon={<CloseCircleOutlined />} bordered={false}>
    {label}
  </Tag>
);

export const ValidateFailLabel = (
  label: string = t('Validate failure'),
  color: string = volcano[4],
) => (
  <Tag color={color} icon={<ExclamationCircleOutlined />} bordered={false}>
    {label}
  </Tag>
);
export const ValidateSuccessLabel = (
  label: string = t('Validate success'),
  color: string = blue[4],
) => (
  <Tag color={color} icon={<CheckCircleOutlined />} bordered={false}>
    {label}
  </Tag>
);

export const Label = (label: string, color: string, icon: React.ReactNode) => (
  <Tag color={color} icon={icon} bordered={false}>
    {label}
  </Tag>
);
