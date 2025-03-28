import type { FallbackProps } from 'react-error-boundary';
import { IconRefresh } from '@tabler/icons-react';
import { Button, Flex } from 'antd';
import { t } from 'i18next';
import ErrorMessage from './ErrorMessage';

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <ErrorMessage error={error.message}>
      <Button
        type="primary"
        onClick={() => resetErrorBoundary()}
        size="small"
        style={{ width: 80 }}
      >
        <Flex align="center" gap={8} justify="center">
          <IconRefresh size={13} style={{ cursor: 'pointer' }} />
          {t('Retry')}
        </Flex>
      </Button>
    </ErrorMessage>
  );
};

export default Fallback;
