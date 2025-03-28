import type { CSSProperties } from 'react';
import { t } from 'i18next';
import Box from '@/components/Box';
import NoWidget from '@/components/NoWidget';
import { hasChildren } from '@/utils/helpers';

export interface ContainerProps {
  width?: number | string;
  height?: number | string;
  description?: string;
  style?: React.CSSProperties;
  className?: string;
}

const ContainerView = (props: React.PropsWithChildren<ContainerProps>) => {
  const { description = t('Drag components here'), children, style } = props;

  const mergeStyle: CSSProperties = {
    ...style,
    width: props.width,
    height: props.height,
  };

  return (
    <Box display="inline-block" className={props.className} style={mergeStyle}>
      {hasChildren(children) ? (
        children
      ) : (
        <NoWidget description={description} />
      )}
    </Box>
  );
};

export default ContainerView;
