import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/affiliateLink/importer/affiliateLinkImporterSelectors';
import AffiliateLinkService from 'src/modules/affiliateLink/affiliateLinkService';
import fields from 'src/modules/affiliateLink/importer/affiliateLinkImporterFields';
import { i18n } from 'src/i18n';

const affiliateLinkImporterActions = importerActions(
  'AFFILIATE_LINK_IMPORTER',
  selectors,
  AffiliateLinkService.import,
  fields,
  i18n('entities.affiliateLink.importer.fileName'),
);

export default affiliateLinkImporterActions;
