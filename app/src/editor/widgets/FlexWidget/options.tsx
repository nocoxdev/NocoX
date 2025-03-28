import type { ReactNode } from 'react';
import type { FlexProps } from 'antd';
import { Flex } from 'antd';
import { t } from 'i18next';
import FlexAlignSample from './FlexAlignSample';
import FlexJustifySample from './FlexJustifySample';

export const justifyOptions: {
  value: FlexProps['justify'];
  label: ReactNode;
}[] = [
  { value: 'start', label: t('Left Align') },
  { value: 'end', label: t('Right Align') },
  { value: 'center', label: t('Center Align') },
  { value: 'space-between', label: t('Space Between') },
  { value: 'space-around', label: t('Space Around') },
].map((item) => ({
  value: item.value,
  label: (
    <Flex gap={6} align="center" style={{ height: 24 }}>
      <FlexJustifySample justify={item.value} />
      <span>{item.label}</span>
    </Flex>
  ),
}));

export const alignOptions: {
  value: FlexProps['align'];
  label: ReactNode;
}[] = [
  { value: 'flex-start', label: t('Top Align') },
  { value: 'center', label: t('Center') },
  { value: 'flex-end', label: t('Bottom Align') },
  { value: 'baseline', label: t('Baseline Align') },
  { value: 'stretch', label: t('Stretch Align') },
].map((item) => ({
  value: item.value,
  label: (
    <Flex gap={6} align="center">
      <FlexAlignSample align={item.value} />
      <span>{item.label}</span>
    </Flex>
  ),
}));
