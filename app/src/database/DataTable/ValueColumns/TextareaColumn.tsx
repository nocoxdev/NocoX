import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import { styled } from 'styled-components';
import type { ValueComponentProps } from '@/types';

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  position: relative;
`;

interface TextareaColumnProps
  extends Omit<TextAreaProps, 'onChange' | 'onPressEnter'> {}

export const TextareaColumn = (
  props: TextareaColumnProps & ValueComponentProps,
) => {
  const { onChange, ...rest } = props;

  return (
    <StyledContainer>
      <Input.TextArea
        {...rest}
        onChange={(e) => onChange?.(e.target.value)}
        rows={5}
        autoFocus
        style={{ width: '100%' }}
      />
    </StyledContainer>
  );
};
