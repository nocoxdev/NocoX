import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import {
  IconCheck,
  IconExclamationMark,
  IconPalette,
} from '@tabler/icons-react';
import { ColorPicker, Flex, Spin, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import { COLORS } from '@/constants';
import { useMessage } from '@/selectors';
import { useCurApp } from '../selectors';

const StyledColorItem = styled.div<{ $color: string }>`
  display: flex;
  background-color: ${({ $color }) => $color};
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border: 2px solid white;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colorBorderSecondary};
  }
`;

const StyledStatusMark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: transparent;
`;

export interface AppColorSeletorProps {}

const AppColorSeletor = observer(() => {
  const app = useCurApp();
  const theme = useTheme();
  const message = useMessage();
  const [changingColor, setChangingColor] = useState('');

  const handleChangeColor = async (color: string) => {
    setChangingColor(color);
    const resp = await app.changeColor(color);
    if (resp.success) {
      setChangingColor('');
    } else {
      message.error(resp.message);
    }
  };

  const renderStatusMark = (color: string) => {
    if (app.data.color !== color && changingColor !== color) {
      return;
    }

    if (app.data.color === color) {
      return <IconCheck size={16} color="#fff" stroke={2} />;
    }

    switch (app.requestStates.changeColor.status) {
      case 'pending':
        return <Spin indicator={<LoadingOutlined spin />} size="small" />;
      case 'error':
        return (
          <Tooltip title={app.requestStates.changeColor.message}>
            <IconExclamationMark
              size={14}
              color={theme.colorErrorText}
              stroke={2}
            />
          </Tooltip>
        );
    }
  };

  return (
    <Flex wrap="wrap" gap={2} style={{ paddingInline: 6 }}>
      {COLORS.map((item) => (
        <StyledColorItem
          key={item}
          $color={item}
          onClick={() => handleChangeColor(item)}
        >
          <StyledStatusMark>{renderStatusMark(item)}</StyledStatusMark>
        </StyledColorItem>
      ))}

      <StyledColorItem
        $color="#fff"
        style={{
          height: 22,
          width: 22,
          border: `1px solid ${theme.colorBorderSecondary}`,
        }}
      >
        <ColorPicker
          size="small"
          onChangeComplete={(color) => handleChangeColor(color.toHexString())}
          arrow={{ pointAtCenter: true }}
          placement="bottomLeft"
        >
          <Tooltip title={t('Custom')}>
            <IconPalette size={16} color={app.data.color} />
          </Tooltip>
        </ColorPicker>
      </StyledColorItem>
    </Flex>
  );
});

export default AppColorSeletor;
