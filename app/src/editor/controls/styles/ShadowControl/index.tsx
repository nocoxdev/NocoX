import { Fragment, useState } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { IconShadow, IconShadowOff } from '@tabler/icons-react';
import { t } from 'i18next';
import styled from 'styled-components';
import DraggablePopover from '@/components/DraggablePopover';
import type { SegementTabItem } from '@/components/SegementTabs/type';
import type { ControlProps } from '@/editor/controls/type';
import { useControlSize } from '@/utils/hooks';
import ShadowPanel from './ShadowPanel';
import type { ShadowValueType } from './type';
import { convert } from './utils';

const StyledShadowTypeWrapper = styled.div`
  display: flex;
  height: 16px;
  width: 16px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  margin: 0px 6px;
`;

const StyledShadowLabel = styled.div`
  height: 16px;
  line-height: 1.2;
  font-size: ${({ theme }) => theme.fontSize}px;
  user-select: none;
  color: #666;
`;

const StyledBorderControlContainer = styled.div<{ $height: number }>`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  align-items: center;
  height: ${({ $height }) => $height}px;
  width: 100%;
  border: 1px solid #d9d9d9;
  color: #555;
  position: relative;
  transition: all 0.2s;

  .clear {
    position: absolute;
    right: 10px;
    top: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    visibility: hidden;

    .anticon {
      color: ${({ theme }) => theme.colorTextQuaternary};
      font-size: ${({ theme }) => theme.fontSizeIcon}px;
      transition: color ${({ theme }) => theme.motionDurationSlow};
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.colorTextTertiary};
      }

      &:active {
        color: ${({ theme }) => theme.colorText};
      }
    }
  }

  &:hover {
  }

  &:hover {
    border: 1px solid #1b6dff;
    .clear {
      visibility: visible;
    }
  }
`;

export type ItemType = SegementTabItem & {
  children?: React.ReactNode;
};

const renderButton = (value: any) => {
  return !value ? (
    <Fragment>
      <StyledShadowTypeWrapper>
        <IconShadowOff size={16} stroke={1.25} />
      </StyledShadowTypeWrapper>
      <StyledShadowLabel>{t('No shadow')}</StyledShadowLabel>
    </Fragment>
  ) : (
    <Fragment>
      <StyledShadowTypeWrapper>
        <IconShadow size={16} stroke={1.25} />
      </StyledShadowTypeWrapper>
      <StyledShadowLabel>{t('Has shadow')}</StyledShadowLabel>
    </Fragment>
  );
};

const ShadowControl = (props: ControlProps<any>) => {
  const { defaultValue, size, onChange } = props;
  const [open, setOpen] = useState(false);

  const height = useControlSize(size);

  const handleClear = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    onChange(undefined);
    setOpen(false);
  };

  const handleChange = (val: ShadowValueType | undefined) => {
    onChange(
      val && {
        boxShadow: `${val.x}px ${val.y}px ${val.blur}px ${val.spread}px ${val.color}`,
      },
    );
  };

  return (
    <DraggablePopover
      title={t('Shadow')}
      width={268}
      content={
        <ShadowPanel
          size={size}
          defaultValue={convert(defaultValue?.boxShadow)}
          onChange={handleChange}
        />
      }
      arrow={false}
      open={open}
      onOpenChange={(open) => setOpen(open)}
      placement="left"
      childrenStyle={{ width: '100%' }}
    >
      <StyledBorderControlContainer $height={height}>
        {renderButton(defaultValue)}
        <div className="clear">
          <CloseCircleFilled onClick={(e) => handleClear(e)} />
        </div>
      </StyledBorderControlContainer>
    </DraggablePopover>
  );
};

export default ShadowControl;
