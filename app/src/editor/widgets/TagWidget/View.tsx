import type { TagProps } from 'antd';
import { Tag } from 'antd';
import { t } from 'i18next';
import NoWidget from '@/components/NoWidget';
import { hasChildren } from '@/utils/helpers';

export type TagWidgetProps = TagProps & {
  children?: React.ReactNode | undefined;
};

const TagView = (props: TagWidgetProps) => {
  const { className, children, style, ...restProps } = props;

  return (
    <Tag
      {...restProps}
      rootClassName={className}
      onClose={(e) => e.preventDefault()}
      style={{ ...style, marginInlineEnd: 0, userSelect: 'none' }}
    >
      {hasChildren(children) ? (
        children
      ) : (
        <NoWidget height={28} description={t('Drag components here')} />
      )}
    </Tag>
  );
};

export default TagView;
