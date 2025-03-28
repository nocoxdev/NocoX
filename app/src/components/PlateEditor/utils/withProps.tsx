import type { Ref } from 'react';
import React from 'react';
import classNames from 'classnames';

export function withProps<
  T extends keyof HTMLElementTagNameMap | React.ComponentType<any>,
>(Component: T, defaultProps: Partial<React.ComponentPropsWithoutRef<T>>) {
  const ComponentWithClassName = Component as React.FC<{ className: string }>;

  return (props: { ref: Ref<T> } & React.ComponentPropsWithoutRef<T>) => {
    return (
      <ComponentWithClassName
        {...defaultProps}
        {...props}
        className={classNames(defaultProps.className, props.className)}
      />
    );
  };
}
