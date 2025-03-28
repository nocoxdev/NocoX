import { Input } from 'antd';
import type { OTPProps } from 'antd/es/input/OTP';
import type { ControlProps } from '@/editor/controls/type';

const InputOTPControl = (props: ControlProps<OTPProps>) => {
  const { defaultValue, size, variant, controlProps = {}, onChange } = props;

  return (
    <Input.OTP
      defaultValue={defaultValue}
      onChange={(val) => onChange?.(val)}
      {...controlProps}
      size={size}
      variant={variant}
    />
  );
};

export default InputOTPControl;
