import { useState } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { Tooltip } from 'antd';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';
import ImageView from '@/components/ImageView';
import ResourceModal from '@/pages/common/Resource/ResourceModal';

const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  width: 200px;
  height: 128px;
`;

const StyledImageContainer = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  padding: 4px;
  box-sizing: border-box;

  transition: all 0.2s;
  background-color: ${({ theme }) => theme.colorFillQuaternary};
  .ant-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .ant-image-img {
      max-width: 192px;
      max-height: 112px;
      object-fit: contain;
    }
    .ant-image-mask {
      border-radius: ${({ theme }) => theme.borderRadius}px;
    }
  }
`;

const StyledActions = styled.div`
  display: flex;
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 1;
`;

const StyledActionButton = styled.div`
  display: flex;
  height: 20px;
  width: 20px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  color: #ddd;
  cursor: pointer;

  &:hover {
    color: #fff;
  }

  &.danger {
    &:hover {
      color: ${({ theme }) => theme.colorErrorText};
    }
  }
`;

const StyleEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  position: relative;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
  cursor: pointer;

  > .anticon-picture {
    color: #bbb;
    font-size: 24px;
  }
`;

const StyledMask = styled.div`
  position: absolute;
  display: flex;
  visibility: hidden;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #ddd;
  font-size: ${({ theme }) => theme.fontSize}px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: ${({ theme }) => theme.borderRadius}px;
  user-select: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;

  ${StyledWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

interface ImageSelectProps {
  value?: string;
  onChange?: (value?: string) => void;
}

const ImageSelect = (props: ImageSelectProps) => {
  const { value, onChange } = props;
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  return (
    <StyledWrapper>
      {value ? (
        <StyledImageContainer>
          <ImageView
            id={value}
            preview={{
              visible,
              onVisibleChange: (value) => setVisible(value),
            }}
          />
        </StyledImageContainer>
      ) : (
        <StyleEmpty>
          <PictureOutlined />
          <span style={{ fontSize: 10, color: theme.colorTextTertiary }}>
            {t('Please upload a png file with a size of no more than 1MB.')}
          </span>
        </StyleEmpty>
      )}
      <StyledMask onClick={() => setOpen(true)}>
        <StyledActions>
          <Tooltip title={t('Preview')}>
            <StyledActionButton
              onClick={(e) => {
                e.stopPropagation();
                setVisible(true);
              }}
            >
              <IconEye size={14} />
            </StyledActionButton>
          </Tooltip>
          <Tooltip title={t('Delete')}>
            <StyledActionButton
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(undefined);
              }}
              className="danger"
            >
              <IconTrash size={12} />
            </StyledActionButton>
          </Tooltip>
        </StyledActions>
        <span>{t('Select image')}</span>
      </StyledMask>

      <ResourceModal
        onSelect={(id) => {
          onChange?.(id);
          setOpen(false);
        }}
        open={open}
        onClose={() => setOpen(false)}
      />
    </StyledWrapper>
  );
};

export default ImageSelect;
