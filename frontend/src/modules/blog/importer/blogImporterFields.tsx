import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'name',
    label: i18n('entities.blog.fields.name'),
    schema: schemas.string(
      i18n('entities.blog.fields.name'),
    ),
  },
  {
    name: 'link',
    label: i18n('entities.blog.fields.link'),
    schema: schemas.string(
      i18n('entities.blog.fields.link'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'metakeywords',
    label: i18n('entities.blog.fields.metakeywords'),
    schema: schemas.string(
      i18n('entities.blog.fields.metakeywords'),
      {
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'metadescription',
    label: i18n('entities.blog.fields.metadescription'),
    schema: schemas.string(
      i18n('entities.blog.fields.metadescription'),
      {
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'pagetitle',
    label: i18n('entities.blog.fields.pagetitle'),
    schema: schemas.string(
      i18n('entities.blog.fields.pagetitle'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'teaser',
    label: i18n('entities.blog.fields.teaser'),
    schema: schemas.string(
      i18n('entities.blog.fields.title'),
    ),
  },
  {
    name: 'content',
    label: i18n('entities.blog.fields.content'),
    schema: schemas.string(
      i18n('entities.blog.fields.content'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'sort',
    label: i18n('entities.blog.fields.sort'),
    schema: schemas.integer(
      i18n('entities.blog.fields.sort'),
      {
        min: 0,
      },
    ),
  },
  {
    name: 'activated',
    label: i18n('entities.blog.fields.activated'),
    schema: schemas.boolean(
      i18n('entities.blog.fields.activated'),
      {},
    ),
  },
  {
    name: 'author_id',
    label: i18n('entities.blog.fields.author_id'),
    schema: schemas.string(
      i18n('entities.blog.fields.author_id'),
      {},
    ),
  },
  {
    name: 'broker',
    label: i18n('entities.blog.fields.broker'),
    schema: schemas.integer(
      i18n('entities.blog.fields.broker'),
      {},
    ),
  },
];
