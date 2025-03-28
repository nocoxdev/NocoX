import { Flex } from 'antd';
import type { FlexProps } from 'antd';
import { styled } from 'styled-components';

const StyledFlex = styled(Flex)`
  border: 1px dashed #aaa;
  border-radius: 2px;
  height: 16px;
  width: 24px;
`;

const StyledItem = styled.div<{ height: number }>`
  width: 4px;
  min-height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.colorPrimary};
  box-sizing: border-box;
`;

interface FlexAlignSampleProps {
  align?: FlexProps['align'];
}

const FlexAlignSample = (props: FlexAlignSampleProps) => {
  const { align = 'flex-start' } = props;

  return (
    <StyledFlex align={align} gap={2} justify="center">
      <StyledItem height={4} />
      <StyledItem height={8} />
      <StyledItem height={6} />
    </StyledFlex>
  );
};

export default FlexAlignSample;
