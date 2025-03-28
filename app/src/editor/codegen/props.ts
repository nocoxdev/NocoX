import type {
  FlattenWidgetPropConfig,
  FlattenWidgetStyleConfig,
  WidgetPropConfig,
  WidgetPropGroupConfig,
  WidgetStyleConfig,
  WidgetStyleGroupConfig,
} from '@/types';

export function flattenWidgetProps(props: WidgetPropGroupConfig[]) {
  const flatFn = (
    props: WidgetPropConfig[],
    pName: string,
  ): FlattenWidgetPropConfig[] => {
    return props.flatMap((prop) => {
      return [{ ...prop, pName }, ...flatFn(prop.children || [], prop.name)];
    });
  };

  return props.flatMap((group) => {
    return flatFn(group.children, '');
  });
}

export function flattenWidgetStyles(styles: WidgetStyleGroupConfig[]) {
  const flatFn = (
    styles: WidgetStyleConfig[],
    pName: string,
  ): FlattenWidgetStyleConfig[] => {
    return styles.flatMap((style) => {
      return [{ ...style, pName }, ...flatFn(style.children || [], style.name)];
    });
  };

  return styles.flatMap((group) => {
    return flatFn(group.children, '');
  });
}
