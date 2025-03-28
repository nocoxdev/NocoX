import { Fragment } from 'react';
import { IconX } from '@tabler/icons-react';
import { Button } from 'antd';
import { styled } from 'styled-components';

const StyledModalHeader = styled.div`
  padding-inline: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  position: relative;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  gap: 4px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colorText};
  font-weight: 600;
  font-size: 13px;
`;

const StyledRightButtons = styled.div`
  position: absolute;
  right: 7px;
  top: 7px;
  display: flex;
  gap: 4px;

  button {
    transition: all 0.2s;
    svg {
      color: ${({ theme }) => theme.colorTextTertiary} !important;
      stroke: ${({ theme }) => theme.colorTextTertiary} !important;
    }

    &:hover {
      svg {
        color: ${({ theme }) => theme.colorTextSecondary} !important;
        stroke: ${({ theme }) => theme.colorTextSecondary} !important;
      }
    }

    &.danger {
      svg {
        color: ${({ theme }) => theme.colorErrorText} !important;
        stroke: ${({ theme }) => theme.colorErrorText} !important;
      }
      &:hover {
        svg {
          color: ${({ theme }) => theme.colorErrorTextActive} !important;
          stroke: ${({ theme }) => theme.colorErrorTextActive} !important;
        }
      }
    }
  }
`;

interface ModalHeaderProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  expandButtons?: { name: string; children: React.ReactNode }[];
  onClose?: () => void;
}

const ModalHeader = (props: ModalHeaderProps) => {
  const { children, style, expandButtons, onClose } = props;

  return (
    <StyledModalHeader style={style}>
      <StyledTitle>{children}</StyledTitle>

      <StyledRightButtons>
        {expandButtons?.map((item) => (
          <Fragment key={item.name}>{item.children}</Fragment>
        ))}
        {onClose && (
          <Button
            type="text"
            icon={<IconX stroke={2} size={16} />}
            size="small"
            onClick={() => onClose()}
          />
        )}
      </StyledRightButtons>
    </StyledModalHeader>
  );
};

export default ModalHeader;
