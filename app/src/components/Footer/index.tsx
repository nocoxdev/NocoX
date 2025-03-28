import React from 'react';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  // const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[]}
    />
  );
};

export default Footer;
