import { HOST } from '@/constants';

export function getFileUrl(id: string, extension?: string) {
  return `${HOST}/resource/${id}${extension ? `.${extension}` : ''}`;
}

export function getImageUrl(id: string, extension?: string) {
  return `${HOST}/image/${id}${extension ? `.${extension}` : ''}`;
}
