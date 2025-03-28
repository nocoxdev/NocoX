import { Fragment, useState } from 'react';
import { useInterval } from 'ahooks';
import { useTheme } from 'styled-components';

interface IconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const SuccessIcon = (props: IconProps) => {
  const { size, color, style } = props;
  const theme = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || theme.colorTextSecondary || 'currentColor'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 18.004h-4.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.388 0 2.585 .82 3.138 2.007" />
      <circle
        cx="17"
        cy="17"
        r="6"
        fill={theme.colorSuccess}
        stroke={theme.colorSuccess}
      />
      <path d="M14 18L16 20L20 16" stroke="white" />
    </svg>
  );
};

export const UploadingIcon = (props: IconProps) => {
  const { size, color, style } = props;
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  useInterval(() => {
    setVisible((pre) => !pre);
  }, 400);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      stroke={color || theme.colorTextSecondary || 'currentColor'}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 18.004h-5.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.38 0 2.57 .811 3.128 1.986" />

      <circle
        cx="17.5"
        cy="17.5"
        r="5.5"
        fill={theme.colorPrimary}
        stroke={theme.colorPrimary}
      />
      {visible && (
        <Fragment>
          <path d="M18 21V15" stroke="white" />
          <path d="M21 18L18 15L15 18" stroke="white" />
        </Fragment>
      )}
    </svg>
  );
};
export const FailureIcon = (props: IconProps) => {
  const { size, color, style } = props;
  const theme = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      stroke={color || theme.colorTextSecondary || 'currentColor'}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 18.004h-8.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.374 0 2.562 .805 3.121 1.972" />
      <circle
        cx="17.5"
        cy="17.5"
        r="5.5"
        fill={theme.colorHighlight}
        stroke={theme.colorHighlight}
      />

      <path d="M18 15V18" stroke="white" />
      <path d="M18 21V21.01" stroke="white" />
    </svg>
  );
};
