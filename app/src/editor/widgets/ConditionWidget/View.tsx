import { use, useMemo } from 'react';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import {
  FilterConjunction,
  type IFilterInfo,
} from '@/components/DataFilter/type';
import { applyCondition } from '@/components/DataFilter/utils';
import NoWidget from '@/components/NoWidget';
import { NodeContext } from '@/editor/context';
import { useAppRunningMode } from '@/editor/selectors';
import { hasChildren } from '@/utils/helpers';

const StyledContainr = styled.div`
  width: 100%;
`;

export interface ConditionCellWidgetProps {
  visible?: boolean;
  filter?: IFilterInfo;
  children?: React.ReactNode | undefined;
  style?: React.CSSProperties;
  className?: string;
}

const ConditionView = observer((props: ConditionCellWidgetProps) => {
  const { filter, children, style, className, visible } = props;

  const mode = useAppRunningMode();

  const { node } = use(NodeContext);

  const isVisible = useMemo(() => {
    if (mode === 'edit' && visible === true) {
      return true;
    }

    if (!filter) {
      return true;
    }

    const states = node.contextStates
      ?.flatMap((item) => item.items)
      .reduce<Record<string, any>>(
        (acc, item) => ({
          ...acc,
          [item.name]: item.value,
        }),
        {},
      );

    if (filter.conjunction === FilterConjunction.Or) {
      return filter.conditions.some(
        (item) =>
          item.name &&
          applyCondition(states[item.name], item.value, item.operator),
      );
    } else {
      return filter.conditions.every(
        (item) =>
          item.name &&
          applyCondition(states[item.name], item.value, item.operator),
      );
    }
  }, [filter, node.contextStates, visible]);

  return (
    isVisible && (
      <StyledContainr className={className} style={style}>
        {hasChildren(children) ? (
          children
        ) : (
          <NoWidget height={28} description={t('Drag components here')} />
        )}
      </StyledContainr>
    )
  );
});

export default ConditionView;
