import { Form } from 'antd';
import { t } from 'i18next';
import NoWidget from '@/components/NoWidget';
import { hasChildren } from '@/utils/helpers';

export interface BodyCellDataItemWidgetProps {
  fieldName?: string;
  children?: React.ReactNode | undefined;
  style?: React.CSSProperties;
  className?: string;
}

const BodyCellDataItemView = (props: BodyCellDataItemWidgetProps) => {
  const { fieldName, children, style, className } = props;

  return (
    <div className={className} style={style}>
      <Form.Item name={fieldName} noStyle>
        {hasChildren(children) ? (
          children
        ) : (
          <NoWidget
            height={28}
            width={200}
            description={t('Drag the data component here')}
          />
        )}
      </Form.Item>
    </div>
  );
};

export default BodyCellDataItemView;
