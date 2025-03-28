import { useMemo } from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { observer } from 'mobx-react-lite';
import { styled } from 'styled-components';
import { useCurPage, useSelection } from '../../../selectors';

const StyledContainer = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0px 8px;
  background-color: white;
  box-sizing: border-box;
  border-top: 1px solid ${({ theme }) => theme.colorBorderSecondary};
`;

const StyledBreadcrumbTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize}px;
  cursor: pointer;
  user-select: none;
`;

const Breadcrumb = observer(() => {
  const selection = useSelection();
  const currentPage = useCurPage();

  const selectedNode = currentPage?.findNode(selection.id);

  const items = useMemo(() => {
    if (selectedNode) {
      return selectedNode.ancestors.concat(selectedNode);
    }
    return [];
  }, [selectedNode]);

  const breadcrumb = items.map((node) => {
    return {
      key: node.id,
      title: <StyledBreadcrumbTitle>{node.label}</StyledBreadcrumbTitle>,
      onClick: () => selection.select(node.id),
    };
  });

  return (
    <StyledContainer>
      <AntdBreadcrumb separator=">" items={breadcrumb} />
    </StyledContainer>
  );
});

export default Breadcrumb;
