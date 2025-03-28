import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { IconAB2, IconSend } from '@tabler/icons-react';
import { useHover } from 'ahooks';
import { Button, Flex } from 'antd';
import classNames from 'classnames';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import ImageView from '@/components/ImageView';
import type { MyAppResponse } from '@/services/responses';

const StyledAppCardContainer = styled.div`
  height: 100%;
  width: 240px;
  padding: 4px;
  background-color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  border: 2px solid transparent;
  transition: all 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colorBorderSecondary};
  }
`;

const StyledAppCardContent = styled.div<{ $bgColor?: string }>`
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: ${({ $bgColor }) => $bgColor || '#e3deff'};
  height: 120px;
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  align-items: center;
`;

const StyledAppLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 2px 16px;

  svg {
    width: 32px;
    height: 32px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const StyledAppTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 16px;
  font-weight: 600;
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const StyledAppCardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  opacity: 0;
  transition: opacity 0.2s;

  &.visible {
    opacity: 1;
  }
`;

export interface AppCardProps {
  style?: CSSProperties;
  app: MyAppResponse;
}

const AppCard = observer((props: AppCardProps) => {
  const { app, style } = props;
  const ref = useRef<HTMLDivElement>(null);
  const hovering = useHover(ref);

  return (
    <StyledAppCardContainer ref={ref} style={style}>
      <StyledAppCardContent $bgColor={app.color}>
        <StyledAppLogo>
          {app.favicon ? (
            <ImageView id={app.favicon} simple />
          ) : (
            <IconAB2 size="20" color="#ea9343" />
          )}
        </StyledAppLogo>
        <StyledAppTitle>{app.title}</StyledAppTitle>
        <StyledAppCardActions className={classNames({ visible: hovering })}>
          <Flex gap={12} justify="space-between">
            <Button
              size="small"
              type="primary"
              icon={<AntdIcon content={IconSend} size={14} />}
              onClick={() => window.open(`/app/${app.appId}`, '_blank')}
              style={{ width: 120 }}
            >
              {t('Run')}
            </Button>
          </Flex>
        </StyledAppCardActions>
      </StyledAppCardContent>
    </StyledAppCardContainer>
  );
});

export default AppCard;
