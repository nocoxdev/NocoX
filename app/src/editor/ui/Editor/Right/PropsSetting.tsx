import { Fragment } from 'react';
import { Col, Row } from 'antd';
import { t } from 'i18next';
import { debounce, isArray, isFunction } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import type { CollapseProps } from '@/components/Collapse';
import Collapse from '@/components/Collapse';
import Empty from '@/components/Empty';
import ControlLayout from '@/editor/controls/common/ControlLayout';
import propertyControls from '@/editor/controls/properties';
import { useSelection } from '@/editor/selectors';
import type { PageNode } from '@/editor/stores';
import type { WidgetPropConfig } from '@/types';
import { StyledContainer } from './styled';

const PropsSetting = observer(() => {
  const { node } = useSelection();

  if (!node) {
    return <Empty description={t('Please select widget')} />;
  }

  const renderControl = (node: PageNode, config: WidgetPropConfig) => {
    const cbArgs = node.getCbArgs(config.name);

    const visible = isFunction(config.visible)
      ? config.visible(cbArgs) === true
      : config.visible !== false;
    if (!visible) {
      return null;
    }

    if (isArray(config.children) && config.children.length > 0) {
      return (
        <Col span={config.span || 24} key={config.name}>
          <ControlLayout
            label={config.label}
            helpText={config.helpText}
            required={config.required}
            direction={config.direction}
            labelStyle={config.labelStyle}
          >
            <Row gutter={[8, 16]} style={{ width: '100%' }}>
              {config.children.map((child) => {
                return (
                  <Fragment key={child.name}>
                    {renderControl(node, child)}
                  </Fragment>
                );
              })}
            </Row>
          </ControlLayout>
        </Col>
      );
    }

    const controlName = isFunction(config.control)
      ? config.control(cbArgs)
      : config.control;

    const Control = propertyControls.find(
      (c) => c.name === controlName,
    )?.control;

    const prop = node.props.list.find((p) => p.name === config.name);

    return (
      Control && (
        <Col span={config.span || 24} key={config.name}>
          <ControlLayout
            size="small"
            label={config.label}
            helpText={config.helpText}
            required={config.required}
            direction={config.direction}
            labelStyle={config.labelStyle}
            validation={config.validate?.(cbArgs)}
          >
            <Control
              node={node}
              childrenNodes={node.children}
              name={config.name}
              defaultValue={prop?.value}
              onChange={debounce((value: any) => {
                node.props.set(config.name, value);
                isFunction(config.onChange) && config.onChange(cbArgs, value);
              }, 20)}
              size="small"
              controlProps={
                isFunction(config.controlProps)
                  ? config.controlProps(cbArgs)
                  : config.controlProps
              }
            />
          </ControlLayout>
        </Col>
      )
    );
  };

  const propGroups = node.widget.propGroups || [];

  const groupPanels: CollapseProps[] = propGroups.map((group) => {
    const { name, label } = group;

    return {
      name,
      label,
      children: (
        <Row gutter={[8, 12]} style={{ width: '100%' }}>
          {group.children.map((p) => {
            return <Fragment key={p.name}>{renderControl(node, p)}</Fragment>;
          })}
        </Row>
      ),
    };
  });

  return (
    <StyledContainer key={node.id}>
      {groupPanels.map((panel) => (
        <Collapse
          key={panel.name}
          headerStyle={{ paddingInline: '16px 12px' }}
          contentStyle={{ paddingLeft: 16 }}
          {...panel}
        />
      ))}
    </StyledContainer>
  );
});

export default PropsSetting;
