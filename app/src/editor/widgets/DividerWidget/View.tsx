import type { DividerProps } from 'antd';
import { Divider } from 'antd';
import { styled, useTheme } from 'styled-components';

const StyledVerticalDivider = styled.div<{
  $margin?: number;
  $height?: number;
}>`
  display: inline-flex;
  align-items: center;

  > div {
    margin-inline: ${({ $margin }) => $margin || 4}px;
    width: 0px;
    height: ${({ $height }) => $height || 24}px;
    border-inline-end: 1px solid transparent;
  }
`;

interface DividerViewProps extends DividerProps {
  margin?: number;
  height?: number;
  color?: string;
}

const DividerView = (props: DividerViewProps) => {
  const { type, className, style, margin, height, color } = props;

  const theme = useTheme();
  const mergedStyle = {
    ...style,
    borderColor: color || theme.colorBorderSecondary,
  };

  return type === 'vertical' ? (
    <StyledVerticalDivider
      $margin={margin}
      $height={height}
      className={className}
    >
      <div style={mergedStyle} />
    </StyledVerticalDivider>
  ) : (
    <Divider {...props} style={mergedStyle} rootClassName={className} />
  );
};

export default DividerView;
