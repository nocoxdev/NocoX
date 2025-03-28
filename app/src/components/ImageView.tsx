import { useMemo } from 'react';
import type { ImageProps } from 'antd';
import { Image, Skeleton } from 'antd';
import { styled } from 'styled-components';
import { getImageUrl } from '@/services/utils';

const StyledSkeleton = styled(Skeleton.Image)`
  width: 100% !important;
  height: 100%;
  object-fit: scale-down;
  .ant-skeleton-image {
    width: 100% !important;
    height: 100% !important;
    object-fit: scale-down;
    .ant-skeleton-image-svg {
      width: 30% !important;
      height: 30% !important;
    }
  }
`;

export interface ImageViewProps extends ImageProps {
  id: string;
  name?: string;
  simple?: boolean;
  style?: React.CSSProperties;
}

const fallback =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ0IDIzLjk5NDFDNDQgMjIuODg5NiA0My4xMDQ2IDIxLjk5NDEgNDIgMjEuOTk0MUM0MC44OTU0IDIxLjk5NDEgNDAgMjIuODg5NiA0MCAyMy45OTQxSDQ0Wk0yNCA3Ljk5NDE0QzI1LjEwNDYgNy45OTQxNCAyNiA3LjA5ODcxIDI2IDUuOTk0MTRDMjYgNC44ODk1NyAyNS4xMDQ2IDMuOTk0MTQgMjQgMy45OTQxNFY3Ljk5NDE0Wk0zOSAzOS45OTQxSDlWNDMuOTk0MUgzOVYzOS45OTQxWk04IDM4Ljk5NDFWOC45OTQxNEg0VjM4Ljk5NDFIOFpNNDAgMjMuOTk0MVYzOC45OTQxSDQ0VjIzLjk5NDFINDBaTTkgNy45OTQxNEgyNFYzLjk5NDE0SDlWNy45OTQxNFpNOSAzOS45OTQxQzguNDQ3NzIgMzkuOTk0MSA4IDM5LjU0NjQgOCAzOC45OTQxSDRDNCA0MS43NTU2IDYuMjM4NTcgNDMuOTk0MSA5IDQzLjk5NDFWMzkuOTk0MVpNMzkgNDMuOTk0MUM0MS43NjE0IDQzLjk5NDEgNDQgNDEuNzU1NiA0NCAzOC45OTQxSDQwQzQwIDM5LjU0NjQgMzkuNTUyMyAzOS45OTQxIDM5IDM5Ljk5NDFWNDMuOTk0MVpNOCA4Ljk5NDE0QzggOC40NDE4NiA4LjQ0NzcxIDcuOTk0MTQgOSA3Ljk5NDE0VjMuOTk0MTRDNi4yMzg1OCAzLjk5NDE0IDQgNi4yMzI3MiA0IDguOTk0MTRIOFoiIGZpbGw9IiNCRUJFQkUiLz4KPHBhdGggZD0iTTYgMzVMMTYuNjkzMSAyNS4xOThDMTcuNDM4OSAyNC41MTQzIDE4LjU3NzkgMjQuNDk1MyAxOS4zNDYxIDI1LjE1MzhMMzIgMzYiIHN0cm9rZT0iI0JFQkVCRSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTI4IDMxTDMyLjc3MzUgMjYuMjI2NUMzMy40NzcyIDI1LjUyMjggMzQuNTkxNCAyNS40NDM2IDM1LjM4NzcgMjYuMDQwOEw0MiAzMSIgc3Ryb2tlPSIjQkVCRUJFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMzMgN0w0MSAxNSIgc3Ryb2tlPSIjQkVCRUJFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNNDEgN0wzMyAxNSIgc3Ryb2tlPSIjQkVCRUJFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';

const ImageView = (props: ImageViewProps) => {
  const { id, name, simple, preview, style, ...restProps } = props;

  const src = useMemo(() => getImageUrl(id), [id]);

  return (
    <Image
      fallback={fallback}
      src={src}
      preview={simple ? false : preview}
      alt={name}
      width="100%"
      height="100%"
      style={{ objectFit: 'scale-down' }}
      placeholder={<StyledSkeleton active />}
      wrapperStyle={style}
      {...restProps}
    />
  );
};

export default ImageView;
