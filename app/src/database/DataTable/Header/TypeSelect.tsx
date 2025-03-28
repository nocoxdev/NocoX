import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCurrentTable } from '@/database/selectors';
import { ColumnTitle } from '../components';
import { configs } from '../configs';

const TypeSelect = observer((props: SelectProps) => {
  const table = useCurrentTable();
  const renderLabel = (value: string | number | undefined) => {
    const conf = configs
      .filter((item) => !item.primaryKey)
      .find((item) => item.type === value);
    if (!conf) return <span>Not found</span>;

    return (
      <ColumnTitle
        title={conf.title}
        type={conf.type}
        system={conf.system}
        primaryKey={conf.primaryKey}
      />
    );
  };

  const options = configs
    .filter(
      (item) =>
        !item.primaryKey &&
        !table.columnStore.sysColumns.map((c) => c.uiType).includes(item.type),
    )
    .map((item) => ({
      label: item.title,
      value: item.type,
    }));

  return (
    <Select
      options={options}
      labelRender={({ value }) => renderLabel(value)}
      optionRender={({ value }) => renderLabel(value)}
      {...props}
    />
  );
});

export default TypeSelect;
