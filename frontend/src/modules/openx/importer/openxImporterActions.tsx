import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/openx/importer/openxImporterSelectors';
import OpenxService from 'src/modules/openx/openxService';
import fields from 'src/modules/openx/importer/openxImporterFields';
import { i18n } from 'src/i18n';

const openxImporterActions = importerActions(
  'OPENX_IMPORTER',
  selectors,
  OpenxService.import,
  fields,
  i18n('entities.openx.importer.fileName'),
);

export default openxImporterActions;
