import { useControllableValue } from 'ahooks';
import { t } from 'i18next';
import styled, { useTheme } from 'styled-components';
import ThemeItem from '@/components/ThemeSetting/ThemeItem';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

interface ThemeSelectorProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const ThemeSelector = (props: ThemeSelectorProps) => {
  const [value, setValue] = useControllableValue(props);

  const theme = useTheme();
  const themes = [
    {
      name: 'light',
      title: t('Light'),
      primaryColor: theme.colorPrimary,
      secondaryColor: theme.colorPrimaryBgHover,
    },
    {
      name: 'dark',
      title: t('Dark'),
      primaryColor: theme.colorSuccess,
      secondaryColor: theme.colorSuccessBgHover,
    },
    {
      name: 'sea',
      title: t('Sea'),
      primaryColor: theme.colorError,
      secondaryColor: theme.colorErrorBgHover,
    },
    {
      name: 'sea1',
      title: t('Sea1'),
      primaryColor: theme.colorWarning,
      secondaryColor: theme.colorWarningBgHover,
    },
    {
      name: 'sea2',
      title: t('Sea2'),
      primaryColor: theme.colorInfo,
      secondaryColor: theme.colorInfoBgHover,
    },
  ];

  return (
    <StyledContainer>
      {themes.map((theme) => (
        <ThemeItem
          key={theme.name}
          title={theme.title}
          primaryColor={theme.primaryColor}
          secondaryColor={theme.secondaryColor}
          selected={theme.name === value}
          onClick={() => setValue(theme.name)}
          style={{ height: 66, width: 100 }}
        />
      ))}
    </StyledContainer>
  );
};

export default ThemeSelector;
