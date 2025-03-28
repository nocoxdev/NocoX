import { useState } from 'react';
import { IconPencil } from '@tabler/icons-react';
import { Flex } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import { isArray } from 'lodash-es';
import { styled } from 'styled-components';
import { useControlSize } from '@/utils/hooks';
import DraggablePopover from '../DraggablePopover';

const StyledOptionContainer = styled.div<{ $height: number }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  height: ${({ $height }) => $height - 2}px;
`;

const StyledPopoverWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  width: 0px;
  height: 0px;
`;

const StyleOptionContent = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  font-size: ${({ theme }) => theme.fontSize}px;
  color: ${({ theme }) => theme.colorText};
`;

const StyledOptionActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 40px;
  height: 100%;
`;

const StyledOptionActionItem = styled.div<{
  $height: number;
  $width: number;
}>`
  display: flex;
  width: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colorTextTertiary};
  height: ${({ $height }) => $height - 2}px;
  font-size: ${({ theme }) => theme.fontSize}px;

  &:hover {
    color: ${({ theme }) => theme.colorTextSecondary};
  }
`;

export type OptionItemType = {
  key: string;
  label: string | string[] | React.ReactNode;
  panel?: React.ReactNode | (() => React.ReactNode);
};

export interface OptionItemProps {
  size?: SizeType;
  option: OptionItemType;
}

const OptionItem = (props: OptionItemProps) => {
  const { option, size } = props;
  const { panel } = option;
  const [open, setOpen] = useState(false);
  const height = useControlSize(size);

  const label = isArray(option.label) ? (
    <Flex gap={6} style={{ width: '100%' }}>
      {option.label.map((item) => {
        return <span key={item}>{item}</span>;
      })}
    </Flex>
  ) : (
    option.label
  );

  return (
    <StyledOptionContainer $height={height}>
      {panel && (
        <StyledPopoverWrapper>
          <DraggablePopover
            title={t('Edit')}
            content={panel}
            open={open}
            onOpenChange={(val) => setOpen(val)}
            trigger="click"
            arrow={false}
          />
        </StyledPopoverWrapper>
      )}
      <Flex
        align="center"
        justify="space-between"
        style={{ width: '100%', height: '100%' }}
      >
        <StyleOptionContent
          style={{ width: `calc(100% - ${panel ? 24 : 0}px)` }}
        >
          {label}
        </StyleOptionContent>

        {panel && (
          <StyledOptionActions>
            <StyledOptionActionItem
              onClick={() => setOpen(true)}
              $width={height}
              $height={height}
            >
              <IconPencil stroke={1.5} size={13} />
            </StyledOptionActionItem>
          </StyledOptionActions>
        )}
      </Flex>
    </StyledOptionContainer>
  );
};

export default OptionItem;
