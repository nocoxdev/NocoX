import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { ErrorBoundary as _ErrorBoundary } from 'react-error-boundary';
import NoFoundPage from './404';
import Fallback from './Fallback';

interface ErrorBoundaryProps {
  type?: '404' | 'error';
  onReset?: () => void;
}

const fallbackComponents = {
  error: Fallback,
  '404': NoFoundPage,
};

const ErrorBoundary = (props: PropsWithChildren<ErrorBoundaryProps>) => {
  const { type = 'error', children, onReset } = props;

  const fallback = useMemo(() => {
    return fallbackComponents[type];
  }, [type]);

  return (
    <_ErrorBoundary FallbackComponent={fallback} onReset={onReset}>
      {children}
    </_ErrorBoundary>
  );
};

export default ErrorBoundary;
