import { useState } from 'react';
import {
  IconArrowAutofitWidth,
  IconDeviceDesktop,
  IconDeviceIpadHorizontal,
  IconDeviceMobile,
} from '@tabler/icons-react';
import { Button } from 'antd';
import classNames from 'classnames';
import { styled } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';

const StyledSizes = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-right: 12px;
  gap: 4px;
`;

const StyledSizeItem = styled(Button)`
  &.active {
    color: #0052d9;
    background-color: #d4e3fc;
  }
`;

const sizes = [
  { name: 'fluid', icon: IconArrowAutofitWidth },
  { name: 'pc', icon: IconDeviceDesktop },
  { name: 'tablet', icon: IconDeviceIpadHorizontal },
  { name: 'mobile', icon: IconDeviceMobile },
];

const PageSizeControl = () => {
  const [active, setActive] = useState('pc');
  return (
    <StyledSizes>
      {sizes.map((device) => (
        <StyledSizeItem
          type="text"
          key={device.name}
          onClick={() => setActive(device.name)}
          className={classNames({ active: active === device.name })}
          icon={<AntdIcon content={device.icon} stroke={1} size={18} />}
        ></StyledSizeItem>
      ))}
    </StyledSizes>
  );
};

export default PageSizeControl;
