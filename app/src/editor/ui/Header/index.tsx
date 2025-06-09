import { StyledHeaderContainer } from '@/components/common.styled';
import Left from './Left';
import Right from './Right';

const Header = () => {
  return (
    <StyledHeaderContainer>
      <Left />
      <Right />
    </StyledHeaderContainer>
  );
};

export default Header;
