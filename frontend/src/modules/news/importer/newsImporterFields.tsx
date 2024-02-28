import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'link',
    label: i18n('entities.news.fields.link'),
    schema: schemas.string(
      i18n('entities.news.fields.link'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'meta_keywords',
    label: i18n('entities.news.fields.meta_keywords'),
    schema: schemas.string(
      i18n('entities.news.fields.meta_keywords'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'meta_description',
    label: i18n('entities.news.fields.meta_description'),
    schema: schemas.string(
      i18n('entities.news.fields.meta_description'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'name',
    label: i18n('entities.news.fields.name'),
    schema: schemas.string(
      i18n('entities.news.fields.name'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'title',
    label: i18n('entities.news.fields.title'),
    schema: schemas.string(
      i18n('entities.news.fields.title'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'teaser',
    label: i18n('entities.news.fields.teaser'),
    schema: schemas.string(
      i18n('entities.news.fields.teaser'),
    ),
  },
  {
    name: 'body',
    label: i18n('entities.news.fields.body'),
    schema: schemas.string(
      i18n('entities.news.fields.body'),
      {},
    ),
  },
  {
    name: 'sort',
    label: i18n('entities.news.fields.sort'),
    schema: schemas.integer(
      i18n('entities.news.fields.sort'),
      {
        required: true,
        min: 0,
      },
    ),
  },
  {
    name: 'activated',
    label: i18n('entities.news.fields.activated'),
    schema: schemas.boolean(
      i18n('entities.news.fields.activated'),
      {},
    ),
  },
  {
    name: 'pdf',
    label: i18n('entities.news.fields.pdf'),
    schema: schemas.boolean(
      i18n('entities.news.fields.pdf '),
      {},
    ),
  },
  {
    name: 'frontpage',
    label: i18n('entities.news.fields.frontpage'),
    schema: schemas.boolean(
      i18n('entities.news.fields.frontpage'),
      {},
    ),
  },
];
