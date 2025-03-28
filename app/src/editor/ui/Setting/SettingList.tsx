import classNames from 'classnames';
import { t } from 'i18next';
import { styled } from 'styled-components';
import { StyledLeftPanelHeader } from '@/components/common.styled';
import type { SettingItemType } from './type';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding-top: 12px;
  gap: 4px;
`;

const StyledItem = styled.div`
  display: flex;
  height: ${({ theme }) => theme.controlHeightSM}px;
  align-items: center;
  padding-inline: 10px;
  color: ${({ theme }) => theme.colorTextSecondary};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  transition: background-color 0.2s;
  gap: 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize}px;
  cursor: pointer;

  &:hover:not(.selected) {
    background-color: ${({ theme }) => theme.colorFillTertiary};
    color: ${({ theme }) => theme.colorTextSecondary};
  }

  &.selected {
    color: ${({ theme }) => theme.colorPrimaryText};
    background-color: ${({ theme }) => theme.colorPrimaryBg};
  }
`;

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-inline: 6px 12px;
`;

interface SettingListProps {
  items: SettingItemType[];
  current: SettingItemType;
  setCurrent: (item: SettingItemType) => void;
}

const SettingList = (props: SettingListProps) => {
  const { items, current, setCurrent } = props;

  return (
    <StyledContainer>
      <StyledLeftPanelHeader>
        <span>{t('App Settings')}</span>
      </StyledLeftPanelHeader>
      <StyledListContainer>
        {items.map((item) => (
          <StyledItem
            key={item.name}
            className={classNames({ selected: current?.name === item.name })}
            onClick={() => setCurrent?.(item)}
          >
            {item.icon}
            {item.label}
          </StyledItem>
        ))}
      </StyledListContainer>
    </StyledContainer>
  );
};

export default SettingList;
