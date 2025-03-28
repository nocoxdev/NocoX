import { useControllableValue } from 'ahooks';
import { Col, ColorPicker, InputNumber, Row, Slider, Space } from 'antd';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import styled from 'styled-components';
import PositionInput from '@/components/PositionInput';
import type { ShadowValueType } from './type';

const StyledContainer = styled.div`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.fontSize}px;
`;

export type ShadowPanelProps = {
  onChange?: (value: ShadowValueType | undefined) => void;
  defaultValue?: ShadowValueType;
  value?: ShadowValueType;
  size?: SizeType;
  variant?: Variant;
};

const ShadowPanel = (props: ShadowPanelProps) => {
  const [value, setValue] = useControllableValue<ShadowValueType | undefined>(
    props,
  );

  const { size, variant } = props;

  const handleChange = (val: Partial<ShadowValueType>) => {
    setValue({ ...value, ...val } as ShadowValueType);
  };

  return (
    <StyledContainer>
      <Row gutter={[8, 12]}>
        <Col span={24}>
          <ColorPicker
            placement="bottom"
            showText
            value={value?.color || '#000000'}
            onChange={(color) => handleChange({ color: color.toHexString() })}
            size={size}
            mode={['single', 'gradient']}
          />
        </Col>
        <Col span={14}>
          <Space direction="vertical">
            <Row align="middle">
              <Col span={10}>{t('X Offset')}</Col>
              <Col span={14}>
                <InputNumber
                  value={value?.x}
                  min={-38}
                  max={38}
                  size={size}
                  variant={variant}
                  onChange={(x) => handleChange({ ...value, x: x || 0 })}
                  controls={false}
                  suffix="px"
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
            <Row align="middle">
              <Col span={10}>{t('Y Offset')}</Col>
              <Col span={14}>
                <InputNumber
                  value={value?.y}
                  min={-38}
                  max={38}
                  size={size}
                  variant={variant}
                  onChange={(y) => handleChange({ ...value, y: y || 0 })}
                  controls={false}
                  suffix="px"
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
          </Space>
        </Col>

        <Col span={10}>
          <PositionInput
            value={{ x: value?.x || 0, y: value?.y || 0 }}
            radius={38}
            onChange={({ x, y }) =>
              handleChange({ x: Math.ceil(x), y: Math.ceil(y) })
            }
            size={size}
            variant={variant}
          />
        </Col>
        <Col span={14}>
          <Row align="middle" justify="end">
            <Col span={10}>{t('Blur')}</Col>
            <Col span={14}>
              <InputNumber
                value={value?.blur}
                size={size}
                variant={variant}
                onChange={(blur) => handleChange({ blur: blur || 0 })}
                controls={false}
                suffix="px"
                min={0}
                max={50}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Slider
            value={value?.blur}
            onChange={(blur) => handleChange({ blur: blur })}
            tooltip={{ formatter: null }}
            min={0}
            max={50}
          />
        </Col>
        <Col span={14}>
          <Row align="middle">
            <Col span={10}>{t('Spread')}</Col>
            <Col span={14}>
              <InputNumber
                value={value?.spread}
                size={size}
                variant={variant}
                onChange={(spread) => handleChange({ spread: spread || 0 })}
                controls={false}
                suffix="px"
                min={-25}
                max={25}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Slider
            value={value?.spread}
            onChange={(spread) => handleChange({ spread: spread })}
            tooltip={{ formatter: null }}
            min={-25}
            max={25}
          />
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default ShadowPanel;
