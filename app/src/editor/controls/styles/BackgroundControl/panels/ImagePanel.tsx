import { IconBoxMargin, IconRepeat } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { Space } from 'antd';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import AntdIcon from '@/components/AntdIcon';
import Select from '@/components/Select';

export interface BackgroundImageValueType {
  backgroundImage?: string;
  backgroundRepeat?: string;
  backgroundSize?: string;
}

export type ImagePanelProps = {
  onChange: (result: BackgroundImageValueType) => void;
  defaultValue?: BackgroundImageValueType;
  value?: BackgroundImageValueType;
  size?: SizeType;
  variant?: Variant;
};

const sizeOptions = [
  { value: 'auto', label: t('Auto') },
  { value: 'auto 100%', label: t('Auto  100%') },
  { value: '100% auto', label: t('100%  Auto') },
  { value: '100% 100%', label: t('100%  100%') },
  { value: 'cover', label: t('Size cover') },
];

const repeatOptions = [
  { value: 'no-repeat', label: t('No repeat') },
  { value: 'repeat-x', label: t('Horizontal repeat') },
  { value: 'repeat-y', label: t('Vertical repeat') },
  { value: 'repeat', label: t('Repeat') },
];

const ImagePanel = (props: ImagePanelProps) => {
  const [value, setValue] = useControllableValue<
    BackgroundImageValueType | undefined
  >(props);

  // const image = useMemo(() => {
  //   const match = value?.backgroundImage?.match(/url\(['"]?([^'"]+)['"]?\)/);
  //   return match?.[1];
  // }, [value]);

  const { size, variant } = props;

  return (
    <Space direction="vertical" size={8} style={{ width: '100%' }}>
      {/* <Resource
        value={image}
        onChange={(val) =>
          setValue({ ...value, backgroundImage: `url('${val}')` })
        }
      /> */}
      <Select
        prefix={
          <AntdIcon
            content={IconBoxMargin}
            color="#666"
            size={16}
            stroke={1.25}
          />
        }
        placeholder={t('Please select image size')}
        options={sizeOptions}
        value={value?.backgroundSize}
        onChange={(backgroundSize) => setValue({ ...value, backgroundSize })}
        size={size}
        variant={variant}
        allowClear
        style={{ width: '100%' }}
      />

      <Select
        prefix={
          <AntdIcon content={IconRepeat} color="#666" size={16} stroke={1.25} />
        }
        placeholder={t('Please select image repeat mode')}
        value={value?.backgroundRepeat}
        onChange={(backgroundRepeat) =>
          setValue({ ...value, backgroundRepeat })
        }
        options={repeatOptions}
        allowClear
        size={size}
        variant={variant}
        style={{ width: '100%' }}
      />
    </Space>
  );
};

export default ImagePanel;
