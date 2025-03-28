import { useControllableValue } from 'ahooks';
import { Space } from 'antd';
import type { Variant } from 'antd/es/config-provider';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { t } from 'i18next';
import { styled } from 'styled-components';
import ControlLayout from '@/editor/controls/common/ControlLayout';
import type { ValueLabel } from '@/types';
import InputControl from '../../InputControl';

const StyledEditContainer = styled.div`
  display: flex;
  min-width: 300px;
  height: 100%;
  position: relative;
`;

export interface EditBoxProps {
  value?: ValueLabel<any>;
  onChange: (option: ValueLabel<any>) => void;
  size?: SizeType;
  variant?: Variant;
}

const EditBox = (props: EditBoxProps) => {
  const [option, setOption] = useControllableValue(props);

  const { size, variant } = props;

  return (
    <StyledEditContainer>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ControlLayout label={t('Display text')} size={size}>
          <InputControl
            name={option.label}
            value={option.label}
            onChange={(val) => setOption({ label: val, value: val })}
            size={size}
            variant={variant}
          />
        </ControlLayout>
      </Space>
    </StyledEditContainer>
  );
};

export default EditBox;
