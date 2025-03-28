import type { ComponentType } from 'react';
import type { IconProps } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import DragSource from './DragSource';

const StyledItemWrapper = styled.div`
  display: flex;
  padding: 4px 8px 4px 8px;
  border-radius: 4px;
  border: none;
  position: relative;
  height: 28px;
  align-items: center;
  justify-content: left;
  flex-direction: row;
  transition: all 0.2s;
  cursor: grab;
  border: 1px solid #eee;
  gap: 4px;
  user-select: none;
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.colorPrimary}`};
  }
`;

const StyledItemIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

const StyledItemTitle = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.colorText};
  user-select: none;
`;

export type WidgetProps = {
  icon?: ComponentType<IconProps>;
  title: string;
  name: string;
  tags?: string[];
};

const Item = observer((props: WidgetProps) => {
  const { icon: Icon, title, name } = props;

  const theme = useTheme();

  return (
    <DragSource name={name}>
      <StyledItemWrapper>
        <StyledItemIconWrapper>
          {Icon && <Icon size={14} color={theme.colorPrimary} />}
        </StyledItemIconWrapper>
        <StyledItemTitle>{title}</StyledItemTitle>
      </StyledItemWrapper>
    </DragSource>
  );
});

export default Item;
