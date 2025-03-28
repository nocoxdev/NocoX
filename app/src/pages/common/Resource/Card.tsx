import { useRef } from 'react';
import { IconCheck, IconCopy, IconTrash } from '@tabler/icons-react';
import { useHover } from 'ahooks';
import { Card, Flex, Popconfirm, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import ImageView from '@/components/ImageView';
import { useMessage } from '@/selectors';
import { ResourceApi } from '@/services/api';
import { getImageUrl } from '@/services/utils';
import { toNow } from '@/utils/helpers';
import { usePost } from '@/utils/hooks';

const StyleddWrapper = styled.div`
  width: 240px;

  .ant-card {
    cursor: default;
  }

  .ant-card-body {
    padding: 10px;
  }
`;

const StyledCardCover = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  .ant-image {
    padding: 8px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .ant-image-mask {
      border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
      border-top-right-radius: ${({ theme }) => theme.borderRadius}px;
    }
  }
`;

const StyleCardCoverSelect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colorFill};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
  border-top-right-radius: ${({ theme }) => theme.borderRadius}px;
`;

const StyleCardCoverSelectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 120px;
  background-color: ${({ theme }) => theme.colorPrimary};
  color: #fff;
  font-size: 13px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  transition: all 0.2s;
  cursor: pointer;

  > span {
    margin-left: 4px;
  }

  &:hover {
    color: ${({ theme }) => theme.colorPrimary};
    background-color: #fff;
  }
`;

const StyledCardAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const StyledName = styled.div`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => theme.colorText};
  overflow: hidden;
  width: 160px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export interface ResourceCardProps {
  id: string;
  name: string;
  creator: string;
  creationTime: string;
  onSelect?: (id: string) => void;
  onDeleteSuccess?: () => void;
}

const ResourceCard = observer((props: ResourceCardProps) => {
  const { id, name, creator, creationTime, onSelect, onDeleteSuccess } = props;
  const ref = useRef(null);
  const isHover = useHover(ref);
  const theme = useTheme();
  const message = useMessage();
  const { submitting, postAsync } = usePost(ResourceApi.delete);

  const handleCopy = (id: string) => {
    const url = getImageUrl(id);
    navigator.clipboard.writeText(url);
    message.success(t('Copy success'));
  };

  const handleDelete = async (id: string) => {
    const resp = await postAsync(id);
    if (resp.success) {
      message.success(t('Delete success'));
      onDeleteSuccess?.();
    } else {
      message.error(resp.message);
    }
  };

  return (
    <StyleddWrapper>
      <Card
        ref={ref}
        hoverable
        cover={
          <StyledCardCover>
            <ImageView name={name} id={id} style={{ textAlign: 'center' }} />
            {isHover && onSelect && (
              <StyleCardCoverSelect>
                <StyleCardCoverSelectButton onClick={() => onSelect(id)}>
                  <IconCheck size={16} /> <span>{t('Select')}</span>
                </StyleCardCoverSelectButton>
              </StyleCardCoverSelect>
            )}
          </StyledCardCover>
        }
      >
        <StyledCardAction>
          <Flex vertical gap={4}>
            <StyledName title={name}>{name}</StyledName>
            <Flex gap={4} align="center">
              <span style={{ fontSize: 11, color: theme.colorTextSecondary }}>
                {creator}
              </span>
              <span style={{ fontSize: 11, color: theme.colorTextTertiary }}>
                {toNow(creationTime)}
              </span>
            </Flex>
          </Flex>

          <Flex gap={8}>
            <Tooltip title={t('Copy link')}>
              <IconCopy
                size={14}
                stroke={1.5}
                color={theme.colorTextTertiary}
                onClick={() => handleCopy(id)}
              />
            </Tooltip>
            <Tooltip title={t('Delete')}>
              <Popconfirm
                title={t('Are you sure to delete?')}
                onConfirm={() => handleDelete(id)}
                placement="bottomLeft"
                arrow={{ pointAtCenter: true }}
                okButtonProps={{
                  danger: true,
                  loading: submitting,
                }}
                cancelButtonProps={{
                  type: 'text',
                }}
                okText={t('Confirm')}
                cancelText={t('Cancel')}
              >
                <IconTrash
                  stroke={1.5}
                  size={14}
                  color={theme.colorErrorText}
                />
              </Popconfirm>
            </Tooltip>
          </Flex>
        </StyledCardAction>
      </Card>
    </StyleddWrapper>
  );
});

export default ResourceCard;
