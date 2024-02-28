import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/promotion/importer/promotionImporterSelectors';
import PromotionService from 'src/modules/promotion/promotionService';
import fields from 'src/modules/promotion/importer/promotionImporterFields';
import { i18n } from 'src/i18n';

const promotionImporterActions = importerActions(
  'PROMOTION_IMPORTER',
  selectors,
  PromotionService.import,
  fields,
  i18n('entities.promotion.importer.fileName'),
);

export default promotionImporterActions;
