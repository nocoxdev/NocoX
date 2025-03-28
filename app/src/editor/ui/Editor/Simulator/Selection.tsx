import { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import { useSelection } from '../../../selectors';
import Border from './Border';
import SelectionToolbar from './SelectionToolbar';

const StyledBorderWrapper = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 0;
`;

const Selection = observer(() => {
  const selection = useSelection();

  return (
    selection.visible && (
      <Fragment>
        <SelectionToolbar
          label={selection?.label || ''}
          icon={selection.icon}
          style={selection.styles?.toolbar}
        />

        <StyledBorderWrapper
          style={{
            ...selection.styles?.container,
            ...(selection.label && {
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }),
          }}
        >
          <Border style={selection.styles?.border} />
        </StyledBorderWrapper>
      </Fragment>
    )
  );
});

export default Selection;
