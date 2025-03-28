import type { TooltipProps } from 'antd';
import { Tooltip } from 'antd';
import { t } from 'i18next';
import NoWidget from '@/components/NoWidget';
import { hasChildren } from '@/utils/helpers/hasChildren';

const TooltipView = (props: TooltipProps) => {
  const { children, className, ...restProps } = props;

  return (
    <Tooltip {...restProps} className={className}>
      {hasChildren(children) ? (
        children
      ) : (
        <NoWidget
          className={className}
          description={t('Drag components here')}
          style={{ height: 28, width: 100 }}
        />
      )}
    </Tooltip>
  );
};

export default TooltipView;
