import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'hash',
    label: i18n('entities.affiliateLink.fields.hash'),
    schema: schemas.string(
      i18n('entities.affiliateLink.fields.hash'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'link',
    label: i18n('entities.affiliateLink.fields.link'),
    schema: schemas.string(
      i18n('entities.affiliateLink.fields.link'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'display_hash',
    label: i18n(
      'entities.affiliateLink.fields.display_hash',
    ),
    schema: schemas.string(
      i18n('entities.affiliateLink.fields.display_hash'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'meta_info',
    label: i18n('entities.affiliateLink.fields.meta_info'),
    schema: schemas.string(
      i18n('entities.affiliateLink.fields.meta_info'),
      {
        required: true,
        min: 1,
        max: 15,
      },
    ),
  },
];
