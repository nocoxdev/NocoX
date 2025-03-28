import { Fragment, useState } from 'react';
import { IconSettings, IconX } from '@tabler/icons-react';
import { Button, Drawer, Flex } from 'antd';
import { t } from 'i18next';
import { useTheme } from 'styled-components';
import ThemeSetting from '@/components/ThemeSetting';

export const Setting = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <Fragment>
      <Button
        type="text"
        icon={
          <IconSettings
            size={18}
            stroke={1.5}
            color={theme.colorTextSecondary}
            onClick={() => setOpen(true)}
          />
        }
      />
      <Drawer
        title={t('Setting')}
        open={open}
        width={280}
        closable={false}
        maskClosable
        styles={{
          header: { borderBottom: 'none', padding: '16px 16px 10px 16px' },
          body: { padding: '6px 16px 16px 16px' },
        }}
        style={{ background: theme.colorBgLayout }}
        onClose={() => setOpen(false)}
        extra={
          <Button
            onClick={() => setOpen(false)}
            type="text"
            size="small"
            icon={<IconX size={16} stroke={1.5} />}
          />
        }
      >
        <Flex vertical gap={16}>
          <ThemeSetting />
        </Flex>
      </Drawer>
    </Fragment>
  );
};
