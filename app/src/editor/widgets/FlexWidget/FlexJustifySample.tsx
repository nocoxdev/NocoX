import { Flex } from 'antd';
import type { FlexProps } from 'antd';
import { styled } from 'styled-components';

const StyledFlex = styled(Flex)`
  border: 1px dashed #aaa;
  border-radius: 2px;
  height: 16px;
  width: 24px;
`;

const StyledItem = styled.div<{ width: number }>`
  height: 8px;
  width: ${({ width }) => width}px;
  background-color: ${({ theme }) => theme.colorPrimary};
  box-sizing: border-box;
`;

interface FlexJustifySampleProps {
  justify?: FlexProps['justify'];
  height?: number;
  width?: number;
}

const FlexJustifySample = (props: FlexJustifySampleProps) => {
  const { justify = 'flex-start' } = props;

  return (
    <StyledFlex justify={justify} align="center" gap={2}>
      <StyledItem width={4} />
      <StyledItem width={5} />
      <StyledItem width={4} />
    </StyledFlex>
  );
};

export default FlexJustifySample;
