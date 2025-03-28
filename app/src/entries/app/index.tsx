import React from 'react';
import ReactDOM from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';
import ErrorBoundary from '@/components/ErrorBoundary';
import Content from './Content';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ErrorBoundary>
    <Content />
  </ErrorBoundary>,
);
