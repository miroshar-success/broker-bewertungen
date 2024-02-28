import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('entities.trackingParameter.fields.name'),
    schema: schemas.string(
      i18n('entities.trackingParameter.fields.name'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'link',
    label: i18n('entities.trackingParameter.fields.link'),
    schema: schemas.string(
      i18n('entities.trackingParameter.fields.link'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'image',
    label: i18n('entities.trackingParameter.fields.image'),
    schema: schemas.string(
      i18n('entities.trackingParameter.fields.image'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'description',
    label: i18n(
      'entities.trackingParameter.fields.description',
    ),
    schema: schemas.string(
      i18n('entities.trackingParameter.fields.description'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
];
