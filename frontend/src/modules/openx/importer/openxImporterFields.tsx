import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'code',
    label: i18n('entities.openx.fields.code'),
    schema: schemas.string(
      i18n('entities.openx.fields.code'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'noscript',
    label: i18n('entities.openx.fields.noscript'),
    schema: schemas.string(
      i18n('entities.openx.fields.noscript'),
      {},
    ),
  },
  {
    name: 'zone',
    label: i18n('entities.openx.fields.zone'),
    schema: schemas.string(
      i18n('entities.openx.fields.zone'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'activated',
    label: i18n('entities.openx.fields.activated'),
    schema: schemas.boolean(
      i18n('entities.openx.fields.activated'),
      {},
    ),
  },
];
