import type { SelectProps } from 'antd';
import { Select as AntdSelect } from 'antd';
import { StyledPrefixContainer, StyledSelectWrapper } from './style';

export interface SelectWithPrefixProps extends SelectProps {
  prefix?: React.ReactNode;
}

const Select = (props: SelectWithPrefixProps) => {
  const { prefix, variant, style, ...restProps } = props;

  return (
    <StyledSelectWrapper $variant={variant} style={style}>
      <StyledPrefixContainer className="prefix">{prefix}</StyledPrefixContainer>
      <AntdSelect {...restProps} variant={variant}></AntdSelect>
    </StyledSelectWrapper>
  );
};
export default Select;
