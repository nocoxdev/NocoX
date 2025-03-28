import { Fragment } from 'react';
import { Flex } from 'antd';
import { isObject, keys } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { isGuid } from '@/utils/helpers';

interface RecordViewProps {
  initialValues?: Record<string, any>;
}
const RecordView = observer((props: RecordViewProps) => {
  const { initialValues } = props;

  return (
    <Flex vertical>
      {keys(initialValues).map((key) => (
        <Fragment key={key}>
          {!isGuid(initialValues?.[key] || !isObject(initialValues?.[key])) && (
            <span>{initialValues?.[key]}</span>
          )}
        </Fragment>
      ))}
    </Flex>
  );
});

export default RecordView;
