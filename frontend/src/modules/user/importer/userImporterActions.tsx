import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/user/importer/userImporterSelectors';
import UserService from 'src/modules/user/userService';
import fields from 'src/modules/user/importer/userImporterFields';
import { i18n } from 'src/i18n';

const userImporterActions = importerActions(
  'USER_IMPORTER',
  selectors,
  UserService.import,
  fields,
  i18n('user.importer.fileName'),
);

export default userImporterActions;
