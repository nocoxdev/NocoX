import { styled } from 'styled-components';
import Collapse from '../Collapse';

const CollapseGroupContainer = styled.div`
  position: relative;
`;

export interface CollapseItem {
  name: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children: React.ReactNode;
}

export interface CollapseGroupProps {
  items: CollapseItem[];
  className?: string;
  style?: React.CSSProperties;
}

const CollapseGroup = (props: CollapseGroupProps) => {
  const { items, className, style } = props;

  return (
    <CollapseGroupContainer className={className} style={style}>
      {items.map((item) => (
        <Collapse key={item.name} {...item} />
      ))}
    </CollapseGroupContainer>
  );
};

export default CollapseGroup;
