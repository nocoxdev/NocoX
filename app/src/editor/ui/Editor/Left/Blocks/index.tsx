import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { IconSettings } from '@tabler/icons-react';
import { useInfiniteScroll } from 'ahooks';
import { Button, Divider, Flex, Input, Select, Spin } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import StickyPanel from '@/components/StickyPanel';
import { useMessage } from '@/selectors';
import { BlockApi } from '@/services/api';
import type { BlockResponse } from '@/services/responses';
import { BlockType } from '@/types';
import BlockItem from './BlockItem';
import BlockManagerModal from './BlockManagerModal';
import { options } from './constants';

const StyledContainer = styled(Flex)`
  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-inline: 12px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledHeaderContainer = styled(Flex)`
  background-color: white;
  width: 100%;
  margin-bottom: 6px;
  .ant-select .ant-select-selector {
    padding-left: 0px !important;
  }
  .ant-select-selection-item {
    font-size: ${({ theme }) => theme.fontSize}px;
    font-weight: 600;
  }
`;

interface Result {
  list: BlockResponse[];
  index: number;
  total: number;
}

const Blocks = observer(() => {
  const [type, setType] = useState<BlockType>(BlockType.All);
  const keywordsRef = useRef<string>('');
  const message = useMessage();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const getLoadMoreList = async (index?: number): Promise<Result> => {
    const pageIndex = index || 1;
    const resp = await BlockApi.getPageList({
      pageIndex,
      pageSize: 6,
      type,
      keywords: keywordsRef.current,
    });

    if (!resp.data) {
      message.error(resp.message || t('Get block list failed'));
      return { list: [], total: 0, index: pageIndex };
    } else {
      return {
        list: resp.data.items,
        total: resp.data.totalCount,
        index: pageIndex + 1,
      };
    }
  };

  const { data, loading, noMore, loadingMore, reloadAsync } =
    useInfiniteScroll<Result>((d) => getLoadMoreList(d?.index), {
      target: ref,
      reloadDeps: [type],
      isNoMore: (d) =>
        !!(d && (d.list.length === d.total || d.list.length > 50)),
    });

  const header = (
    <StyledHeaderContainer gap={4} vertical>
      <Input
        placeholder={t('Please enter the block name')}
        variant="borderless"
        size="large"
        onChange={(e) => (keywordsRef.current = e.target.value)}
        onPressEnter={() => reloadAsync()}
        onClear={async () => reloadAsync()}
        allowClear
        suffix={
          <SearchOutlined
            style={{ color: theme.colorTextTertiary, cursor: 'pointer' }}
            onClick={() => reloadAsync()}
          />
        }
        styles={{
          affixWrapper: {
            paddingLeft: 0,
            borderBottom: `1px solid ${theme.colorBorderSecondary}`,
            fontSize: theme.fontSize,
          },
          suffix: { position: 'absolute', right: 2, top: 12 },
        }}
      />

      <Flex justify="space-between" align="center">
        <Select
          defaultValue={type}
          options={options}
          variant="borderless"
          onChange={(value) => setType(value)}
          size="small"
          style={{ width: 120 }}
        />
        <Button
          type="text"
          size="small"
          icon={
            <AntdIcon
              content={IconSettings}
              size={14}
              color={theme.colorTextSecondary}
            />
          }
          onClick={() => setOpen(true)}
        />
      </Flex>
    </StyledHeaderContainer>
  );

  return (
    <StyledContainer vertical ref={ref}>
      <StickyPanel header={header}>
        <Spin spinning={loading} size="small">
          {data?.list.map(
            (item) =>
              item.cover && (
                <BlockItem key={item.id} cover={item.cover} title={item.name} />
              ),
          )}
          <div style={{ marginTop: 8 }}>
            {loadingMore && <Spin spinning />}
            {noMore && <Divider plain>{t('No more')}</Divider>}
          </div>
        </Spin>
      </StickyPanel>
      <BlockManagerModal
        open={open}
        onClose={() => {
          setOpen(false);
          reloadAsync();
        }}
      />
    </StyledContainer>
  );
});

export default Blocks;
