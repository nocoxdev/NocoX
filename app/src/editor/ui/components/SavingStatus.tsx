import { Flex, Tooltip } from 'antd';
import { t } from 'i18next';
import styled from 'styled-components';
import type { RequestStatus } from '@/stores';
import { FailureIcon, SuccessIcon, UploadingIcon } from './icons';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  span {
    color: ${({ theme }) => theme.colorText};
    font-size: 10px;
    line-height: 18px;
    padding-top: 4px;
  }
`;

interface SavingStatusProps {
  status?: RequestStatus;
  error?: string;
}

const renderStatus = (status: RequestStatus, error?: string) => {
  switch (status) {
    case 'pending':
      return <UploadingIcon size={18} />;
    case 'error':
      return (
        <Tooltip title={error}>
          <Flex gap={4} align="center">
            <FailureIcon size={18} />
            <span>{t('Save Changes failed')}</span>
          </Flex>
        </Tooltip>
      );
    default:
      return (
        <Flex gap={4} align="center">
          <SuccessIcon size={18} />
          <span>{t('Changes saved')}</span>
        </Flex>
      );
  }
};

const SavingStatus = (props: SavingStatusProps) => {
  const { status, error } = props;

  return (
    status && <StyledContainer>{renderStatus(status, error)}</StyledContainer>
  );
};

export default SavingStatus;
