import { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';
import { NODE_TOOLBAR_HEIGHT } from '@/editor/constants';
import { useCanvas } from '../../../selectors';
import Border from './Border';

const StyledBorderContainer = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 1;
`;

const StyledTitle = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  width: auto;
  height: ${NODE_TOOLBAR_HEIGHT}px;
  pointer-events: none;
  background-color: ${({ theme }) => theme.colorSuccess};
  padding: 0 6px;
  border-radius: 4px;

  user-select: none;
  > span {
    overflow: hidden;
    color: #fff;
    font-size: 10px;
    white-space: nowrap;
  }
`;

const Hovering = observer(() => {
  const canvas = useCanvas();
  const theme = useTheme();
  const { hovering } = canvas;
  const { styles, label, visible } = hovering;

  const containerStyle = {
    ...styles?.container,
    ...(label && {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    }),
  };

  return (
    visible && (
      <Fragment>
        <StyledBorderContainer style={containerStyle}>
          <Border color={theme.colorSuccess} style={styles?.border} />
        </StyledBorderContainer>
        {label && (
          <StyledTitle style={styles?.title}>
            <span>{label}</span>
          </StyledTitle>
        )}
      </Fragment>
    )
  );
});

export default Hovering;
