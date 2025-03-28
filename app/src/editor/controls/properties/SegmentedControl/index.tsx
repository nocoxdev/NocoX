import type { SegmentedProps } from 'antd';
import { Segmented } from 'antd';
import { styled } from 'styled-components';
import type { ControlProps } from '@/editor/controls/type';

const StyledContainer = styled.div`
  width: 100%;
`;

const SegmentedControl = (props: ControlProps<SegmentedProps>) => {
  const { defaultValue, size, onChange, controlProps } = props;

  const { options = [], ...restProps } = controlProps || {};

  return (
    <StyledContainer>
      <Segmented
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
        size={size}
        {...restProps}
      />
    </StyledContainer>
  );
};

export default SegmentedControl;
