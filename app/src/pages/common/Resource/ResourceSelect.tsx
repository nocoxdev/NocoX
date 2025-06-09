import React, { useState } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { IconTrash } from '@tabler/icons-react';
import { useControllableValue } from 'ahooks';
import { Input } from 'antd';
import { t } from 'i18next';
import { styled } from 'styled-components';
import ImageView from '@/components/ImageView';
import ResourceModal from './ResourceModal';

const StyledResourceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledResourceImageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100px;
  border-radius: ${({ theme }) => theme.borderRadius}px;

  .mask {
    position: absolute;
    display: none;
    width: 100%;
    height: 100%;
    color: #fafafa;
    font-size: ${({ theme }) => theme.fontSize}px;
    border-radius: ${({ theme }) => theme.borderRadius}px;
    z-index: 1;
  }

  &:hover {
    cursor: pointer;
    .mask {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${({ theme }) => theme.colorBgMask};
    }
  }
`;

const StyledResourceEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  cursor: pointer;

  > span {
    margin-top: 10px;
    color: #666;
    font-size: ${({ theme }) => theme.fontSize}px;
  }

  > .anticon-picture {
    font-size: 18px;
  }
`;

const StyledImgContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  transition: all 0.2s;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius}px;
  }

  .delete {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 2px;
    top: 2px;
    cursor: pointer;
    z-index: 2;
    color: ${({ theme }) => theme.colorError};
    &:hover {
      color: ${({ theme }) => theme.colorErrorActive};
    }
  }
`;

export interface ResourceSelectProps {
  defaultValue?: string;
  value?: string;
  hasInput?: boolean;
  style?: React.CSSProperties;
  imageWrapperStyle?: React.CSSProperties;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const ResourceSelect = (
  props: React.PropsWithChildren<ResourceSelectProps>,
) => {
  const {
    hasInput = true,
    placeholder = t('Click select image'),
    imageWrapperStyle,
    style,
  } = props;
  const [value, setValue] = useControllableValue<string>(props);
  const [open, setOpen] = useState(false);

  return (
    <StyledResourceWrapper style={style}>
      <StyledResourceImageWrapper
        onClick={() => setOpen(true)}
        style={imageWrapperStyle}
      >
        {value ? (
          <StyledImgContainer>
            <div
              className="delete"
              onClick={(e) => {
                setValue('');
                e.stopPropagation();
              }}
            >
              <IconTrash size={14} stroke={1.5} />
            </div>
            <div className="mask">
              <span>{placeholder}</span>
            </div>
            <ImageView id={value} />
          </StyledImgContainer>
        ) : (
          <StyledResourceEmpty>
            <div className="mask" />
            <PictureOutlined />
            <span>{placeholder}</span>
          </StyledResourceEmpty>
        )}
      </StyledResourceImageWrapper>
      {hasInput && (
        <Input
          style={{ width: '100%', marginTop: 6 }}
          placeholder={t('Image link')}
          size="small"
          value={value}
          allowClear
          onChange={(e) => setValue(e.target.value)}
        ></Input>
      )}
      <ResourceModal
        open={open}
        onClose={() => setOpen(false)}
        onOk={() => setOpen(false)}
        onSelect={(id) => {
          setValue(id);
          setOpen(false);
        }}
      />
    </StyledResourceWrapper>
  );
};

export default ResourceSelect;
