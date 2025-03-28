import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { LNG_KEY } from '@/constants';
import locales from './locales/lngs';

const resources: { [key: string]: { translation: Record<string, string> } } =
  {};

locales.forEach((locale) => {
  resources[locale.name] = { translation: locale.resource };
});

const lng = localStorage.getItem(LNG_KEY) || 'zh-CN';

i18next.use(initReactI18next).init({
  lng, // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
});
