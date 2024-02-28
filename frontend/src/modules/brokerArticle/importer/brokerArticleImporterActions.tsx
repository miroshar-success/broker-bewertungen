import { i18n } from 'src/i18n';
import BrokerArticleService from 'src/modules/brokerArticle/brokerArticleService';
import fields from 'src/modules/brokerArticle/importer/brokerArticleImporterFields';
import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/brokerArticle/importer/brokerArticleImporterSelectors';

const brokerArticleImporterActions = importerActions(
  'BROKER_ARTICLE_IMPORTER',
  selectors,
  BrokerArticleService.import,
  fields,
  i18n('entities.brokerArticle.importer.fileName'),
);

export default brokerArticleImporterActions;
