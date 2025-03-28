import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import Apps from './Apps';
import { WorkspaceContext } from './context/WorkspaceContext';
import { Workspace } from './stores';

const WorkspaceView = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  if (!workspaceId) {
    navigate('/404');
    return;
  }

  const curWorkspace = useMemo(() => new Workspace(workspaceId), [workspaceId]);

  return (
    <WorkspaceContext.Provider value={{ workspace: curWorkspace }}>
      <Apps />
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceView;
