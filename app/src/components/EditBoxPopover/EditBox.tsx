import SegementTabs from '@/components/SegementTabs';
import type { SegementTabItem } from '@/components/SegementTabs/type';

export interface EditBoxProps {
  items: SegementTabItem[];
  defaultActiveKey?: string;
  onItemChange?: (key: string) => void;
}

const EditBox = (props: EditBoxProps) => {
  return <SegementTabs {...props} />;
};

export default EditBox;
