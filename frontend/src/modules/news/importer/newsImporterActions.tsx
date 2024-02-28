import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/news/importer/newsImporterSelectors';
import NewsService from 'src/modules/news/newsService';
import fields from 'src/modules/news/importer/newsImporterFields';
import { i18n } from 'src/i18n';

const newsImporterActions = importerActions(
  'NEWS_IMPORTER',
  selectors,
  NewsService.import,
  fields,
  i18n('entities.news.importer.fileName'),
);

export default newsImporterActions;
