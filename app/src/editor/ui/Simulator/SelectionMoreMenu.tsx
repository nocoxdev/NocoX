import { Fragment, useState } from 'react';
import { IconDeviceFloppy, IconEdit } from '@tabler/icons-react';
import html2canvas from 'html2canvas';
import { t } from 'i18next';
import { observer } from 'mobx-react-lite';
import type { ActionMenusType } from '@/components/ActionMenu';
import ActionMenu from '@/components/ActionMenu';
import { getElByNodeId } from '@/editor/utils';
import { useMessage } from '@/selectors';
import { ResourceApi } from '@/services/api/ResourceApi';
import { getFileFromBase64 } from '@/utils/helpers';
import { useSelection } from '../../selectors';
import CreateBlockModal from './CreateBlockModal';

interface SelectionMoreMenuProps {
  children?: React.ReactNode;
  onLabelChangeOpen: (open: boolean) => void;
}

const SelectionMoreMenu = observer((props: SelectionMoreMenuProps) => {
  const { children, onLabelChangeOpen } = props;
  const selection = useSelection();
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const message = useMessage();

  const [cover, setCover] = useState('');
  const { node } = useSelection();

  if (!node) return null;

  const items: ActionMenusType = [
    {
      icon: <IconEdit size={14} />,
      title: t('Rename'),
      onClick: () => {
        onLabelChangeOpen(true);
        setActionMenuOpen(false);
      },
    },
    'divider',
    {
      icon: <IconDeviceFloppy size={14} />,
      title: t('Save as block'),
      onClick: () => {
        setActionMenuOpen(false);

        if (!selection.id) {
          return;
        }

        const element = getElByNodeId(selection.id) as HTMLElement;

        html2canvas(element, { useCORS: true }).then(
          async (canvas: HTMLCanvasElement) => {
            const imageBase64 = canvas.toDataURL('image/png');

            const imageFile = getFileFromBase64(
              imageBase64,
              `${node.name}.png`,
            );

            const resp = await ResourceApi.upload(imageFile);
            if (resp.success && resp.data?.id) {
              setCover(resp.data.id);
            } else {
              message.error(
                t('Upload default cover failed, please upload it yourself'),
              );
            }

            setBlockModalOpen(true);
          },
        );
      },
    },
  ];

  return (
    <Fragment>
      <ActionMenu
        items={items}
        open={actionMenuOpen}
        onOpenChange={setActionMenuOpen}
      >
        {children}
      </ActionMenu>

      <CreateBlockModal
        key={node.id}
        cover={cover}
        maskClosable={false}
        open={blockModalOpen}
        destroyOnHidden
        onClose={() => setBlockModalOpen(false)}
      />
    </Fragment>
  );
});

export default SelectionMoreMenu;
