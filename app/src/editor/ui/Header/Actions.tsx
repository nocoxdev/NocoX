import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconDeviceFloppy,
} from '@tabler/icons-react';
import { Button, Divider, Tooltip } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import { useMessage } from '@/selectors';
import { useApp, useCurPage } from '../../selectors';

const StyledContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const StyledActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 100%;
`;

const Actions = observer(() => {
  const curPage = useCurPage();
  const app = useApp();
  const message = useMessage();
  const theme = useTheme();
  return (
    <StyledContainer>
      {curPage && (
        <StyledActionButtons>
          <Tooltip title={curPage.history.canUndo && t('Undo')}>
            <Button
              type="text"
              onClick={() => curPage.undo()}
              disabled={!curPage.history.canUndo}
              icon={<AntdIcon content={IconArrowBackUp} stroke={1} size={16} />}
            />
          </Tooltip>
          <Tooltip title={curPage.history.canRedo && t('Redo')}>
            <Button
              type="text"
              onClick={() => curPage.redo()}
              disabled={!curPage.history.canRedo}
              icon={
                <AntdIcon content={IconArrowForwardUp} stroke={1} size={16} />
              }
            />
          </Tooltip>
          <Divider type="vertical" style={{ height: 16 }} />
          <Tooltip title={t('Save')} arrow={true} placement="bottom">
            <Button
              size="small"
              type="text"
              icon={
                <AntdIcon
                  content={IconDeviceFloppy}
                  stroke={1.5}
                  size={16}
                  color={theme.colorPrimaryText}
                />
              }
              onClick={async () => {
                if (app.curPage) {
                  const resp = await app.saveData(
                    'ManualSave',
                    app.curPage.jsonString,
                  );

                  if (resp?.success) {
                    message.success(t('Save success'));
                  } else {
                    message.error(resp?.message);
                  }
                }
              }}
            />
          </Tooltip>
        </StyledActionButtons>
      )}
    </StyledContainer>
  );
});

export default Actions;
