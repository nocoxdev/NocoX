import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import DraggablePopover from '@/components/DraggablePopover';
import PlateEditor from '@/components/PlateEditor';

export interface RichTextProps {
  size?: SizeType;
  value?: any;
  onChange: (val: any) => void;
}

const RichText = (props: RichTextProps) => {
  const { value, size, onChange } = props;

  return (
    <DraggablePopover
      title={t('Text editing')}
      placement="leftTop"
      resizable={{
        minHeight: 260,
        minWidth: 520,
        defaultSize: { width: 620, height: 350 },
        enable: {
          top: false,
          right: false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        },
      }}
      arrow={false}
      content={
        <PlateEditor
          value={value}
          onChange={onChange}
          size={size}
          placement="topLeft"
          toolbar={[
            'history',
            'fontSize',
            'bold',
            'italic',
            'underline',
            'align',
            'color',
            'backgroundColor',
            'img',
            'emoji',
          ]}
        />
      }
      trigger="click"
      maskClosable={false}
      childrenStyle={{ width: '100%' }}
    >
      <Button type="primary" icon={<EditOutlined />} size={size} block={true}>
        {t('Edit text')}
      </Button>
    </DraggablePopover>
  );
};

export default RichText;
