import { use, useState } from 'react';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Button, Empty, Flex, Skeleton } from 'antd';
import { t } from 'i18next';
import styled, { useTheme } from 'styled-components';
import { StyledLeftPanelHeader } from '@/components/common.styled';
import { DictionaryGroupApi } from '@/services/api';
import { DictionaryContext } from '../context';
import CreateGroupModal from './CreateGroupModal';
import GroupItem from './GroupItem';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding-top: 12px;
  gap: 4px;
`;

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-inline: 6px 12px;
`;

const GroupList = () => {
  const theme = useTheme();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { setCurrentGroup } = use(DictionaryContext);

  const {
    data: resp,
    loading,
    runAsync,
  } = useRequest(() => DictionaryGroupApi.getList({ keywords: '' }), {
    onSuccess: (res) => {
      setCurrentGroup(res?.data?.[0]);
    },
  });

  return (
    <StyledContainer>
      <StyledLeftPanelHeader>
        <span>All Groups</span>
        <Flex gap={4}>
          <Button
            type="text"
            size="small"
            onClick={async () => await runAsync()}
          >
            <IconRefresh size={12} color={theme.colorTextSecondary} />
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => setCreateModalOpen(true)}
          >
            <IconPlus size={12} color={theme.colorTextSecondary} />
          </Button>
        </Flex>
      </StyledLeftPanelHeader>
      <StyledListContainer>
        <Skeleton loading={loading} active>
          {resp?.data && resp?.data?.length > 0 ? (
            resp?.data?.map((item) => <GroupItem key={item.id} data={item} />)
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ marginTop: 80 }}
              description={t('No Groups')}
            />
          )}
        </Skeleton>
      </StyledListContainer>
      <CreateGroupModal
        destroyOnHidden
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onOk={() => {
          setCreateModalOpen(false);
        }}
      />
    </StyledContainer>
  );
};

export default GroupList;
