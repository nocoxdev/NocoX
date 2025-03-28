import { use, useMemo } from 'react';
import { operators, valueTypeMapOperators } from './config';
import { DataFilterContext } from './DataFilterContext';
import type { IFilterCondition } from './type';

export function useOperator(condition: IFilterCondition) {
  const { fields } = use(DataFilterContext);

  const allFields = useMemo(() => {
    return fields.flatMap((item) => {
      if ('fields' in item) {
        return item.fields;
      } else {
        return [item];
      }
    });
  }, [fields]);

  const valueTypeFilterInfo = useMemo(() => {
    const valueType = allFields.find(
      (item) => item.name === condition.name,
    )?.valueType;

    return valueType
      ? valueTypeMapOperators.find((item) => item.types.includes(valueType))
      : undefined;
  }, [condition.name]);

  const options = useMemo(() => {
    return operators
      .filter((item) => valueTypeFilterInfo?.operators.includes(item.operator))
      .map((item) => ({
        value: item.operator,
        label: item.label,
      }));
  }, [valueTypeFilterInfo]);

  const { component, props } = useMemo(() => {
    const valueType = allFields.find(
      (item) => item.name === condition.name,
    )?.valueType;

    const valueTypeFilterInfo = valueType
      ? valueTypeMapOperators.find((item) => item.types.includes(valueType))
      : undefined;

    return condition.operator &&
      operators.find((item) => item.operator === condition.operator)?.hasValue
      ? {
          component: valueTypeFilterInfo?.valueComponent,
          props: valueTypeFilterInfo?.props,
        }
      : {};
  }, [condition.operator]);

  return { options, component, props };
}
