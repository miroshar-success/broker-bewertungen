import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'title',
    label: i18n('entities.pageWarning.fields.title'),
    schema: schemas.string(
      i18n('entities.pageWarning.fields.title'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'body',
    label: i18n('entities.pageWarning.fields.body'),
    schema: schemas.string(
      i18n('entities.pageWarning.fields.body'),
      {
        required: true,
      },
    ),
  },
];
