import type { ComponentType } from 'react';
import type { IconProps } from '@tabler/icons-react';
import { styled, useTheme } from 'styled-components';
import Collapse from '@/components/Collapse';
import type { WidgetTypeConfig } from '@/types';
import Item from './WidgetItem';

const StyledGroupContent = styled.div`
  display: grid;
  width: 100%;
  padding: 4px 0px;
  grid-row-gap: 6px;
  grid-column-gap: 6px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

export interface GroupProps {
  name: string;
  icon?: ComponentType<IconProps>;
  label: React.ReactNode;
  widgets: WidgetTypeConfig[];
  style?: React.CSSProperties;
  styles?: {
    content: React.CSSProperties;
    header: React.CSSProperties;
  };
}

const Group = (props: GroupProps) => {
  const { name, label, icon: Icon, widgets, style, styles } = props;
  const theme = useTheme();

  return (
    <Collapse
      label={label}
      name={name}
      icon={
        Icon ? <Icon size={12} color={theme.colorTextTertiary} /> : undefined
      }
      style={style}
      headerStyle={styles?.header}
      contentStyle={styles?.content}
    >
      {widgets.length > 0 && (
        <StyledGroupContent>
          {widgets
            .filter((item) => item.showInExplorer !== false)
            .map((item) => {
              const { name, icon, label } = item;
              return <Item key={name} icon={icon} title={label} name={name} />;
            })}
        </StyledGroupContent>
      )}
    </Collapse>
  );
};

export default Group;
