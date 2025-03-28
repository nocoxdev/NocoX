import type { ReactNode } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import { t } from 'i18next';
import Box from '@/components/Box';

export interface ImageUploadViewProps extends UploadProps {
  title?: ReactNode;
}

const ImageUploadView = (props: ImageUploadViewProps) => {
  const { className, style, title = t('Click Upload'), ...restProps } = props;

  return (
    <Box display="inline-block" className={className} style={style}>
      <Upload {...restProps}>
        <Button icon={<UploadOutlined />}>{title}</Button>
      </Upload>
    </Box>
  );
};

export default ImageUploadView;
