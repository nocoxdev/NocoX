import { ReloadOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import { t } from 'i18next';
import styled, { useTheme } from 'styled-components';

const StyledToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colorText};
`;

interface ToolbarProps {
  onReload: () => void;
}

const Toolbar = (props: ToolbarProps) => {
  const { onReload } = props;
  const theme = useTheme();

  return (
    <StyledToolbarContainer>
      <StyledTitle>{t('My apps')}</StyledTitle>
      <Flex gap={4}>
        <Tooltip title={t('Reload')} placement="top">
          <Button
            type="text"
            size="small"
            icon={<ReloadOutlined />}
            onClick={onReload}
            style={{ color: theme.colorTextTertiary }}
          />
        </Tooltip>
      </Flex>
    </StyledToolbarContainer>
  );
};

export default Toolbar;
