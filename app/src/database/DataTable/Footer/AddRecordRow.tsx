import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import InsertRecordModal from '../Record/InsertRecordModal';

const StyledContainer = styled.div`
  display: flex;
  height: 32px;
  transition: all 0.2s;
  /* padding-block: 8px; */
  /* border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};*/
  border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};

  /* position: sticky; */

  /* width: calc(100% + 1px); */
  height: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colorFillQuaternary};
    svg {
      stroke: ${({ theme }) => theme.colorTextSecondary};
    }
  }
`;

const StyledInsertButton = styled.div`
  display: flex;
  width: 80px;
  align-items: center;
  justify-content: center;
  height: 32px;
`;

const AddRecordRow = observer(() => {
  const theme = useTheme();
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  return (
    <>
      <StyledContainer onClick={() => setInsertModalOpen(true)}>
        <StyledInsertButton>
          <IconPlus size={16} color={theme.colorTextTertiary} />
        </StyledInsertButton>
      </StyledContainer>
      <InsertRecordModal
        open={insertModalOpen}
        onClose={() => setInsertModalOpen(false)}
      />
    </>
  );
});

export default AddRecordRow;
