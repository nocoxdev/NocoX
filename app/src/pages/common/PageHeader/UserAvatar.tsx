import React, { Fragment } from 'react';
import { useNavigate } from 'react-router';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Skeleton } from 'antd';
import type { MenuDividerType, MenuItemType } from 'antd/es/menu/interface';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { ADMIN_BASE_URL } from '@/constants';
import { useUser } from '@/selectors';
import { getImageUrl } from '@/services/utils';
import { StyledAvatarContainer } from '../styled';

export const UserAvatar = observer(() => {
  const user = useUser();
  const nagivate = useNavigate();

  const menus: (MenuDividerType | MenuItemType)[] = [
    {
      key: 'setting',
      icon: <UserOutlined />,
      label: t('Settings'),
      onClick: () => {
        nagivate(`${ADMIN_BASE_URL}/settings`);
      },
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('Logout'),
      onClick: () => {
        user.logout();
        window.location.href = `${ADMIN_BASE_URL}/login`;
      },
    },
  ];

  return (
    <Fragment>
      <Dropdown
        menu={{
          items: menus,
        }}
        trigger={['click']}
        overlayStyle={{ width: 120 }}
      >
        {user.initing ? (
          <Skeleton.Avatar active={true} size={28} shape="circle" />
        ) : user.profile?.avatar ? (
          <Avatar
            src={getImageUrl(user.profile?.avatar)}
            size={28}
            shape="circle"
          />
        ) : (
          <StyledAvatarContainer $size={28} $fontSize={14} $pointer>
            {user.profile?.userName?.[0].toUpperCase()}
          </StyledAvatarContainer>
        )}
      </Dropdown>
    </Fragment>
  );
});
