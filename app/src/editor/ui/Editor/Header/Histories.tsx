import { useState } from 'react';
import { IconHistory } from '@tabler/icons-react';
import { Button, Flex, Tooltip } from 'antd';
import { t } from 'i18next';
import { useTheme } from 'styled-components';
import EnhancedModal from '@/components/Modal';
import AppHistoryList from './AppHistoryList';

const HistoryActions = () => {
  const [historyVersionOpen, setHistoryVersionOpen] = useState(false);

  const theme = useTheme();

  return (
    <Flex>
      <EnhancedModal
        title={t('Histories')}
        open={historyVersionOpen}
        onClose={() => setHistoryVersionOpen(false)}
        width={1000}
        destroyOnClose
      >
        <AppHistoryList />
      </EnhancedModal>

      <Tooltip title={t('Histories')}>
        <Button
          type="text"
          size="small"
          onClick={() => setHistoryVersionOpen(true)}
          style={{ color: theme.colorPrimaryText }}
        >
          <IconHistory size={16} stroke={2} />
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default HistoryActions;
