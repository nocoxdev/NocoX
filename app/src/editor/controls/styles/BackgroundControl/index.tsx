import { Fragment, useEffect, useState } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { IconBackground, IconPhoto } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { t } from 'i18next';
import { isObject, keys, omit, pick } from 'lodash-es';
import styled from 'styled-components';
import DraggablePopover from '@/components/DraggablePopover';
import SegementTabs from '@/components/SegementTabs';
import type { SegementTabItem } from '@/components/SegementTabs/type';
import type { ControlProps } from '@/editor/controls/type';
import { useControlSize } from '@/utils/hooks';
import type { BackgroundColorValueType } from './panels/ColorPanel';
import ColorPanel from './panels/ColorPanel';
import type { BackgroundImageValueType } from './panels/ImagePanel';
import ImagePanel from './panels/ImagePanel';

const StyledBgTypeWrapper = styled.div<{ $backgroundColor?: string }>`
  display: flex;
  height: 16px;
  width: 16px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background: ${({ $backgroundColor }) => $backgroundColor};
  border: 1px solid #ddd;
  margin: 0px 6px;
  transition: all 0.2s;
`;

const StyledBgDescWrapper = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.fontSize}px;
  user-select: none;
  align-items: center;
  color: #666;
`;

const StyledEditBoxWrapper = styled.div`
  width: 100%;

  .ant-upload {
    width: 100% !important;
    height: 150px !important;
    margin-bottom: 0 !important;
  }
`;

const StyledBorderControlWrapper = styled.div<{ $height: number }>`
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

export type BackgoundType = 'image' | 'color' | 'none';

export type ItemType = SegementTabItem & {
  children?: React.ReactNode;
};

const getType = (value: any) => {
  if (!value) return 'none';

  if (isObject(value) && keys(value).includes('backgroundImage')) {
    return 'image';
  } else {
    return 'color';
  }
};

export interface BackgroundControlProps {}

const BackgroundControl = (props: ControlProps<BackgroundControlProps>) => {
  const [value, setValue] = useControllableValue(props);
  const { size } = props;

  const [type, setType] = useState<BackgoundType>(getType(value));
  const [bgColor, setBgColor] = useState<BackgroundColorValueType | undefined>(
    pick(value, 'backgroundColor'),
  );
  const [bgImage, setBgImage] = useState<BackgroundImageValueType | undefined>(
    omit(value, 'backgroundColor'),
  );
  const [open, setOpen] = useState(false);
  const height = useControlSize(size);

  const handleClear = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setValue(undefined);
    setBgColor(undefined);
    setBgImage(undefined);
    setType('none');
    setOpen(false);
  };

  useEffect(() => {
    switch (type) {
      case 'none':
        setValue(undefined);
        break;
      case 'color':
        setValue(bgColor);
        break;
      case 'image':
        setValue(bgImage);
        break;
    }
  }, [type, bgColor, bgImage]);

  const items: ItemType[] = [
    {
      key: 'none',
      label: t('No background'),
      children: (
        <Fragment>
          <StyledBgTypeWrapper style={{ border: 'none' }}>
            <IconBackground size={16} stroke={1.25} />
          </StyledBgTypeWrapper>
          <StyledBgDescWrapper>{t('No background')}</StyledBgDescWrapper>
        </Fragment>
      ),
      content: null,
    },
    {
      key: 'color',
      label: t('Color'),
      children: (
        <Fragment>
          <StyledBgTypeWrapper $backgroundColor={bgColor?.backgroundColor} />
          <StyledBgDescWrapper>{t('Color background')}</StyledBgDescWrapper>
        </Fragment>
      ),
      content: (
        <StyledEditBoxWrapper>
          <ColorPanel
            onChange={(val) => setBgColor(val)}
            value={bgColor}
            size={size}
          />
        </StyledEditBoxWrapper>
      ),
    },
    {
      key: 'image',
      label: t('Image'),
      children: (
        <Fragment>
          <StyledBgTypeWrapper style={{ border: 'none' }}>
            <IconPhoto size={16} stroke={1.25} />
          </StyledBgTypeWrapper>
          <StyledBgDescWrapper>{t('Image')}</StyledBgDescWrapper>
        </Fragment>
      ),
      content: (
        <StyledEditBoxWrapper>
          <ImagePanel
            onChange={(val) => setBgImage(val)}
            value={bgImage}
            size={size}
          />
        </StyledEditBoxWrapper>
      ),
    },
  ];

  return (
    <DraggablePopover
      arrow={false}
      content={
        <SegementTabs
          items={items.filter((item) => item.key !== 'none')}
          onItemChange={(type) => setType(type as BackgoundType)}
          activeKey={type}
        />
      }
      title={t('Background')}
      width={250}
      open={open}
      onOpenChange={(open) => setOpen(open)}
      childrenStyle={{ width: '100%' }}
    >
      <StyledBorderControlWrapper $height={height}>
        {items.map((item) => (
          <Fragment key={item.key}>
            {item.key === type && item.children}
          </Fragment>
        ))}
        <div className="clear">
          <CloseCircleFilled onClick={(e) => handleClear(e)} />
        </div>
      </StyledBorderControlWrapper>
    </DraggablePopover>
  );
};

export default BackgroundControl;
