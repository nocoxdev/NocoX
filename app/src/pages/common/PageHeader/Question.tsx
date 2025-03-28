import { IconQuestionMark } from '@tabler/icons-react';
import { Button } from 'antd';

export const Question = () => {
  return (
    <Button type="text" icon={<IconQuestionMark size={20} stroke={1.5} />} />
  );
};
