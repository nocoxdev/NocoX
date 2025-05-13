import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { useUser } from '@/selectors';
import Main from './Main';

const Dashboard = observer(() => {
  const user = useUser();

  console.log('user.initing', user.initing);

  return user.initing ? (
    <Spin fullscreen spinning={user.initing} percent="auto" />
  ) : (
    <Main />
  );
});

export default Dashboard;
