import { use } from 'react';
import { useParams } from 'react-router';
import { NodeContext } from '../context';

export function useFormDataId() {
  const { dataId } = useParams();
  const { node } = use(NodeContext);

  return node.mergedAttachedParams?.['dataId'] || dataId;
}
