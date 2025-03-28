import { Flex, Tooltip } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { styled } from 'styled-components';
import { useControlSize } from '@/utils/hooks';

const StyledLabel = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colorTextSecondary};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize}px;
  justify-content: space-between;
  user-select: none;
  min-width: 30px;

  > span {
    display: flex;
    height: 20px;
    border-bottom: 1px dashed #bbb;
    cursor: help;
  }
`;

const StyledRequiredMark = styled.span`
  color: ${({ theme }) => theme.colorErrorText};
  font-weight: 600;
  font-size: 16px;
  margin-left: 2px;
`;

export interface LabelProps {
  size?: SizeType;
  label?: string;
  helpText?: string;
  labelStyle?: React.CSSProperties;
  required?: boolean;
  extra?: React.ReactNode;
}

const Label = (props: LabelProps) => {
  const { label, helpText, size, required, extra } = props;

  const height = useControlSize(size);

  const labelContent = required ? (
    <Flex align="center">
      {label}
      <StyledRequiredMark>*</StyledRequiredMark>
    </Flex>
  ) : (
    label
  );

  return (
    <StyledLabel $height={height}>
      {helpText ? (
        <Tooltip placement="topLeft" title={helpText}>
          <span style={{ marginRight: 2 }}>{labelContent}</span>
        </Tooltip>
      ) : (
        labelContent
      )}
      {extra && <div>{extra}</div>}
    </StyledLabel>
  );
};

export default Label;
