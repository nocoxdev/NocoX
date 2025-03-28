import { useMemo, useState } from 'react';
import { Flex } from 'antd';
import { t } from 'i18next';
import styled, { useTheme } from 'styled-components';
import ThemeItem from './ThemeItem';

const StyledSettingCard = styled.div`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: #fff;
  padding: 12px;
  svg {
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius}px;
  }
`;

const StyleSettingCardTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

interface ThemeSettingProps {
  title?: React.ReactNode;
  style?: React.CSSProperties;
}

const ThemeSetting = (props: ThemeSettingProps) => {
  const { title, style } = props;

  const [curThemeName, setCurThemeName] = useState('light');

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

  const curTheme = useMemo(() => {
    return themes.find((theme) => theme.name === curThemeName);
  }, [curThemeName]);

  return (
    <StyledSettingCard style={style}>
      <Flex vertical gap={12}>
        {title || (
          <Flex gap={8} align="center">
            <StyleSettingCardTitle>
              {t('Theme')} {curTheme?.title && ':'}
            </StyleSettingCardTitle>
            <span style={{ fontSize: theme.fontSize }}>{curTheme?.title}</span>
          </Flex>
        )}
        <Flex wrap="wrap" gap={12}>
          {themes.map((item) => (
            <ThemeItem
              key={item.name}
              title={item.title}
              primaryColor={item.primaryColor}
              secondaryColor={item.secondaryColor}
              selected={item.name === curThemeName}
              onClick={() => setCurThemeName(item.name)}
              style={{ width: 54 }}
            />
          ))}
        </Flex>
      </Flex>
    </StyledSettingCard>
  );
};

export default ThemeSetting;
