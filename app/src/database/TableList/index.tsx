import { useState } from 'react';
import { IconPlus, IconRefresh } from '@tabler/icons-react';
import { Button, Flex } from 'antd';
import { t } from 'i18next';
import styled, { useTheme } from 'styled-components';
import { StyledLeftPanelHeader } from '@/components/common.styled';
import { useStore } from '../selectors';
import CreateTableModal from './CreateTableModal';
import List from './List';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding-top: 12px;
  gap: 4px;
`;

const TableList = () => {
  const theme = useTheme();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const store = useStore();

  return (
    <StyledContainer>
      <StyledLeftPanelHeader>
        <span>{t('All Tables')}</span>
        <Flex gap={4}>
          <Button type="text" size="small" onClick={() => store.loadTables()}>
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
      <List />
      <CreateTableModal
        destroyOnClose
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onOk={() => {
          setCreateModalOpen(false);
        }}
      />
    </StyledContainer>
  );
};

export default TableList;
