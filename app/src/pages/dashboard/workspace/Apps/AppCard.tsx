import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { IconAB2 } from '@tabler/icons-react';
import { useHover } from 'ahooks';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import tinycolor from 'tinycolor2';
import ImageView from '@/components/ImageView';
import { useCurApp } from '../selectors';
import AppActions from './AppCardActions';
import AppFooter from './AppCardFooter';

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

  > .logo {
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
  }

  .title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 16px;
    font-weight: 600;
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
`;

export interface AppCardProps {
  style?: CSSProperties;
}

const AppCard = observer(({ style }: AppCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const hovering = useHover(ref);
  const theme = useTheme();
  const app = useCurApp();

  return (
    <StyledAppCardContainer ref={ref} style={style}>
      <StyledAppCardContent $bgColor={app.data.color}>
        <div className="logo">
          {app.data.favicon ? (
            <ImageView id={app.data.favicon} simple />
          ) : (
            <IconAB2 size="20" color="#ea9343" />
          )}
        </div>
        <div
          className="title"
          style={{
            color: tinycolor(app.data.color).isDark()
              ? '#fff'
              : theme.colorText,
          }}
        >
          {app.data.title}
        </div>
        <AppActions visible={hovering} id={app.id} />
      </StyledAppCardContent>
      <AppFooter />
    </StyledAppCardContainer>
  );
});

export default AppCard;
