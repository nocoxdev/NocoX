import { useState } from 'react';
import { IconBorderCorners, IconMinimize } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { Col, Flex, InputNumber, Row, Tooltip } from 'antd';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import classNames from 'classnames';
import { t } from 'i18next';
import { keys } from 'lodash-es';
import styled from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import type { AntdIconType } from '@/components/AntdIcon/type';
import { useControlSize } from '@/utils/hooks';

const StyledWrapper = styled.div`
  width: 100%;
`;

const StyledExpandButton = styled.div<{ $height: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $height }) => $height}px;
  height: ${({ $height }) => $height}px;
  color: #444;
  font-size: 14px;
  background-color: transparent;
  color: #4b5b76;
  transition: all 0.2s;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  &:hover {
    background-color: ${({ theme }) => theme.colorFillTertiary};
  }
  &.active {
    background-color: ${({ theme }) => theme.colorPrimaryBg};
    color: ${({ theme }) => theme.colorPrimaryText};
    border: 1px solid ${({ theme }) => theme.colorPrimaryBorder};
  }
`;

const StyledFourWrapper = styled.div`
  display: flex;
  transition: all 0.2s;
`;

export interface Option {
  name: string;
  icon?: AntdIconType;
}

export interface ValueType {
  [key: string]: number | undefined;
}

export interface MultiInputNumberProps {
  defaultValue?: ValueType;
  value?: ValueType;
  onChange: (value: ValueType) => void;
  unit: string;
  main: Option;
  subs: Option[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
  size?: SizeType;
  variant?: Variant;
}

const MultiInputNumber = (props: MultiInputNumberProps) => {
  const { main, subs, unit, style, size, variant, children } = props;
  const [value, setValue] = useControllableValue<ValueType | undefined>(props);
  const [showSubs, setShowSubs] = useState<boolean>(
    () =>
      (value &&
        keys(value).some((item) =>
          subs.map((sub) => sub.name).includes(item),
        )) ||
      false,
  );

  const [mainValue, setMainValue] = useState<number | null | undefined>(
    value?.[main.name],
  );

  const height = useControlSize(size);

  return (
    <StyledWrapper>
      <Flex vertical gap={6} style={{ width: '100%' }}>
        <Flex align="center" gap={6} style={{ width: '100%' }}>
          <Flex
            align="center"
            gap={6}
            style={{ width: `calc(100% - ${height}px)` }}
          >
            {children}
            <InputNumber
              min={0}
              value={mainValue}
              disabled={showSubs}
              prefix={<AntdIcon content={main.icon} size={16} stroke={1.25} />}
              suffix={unit}
              controls={false}
              size={size}
              variant={variant}
              onChange={(val) => {
                setMainValue(val);
                if (val === undefined || val === null) {
                  setValue(undefined);
                } else {
                  setValue({ [main.name]: val });
                }
              }}
              style={{ width: children ? 'auto' : '100%', ...style }}
            />
          </Flex>
          <Tooltip title={t('All')}>
            <StyledExpandButton
              $height={height}
              className={classNames({ active: showSubs === true })}
              onClick={(e) => {
                if (showSubs === true) {
                  if (mainValue === undefined || mainValue === null) {
                    setValue(undefined);
                  } else {
                    setValue({ [main.name]: mainValue });
                  }
                } else {
                  setValue(
                    subs.reduce((acc, cur) => {
                      return { ...acc, [cur.name]: mainValue };
                    }, {}),
                  );
                }
                setShowSubs((pre) => !pre);
                e.preventDefault();
              }}
            >
              {showSubs ? (
                <IconMinimize stroke={1.25} size={16} />
              ) : (
                <IconBorderCorners stroke={1.25} size={16} />
              )}
            </StyledExpandButton>
          </Tooltip>
        </Flex>
        {showSubs && (
          <StyledFourWrapper>
            <Row gutter={[6, 6]}>
              {subs.map((item) => (
                <Col span={12} key={item.name}>
                  <InputNumber
                    min={0}
                    defaultValue={value?.[item.name]}
                    suffix="px"
                    controls={false}
                    prefix={<AntdIcon content={item.icon} stroke={1} />}
                    onChange={(val) =>
                      setValue({
                        ...value,
                        [item.name]: val == null ? undefined : val,
                      })
                    }
                    style={{ width: '100%' }}
                    size={size}
                    variant={variant}
                  />
                </Col>
              ))}
            </Row>
          </StyledFourWrapper>
        )}
      </Flex>
    </StyledWrapper>
  );
};

export default MultiInputNumber;
