import type { Variant } from 'antd/es/config-provider';
import { css } from 'styled-components';

export function genFilledStyle(variant: Variant | undefined) {
  const filled = variant === 'filled';

  return css`
    border: 1px solid
      ${({ theme }) =>
        filled ? theme.colorFillTertiary : theme.colorBorderSecondary};

    &:hover {
      border-color: ${({ theme }) =>
        filled ? theme.colorFillTertiary : theme.colorPrimaryHover};
    }

    > .prefix {
      background: ${({ theme }) => (filled ? theme.colorFillTertiary : '#fff')};
    }
  `;
}
