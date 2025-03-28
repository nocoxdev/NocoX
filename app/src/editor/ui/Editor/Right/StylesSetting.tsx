import { Col, Row } from 'antd';
import { t } from 'i18next';
import { debounce, isFunction } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import type { CollapseProps } from '@/components/Collapse';
import Collapse from '@/components/Collapse';
import Empty from '@/components/Empty';
import ControlLayout from '@/editor/controls/common/ControlLayout';
import styleControls from '@/editor/controls/styles';
import { useSelection } from '../../../selectors';
import { StyledContainer } from './styled';

const StylesSetting = observer(() => {
  const { node } = useSelection();

  if (!node) {
    return <Empty description={t('Please select widget')} />;
  }

  const styleGroups = node.widget.styleGroups || [];

  const panels: CollapseProps[] = styleGroups.map((group) => {
    const { name, label, children } = group;

    return {
      name,
      label,
      children: (
        <Row gutter={[8, 12]} style={{ width: '100%' }}>
          {children.map((config) => {
            const cbArgs = node.getCbArgs(config.name);

            const visible = isFunction(config.visible)
              ? config.visible(cbArgs)
              : config.visible !== false;

            if (!visible) return null;

            const Component = styleControls.find(
              (c) => c.name === config.control,
            )?.control;
            if (!Component) return null;

            const controlProps = isFunction(config.controlProps)
              ? config.controlProps(cbArgs)
              : config.controlProps;

            return (
              <Col span={config.span || 24} key={config.name}>
                <ControlLayout
                  label={config.label}
                  helpText={config.helpText}
                  required={config.required}
                  direction={config.direction}
                  labelStyle={config.labelStyle}
                  size="small"
                >
                  <Component
                    name={config.name}
                    size="small"
                    node={node}
                    defaultValue={node.styles.record[config.name]}
                    onChange={debounce(
                      (value: any) => node.styles.set(config.name, value),
                      20,
                    )}
                    controlProps={controlProps}
                  />
                </ControlLayout>
              </Col>
            );
          })}
        </Row>
      ),
    };
  });

  return (
    <StyledContainer key={node.id}>
      {panels.map((panel) => (
        <Collapse
          key={panel.name}
          {...panel}
          headerStyle={{ paddingInline: 16 }}
          contentStyle={{ paddingLeft: 16 }}
        />
      ))}
    </StyledContainer>
  );
});

export default StylesSetting;
