import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { useInfiniteScroll } from 'ahooks';
import { Divider, Spin } from 'antd';
import classNames from 'classnames';
import { t } from 'i18next';
import { styled } from 'styled-components';
import type { IconType, IconValueType } from '@/types';
import AntdIcon from '../AntdIcon';
import { getIcons } from './utils';

const StyledIconListWrapper = styled.div`
  height: 240px;
  width: calc(100% - 40px);
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 8px 20px;

  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &:hover {
    &::-webkit-scrollbar {
      display: inline;
    }
  }
`;

const StyledIconList = styled.div`
  width: calc(100% + 8px);
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const StyledIconItem = styled.div`
  display: flex;
  user-select: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  width: 32px;
  height: 32px;
  position: relative;
  color: ${({ theme }) => theme.colorText};
  &:hover {
    background-color: ${({ theme }) => theme.colorFillSecondary};
  }
  &.selected {
    background-color: ${({ theme }) => theme.colorFillSecondary};
  }
`;

export interface IconListProps {
  keywords?: string;
  type: IconType;
  category: string;
  current?: string;
  style?: CSSProperties;
  onChange: (name?: string) => void;
  onHover: (name?: string) => void;
}

const PAGE_SIZE = 36;
const defalutIcons = getIcons();

interface Result {
  list: IconValueType[];
  index: number;
}

const getMoreIconList = async (
  index: number,
  type: IconType,
  category: string,
  keywords: string,
) => {
  if (index === -1) {
    return {
      list: [],
      index: -1,
    };
  }

  const result = defalutIcons
    .filter((icon) => type === 'all' || icon.type === type)
    .filter((icon) => category === 'all' || icon.category === category)
    .filter((icon) => {
      const words = keywords.trim().toLowerCase();

      return (
        icon.name.includes(words) ||
        icon.tags?.some((tag) => tag.includes(words))
      );
    })
    .slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE);

  return {
    list: result,
    index: result.length === PAGE_SIZE ? index + 1 : -1,
  };
};

const IconList = (props: IconListProps) => {
  const {
    keywords = '',
    type,
    category,
    current,
    style,
    onChange,
    onHover,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { data, loading, loadingMore, noMore } = useInfiniteScroll<Result>(
    (d) => getMoreIconList(!d ? 0 : d.index, type, category, keywords),
    {
      target: ref,
      isNoMore: (d) => d?.index === -1,
      reloadDeps: [keywords, type, category],
    },
  );

  return (
    <StyledIconListWrapper ref={ref} style={style}>
      {loading && !data ? (
        <Spin spinning size="small" />
      ) : (
        <StyledIconList>
          {data?.list.map((item) => (
            <StyledIconItem
              key={item.name}
              className={classNames({ selected: item.name === current })}
              onClick={() => onChange(item.name)}
              title={item.title}
              onMouseEnter={() => onHover(item.name)}
            >
              <AntdIcon content={item.content} size={18} stroke={1.5} />
            </StyledIconItem>
          ))}
        </StyledIconList>
      )}
      <div style={{ marginTop: 6, width: 248 }}>
        {loadingMore && <Spin spinning size="small"></Spin>}
        {noMore && <Divider plain>{t('No more')}😁</Divider>}
      </div>
    </StyledIconListWrapper>
  );
};

export default IconList;
