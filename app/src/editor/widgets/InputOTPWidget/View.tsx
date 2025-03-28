import { Input } from 'antd';
import type { OTPProps } from 'antd/es/input/OTP';
import { styled } from 'styled-components';
import type { WidgetProps } from '@/types';

const StyledWrapper = styled.div`
  display: inline-flex;
`;

const InputOTPView = (props: WidgetProps<OTPProps>) => {
  const { className, ...restProps } = props;

  return (
    <StyledWrapper className={className}>
      <Input.OTP {...restProps} />
    </StyledWrapper>
  );
};

export default InputOTPView;
