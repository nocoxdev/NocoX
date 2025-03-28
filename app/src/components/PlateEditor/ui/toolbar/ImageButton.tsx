import { Fragment, useState } from 'react';
import { IconPhoto } from '@tabler/icons-react';
import { useEditorRef } from '@udecode/plate-common/react';
import { insertImage } from '@udecode/plate-media';
import AntdIcon from '@/components/AntdIcon';
import ResourceModal from '@/pages/common/Resource/ResourceModal';
import { getImageUrl } from '@/services/utils';
import CommonButton from './CommonButton';

const ImageButton = () => {
  const [open, setOpen] = useState(false);
  const editor = useEditorRef();

  return (
    <Fragment>
      <CommonButton onClick={() => setOpen(true)}>
        <AntdIcon content={IconPhoto} />
      </CommonButton>
      <ResourceModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(id) => {
          insertImage(editor, getImageUrl(id));
          setOpen(false);
        }}
      />
    </Fragment>
  );
};

export default ImageButton;
