import { useMemo } from 'react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import Database from '@/database';
import { TableStore } from '@/database/stores';
import { DatabaseContext } from '../../database/DatabaseContext';

const Page = () => {
  const contextValue = useMemo(
    () => ({
      store: new TableStore('id'),
      size: 'small' as SizeType,
    }),
    [],
  );

  return (
    <ErrorBoundary onReset={() => window.location.reload()}>
      <DatabaseContext.Provider value={contextValue}>
        <Database />
      </DatabaseContext.Provider>
    </ErrorBoundary>
  );
};

export default Page;
