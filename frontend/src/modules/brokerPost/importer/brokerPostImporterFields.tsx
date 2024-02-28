import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('entities.brokerPost.fields.name'),
    schema: schemas.string(
      i18n('entities.brokerPost.fields.name'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
];
