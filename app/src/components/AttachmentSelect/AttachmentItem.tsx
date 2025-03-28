import type { CSSProperties } from 'react';
import { IconDownload, IconTrash } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { Button, Skeleton } from 'antd';
import styled, { useTheme } from 'styled-components';
import { ResourceApi } from '@/services/api';
import { getFileUrl } from '@/services/utils';

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 28px;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  color: ${({ theme }) => theme.colorTextSecondary};
  gap: 4px;
  width: 100%;
  padding-left: 4px;
  box-sizing: border-box;
  transition: background 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colorPrimaryText};
  }
`;

const StyledTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  font-weight: 500;
`;

interface AttachmentItemProps {
  id: string;
  style?: CSSProperties;
  download?: boolean;
  onRemove?: (id: string) => void;
}

const AttachmentItem = (props: AttachmentItemProps) => {
  const { id, style, download, onRemove } = props;
  const { data: resp, loading } = useRequest(() => ResourceApi.get(id));
  const theme = useTheme();

  return loading ? (
    <Skeleton.Input active={loading} style={{ width: '100%' }} size="small" />
  ) : (
    <StyledContainer style={style}>
      <StyledTitle>{resp?.data?.name}</StyledTitle>
      {download && (
        <Button type="text" size="small">
          <a
            href={getFileUrl(id, resp?.data?.extension)}
            download={resp?.data?.name}
          >
            <IconDownload size={12} color={theme.colorPrimaryTextActive} />
          </a>
        </Button>
      )}
      {onRemove && (
        <Button danger type="link" onClick={() => onRemove(id)} size="small">
          <IconTrash size={12} />
        </Button>
      )}
    </StyledContainer>
  );
};

export default AttachmentItem;
