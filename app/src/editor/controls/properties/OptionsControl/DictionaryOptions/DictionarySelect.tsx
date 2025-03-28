import type { SelectProps } from 'antd';
import { Select } from 'antd';

const DictionarySelect = (props: SelectProps) => {
  return <Select {...props} showSearch />;
};

export default DictionarySelect;
