import type { Ref } from 'react';
import { useImperativeHandle, useState } from 'react';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import AntdIcon from '@/components/AntdIcon';
import type { WidgetProps } from '@/types';

export interface ButtonViewProps extends Omit<ButtonProps, 'icon'> {
  icon: any;
}

interface ButtonActions {
  startLoading: () => void;
  stopLoading: () => void;
}

const ButtonView = ({
  ref,
  ...props
}: WidgetProps<ButtonViewProps> & { ref: Ref<ButtonActions> }) => {
  const { children, icon, className, ...restProps } = props;

  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    startLoading: () => {
      setLoading(true);
    },
    stopLoading: () => {
      setLoading(false);
    },
  }));

  return (
    <Button
      {...restProps}
      rootClassName={className}
      loading={loading}
      icon={icon && <AntdIcon {...icon} />}
      autoInsertSpace={false}
    >
      {children}
    </Button>
  );
};

export default ButtonView;
