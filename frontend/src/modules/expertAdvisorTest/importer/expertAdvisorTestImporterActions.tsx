import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/expertAdvisorTest/importer/expertAdvisorTestImporterSelectors';
import ExpertAdvisorTestService from 'src/modules/expertAdvisorTest/expertAdvisorTestService';
import fields from 'src/modules/expertAdvisorTest/importer/expertAdvisorTestImporterFields';
import { i18n } from 'src/i18n';

const expertAdvisorTestImporterActions = importerActions(
  'EXPERT_ADVISOR_TEST_IMPORTER',
  selectors,
  ExpertAdvisorTestService.import,
  fields,
  i18n('entities.expertAdvisorTest.importer.fileName'),
);

export default expertAdvisorTestImporterActions;
