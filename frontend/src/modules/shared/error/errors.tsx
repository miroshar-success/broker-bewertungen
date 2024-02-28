import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n, i18nExists } from 'src/i18n';
import authService from 'src/modules/auth/authService';

const DEFAULT_ERROR_MESSAGE = i18n(
  'errors.defaultErrorMessage',
);

function selectErrorKeyOrMessage(error) {
  if (error && error.response && error.response.data) {
    const data = error.response.data;

    if (data.error && data.error.message) {
      return data.error.message;
    }

    return String(data);
  }

  return error.message || DEFAULT_ERROR_MESSAGE;
}

function selectErrorMessage(error) {
  const key = selectErrorKeyOrMessage(error);

  if (i18nExists(key)) {
    return i18n(key);
  }

  return key;
}

function selectErrorCode(error) {
  if (error && error.response && error.response.status) {
    return error.response.status;
  }

  return 500;
}

export default class Errors {
  static handle(error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(selectErrorMessage(error));
      console.error(error);
    }

    if (selectErrorCode(error) === 401) {
      authService.signout();
      (window as any).location.reload();
      return;
    }

    if (selectErrorCode(error) === 403) {
      getHistory().push('/403');
      return;
    }

    if ([400, 429].includes(selectErrorCode(error))) {
      Message.error(selectErrorMessage(error));
      return;
    }

    getHistory().push('/500');
  }

  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    return selectErrorMessage(error);
  }

  static showMessage(error) {
    Message.error(selectErrorMessage(error));
  }
}
