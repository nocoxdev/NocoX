import { IconDots } from '@tabler/icons-react';
import { Button, Popover } from 'antd';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import { styled, useTheme } from 'styled-components';
import AntdIcon from '@/components/AntdIcon';
import { fromNow } from '@/utils/helpers';
import { useCurApp } from '../selectors';
import PopoverContent from './AppCardPopoverContent';

export const StyledAppCardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  height: 28px;
  gap: 8px;
`;

const StyledModified = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.colorTextTertiary};

  > div {
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .modifier {
    width: 40%;
    overflow: hidden;
  }

  .time {
    text-align: right;
    justify-content: flex-end;
    width: 60%;
  }
`;

const AppFooter = observer(() => {
  const app = useCurApp();
  const theme = useTheme();

  const modifiedAt = fromNow(app.data.lastModificationTime);

  return (
    app && (
      <StyledAppCardFooter>
        <StyledModified>
          <div className="modifier"> {app.data.lastModifier}</div>
          <div className="time" title={modifiedAt}>
            {t('Modified')} {modifiedAt}
          </div>
        </StyledModified>

        <Popover
          trigger={['click']}
          placement="right"
          content={<PopoverContent />}
          autoAdjustOverflow
          arrow={false}
          styles={{
            body: {
              padding: '4px 4px 8px 4px',
            },
          }}
        >
          <Button
            type="text"
            size="small"
            icon={
              <AntdIcon content={IconDots} size={13} color={theme.colorText} />
            }
            style={{ height: 24, width: 24 }}
          />
        </Popover>
      </StyledAppCardFooter>
    )
  );
});

export default AppFooter;
