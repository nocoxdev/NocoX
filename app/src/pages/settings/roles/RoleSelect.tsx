import { useRequest } from 'ahooks';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { RoleApi } from '@/services/api';

const RoleSelect = observer((props: SelectProps) => {
  const { data: resp, loading } = useRequest(RoleApi.getList);

  return (
    <Select
      {...props}
      value={loading ? [] : props.value}
      loading={loading}
      options={resp?.data?.map((item) => ({
        value: item.id,
        label: item.name,
      }))}
    />
  );
});

export default RoleSelect;
