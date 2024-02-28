import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('entities.blogComment.fields.name'),
    schema: schemas.string(
      i18n('entities.blogComment.fields.name'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'link',
    label: i18n('entities.blogComment.fields.link'),
    schema: schemas.string(
      i18n('entities.blogComment.fields.link'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'image',
    label: i18n('entities.blogComment.fields.image'),
    schema: schemas.string(
      i18n('entities.blogComment.fields.image'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'description',
    label: i18n('entities.blogComment.fields.description'),
    schema: schemas.string(
      i18n('entities.blogComment.fields.description'),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
];
