import { useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { t } from 'i18next';
import { isFunction } from 'lodash-es';
import OptionList from '@/components/OptionList';
import type { OptionItemType } from '@/components/OptionList/OptionItem';
import type { ControlProps } from '@/editor/controls/type';
import type { PageNodeJson } from '@/types';

export interface WidgetControlProps {
  label?: string | ((props: Record<string, any>, index: number) => string);
  add: (index: number) => PageNodeJson;
}

const WidgetControl = (props: ControlProps<WidgetControlProps>) => {
  const { name, node, size, controlProps } = props;

  const { label, add } = controlProps || {};

  const nodes = useMemo(() => node?.elements[name] || [], [node?.children]);

  const handleRemove = (index: number) => {
    if (nodes && node) {
      node.page.removeNode(nodes[index].id);
    }
  };

  const handleReorder = (srcIndex: number, dstIndex: number) => {
    if (nodes && node) {
      node.page.moveNode(nodes[srcIndex].id, node.id, dstIndex);
    }
  };

  const handleAdd = () => {
    if (node && add) {
      const nodeJsons = add(nodes.length);

      const newNodes = node.page.parseJson(
        nodeJsons,
        node.id,
        nodes.length,
        name,
      );
      node.page.addNodes(node.id, nodes.length, newNodes);
    }
  };

  const options = useMemo(
    () =>
      nodes.map((item, index) => {
        const option: OptionItemType = {
          key: item.id,
          label: isFunction(label)
            ? label(item.props.record, index)
            : label ||
              item.props.record['label'] ||
              item.props.record['title'] ||
              '',
        };
        return option;
      }) || [],
    [node?.elements],
  );

  return (
    <Flex vertical gap={8} style={{ width: '100%' }}>
      <OptionList
        size={size}
        options={options}
        onReorder={(srcIndex, dstIndex) => handleReorder(srcIndex, dstIndex)}
        onRemove={(index) => handleRemove(index)}
      />
      <Button
        size={size}
        icon={<PlusOutlined />}
        block={true}
        type="primary"
        onClick={handleAdd}
      >
        <span>{t('Add an option')}</span>
      </Button>
    </Flex>
  );
};

export default WidgetControl;
