import _get from 'lodash/get';
import { setLocale as setYupLocale } from 'yup';
import moment, { lang } from 'moment';

let currentLanguageCode = '';

const languages: {
  [key: string]: {
    id: string;
    label: string;
    flag: string;
    dateFns: any;
    dictionary: any;
  };
} = {
  de: {
    id: 'de',
    label: 'Deutsch',
    flag: '/images/flags/Deutschland.png',
    dateFns: null,
    dictionary: null,
  },
};

export async function init() {
  currentLanguageCode = localStorage.getItem('language');
  if (
    !currentLanguageCode ||
    !languages[currentLanguageCode]
  ) {
    currentLanguageCode = 'de';
  }

  setLanguageCode(currentLanguageCode);

  if (currentLanguageCode === 'de') {
    await initDe();
  }
}

async function initDe() {
  const language = languages['de'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/de'))
    .default;

  language.dateFns = (
    await import('date-fns/locale/de')
  ).default;

  language.dictionary = (
    await import('src/i18n/de')
  ).default;

  moment.locale('de', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

export function getLanguage() {
  return languages[getLanguageCode()];
}

function format(message, args) {
  if (!message) {
    return null;
  }

  try {
    return message.replace(
      /{(\d+)}/g,
      function (match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match;
      },
    );
  } catch (error) {
    console.error(message, error);
    throw error;
  }
}

export function getLanguages() {
  return Object.keys(languages).map((language) => {
    return languages[language];
  });
}

export function getLanguageCode() {
  return currentLanguageCode;
}

export function setLanguageCode(arg) {
  if (!languages[arg]) {
    throw new Error(`Invalid language ${arg}.`);
  }

  localStorage.setItem('language', arg);
}

export function i18nExists(key) {
  if (!getLanguage()) {
    return false;
  }

  const message = _get(getLanguage().dictionary, key);
  return Boolean(message);
}

export function i18n(key, ...args) {
  if (!getLanguage()) {
    return key;
  }

  const message = _get(getLanguage().dictionary, key);

  if (!message) {
    return key;
  }

  return format(message, args);
}

export function i18nHtml(key, ...args) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: i18n(key, ...args),
      }}
    />
  );
}
