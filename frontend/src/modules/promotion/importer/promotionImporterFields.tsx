import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('entities.promotion.fields.name'),
    schema: schemas.string(
      i18n('entities.promotion.fields.name'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'link',
    label: i18n('entities.promotion.fields.link'),
    schema: schemas.string(
      i18n('entities.promotion.fields.link'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'activated',
    label: i18n('entities.promotion.fields.activated'),
    schema: schemas.boolean(
      i18n('entities.promotion.fields.activated'),
      {},
    ),
  },
];
