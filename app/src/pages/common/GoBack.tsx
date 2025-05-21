import { useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons-react';
import { Button } from 'antd';
import { t } from 'i18next';
import { styled, useTheme } from 'styled-components';

const StyledTitleContainer = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
  padding-inline: 8px;
  gap: 4px;
  color: ${({ theme }) => theme.colorPrimaryTextActive};
  font-weight: 500;
  cursor: pointer;
`;

interface GoBackProps {
  title: string;
  path?: string;
}

const GoBack = ({ title, path = '/' }: GoBackProps) => {
  const theme = useTheme();

  const navigate = useNavigate();
  return (
    <StyledTitleContainer>
      <Button
        variant="solid"
        color="primary"
        onClick={() => navigate(path)}
        size="small"
        block
      >
        <IconArrowLeft size={12} />
        <span>{t('Back')}</span>
      </Button>
    </StyledTitleContainer>
  );
};

export default GoBack;
