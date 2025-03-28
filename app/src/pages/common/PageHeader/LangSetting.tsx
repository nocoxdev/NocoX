import { Button, Dropdown } from 'antd';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import locales from '@/locales/lngs';
import { useLanguage } from '@/utils/hooks';

interface LangSettingProps {
  size?: number;
}

export const LangSetting = observer((props: LangSettingProps) => {
  const { size = 18 } = props;

  const [language, setLanguage] = useLanguage();

  const theme = useTheme();

  return (
    <Dropdown
      menu={{
        selectable: true,
        defaultSelectedKeys: language ? [language] : [],
        onSelect: async (info) => {
          setLanguage(info.key);
          location.reload();
        },
        items: locales.map((item) => ({
          key: item.name,
          label: item.label,
        })),
      }}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button
        type="text"
        size="small"
        style={{ color: theme.colorPrimaryText }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
        >
          <path d="M9.42856 12.3333H13.2381M9.42856 12.3333L8.66666 14M9.42856 12.3333L11.3333 8L13.2381 12.3333M13.2381 12.3333L14 14" />
          <path d="M5.33334 2L5.66668 3" />
          <path d="M2 3.66666H9.33333" />
          <path d="M3.33334 5.33334C3.33334 5.33334 3.92984 7.4203 5.42108 8.5797C6.91228 9.73914 9.33334 10.6667 9.33334 10.6667" />
          <path d="M8 3.66666C8 3.66666 7.4035 6.4058 5.91227 7.92753C4.42107 9.44926 2 10.6667 2 10.6667" />
        </svg>
      </Button>
    </Dropdown>
  );
});
