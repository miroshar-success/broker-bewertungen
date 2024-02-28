import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';

export default [
  {
    name: 'navigation',
    label: i18n('entities.page.fields.navigation'),
    schema: schemas.string(
      i18n('entities.page.fields.navigation'),
    ),
  },
  {
    name: 'link',
    label: i18n('entities.page.fields.link'),
    schema: schemas.string(
      i18n('entities.page.fields.link'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'meta_keywords',
    label: i18n('entities.page.fields.meta_keywords'),
    schema: schemas.string(
      i18n('entities.page.fields.meta_keywords'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'meta_description',
    label: i18n('entities.page.fields.meta_description'),
    schema: schemas.string(
      i18n('entities.page.fields.meta_description'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'name',
    label: i18n('entities.page.fields.name'),
    schema: schemas.string(
      i18n('entities.page.fields.name'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'title',
    label: i18n('entities.page.fields.title'),
    schema: schemas.string(
      i18n('entities.page.fields.title'),
      {
        required: true,
        min: 1,
        max: 255,
      },
    ),
  },
  {
    name: 'teaser',
    label: i18n('entities.page.fields.teaser'),
    schema: schemas.string(
      i18n('entities.page.fields.title'),
    ),
  },
  {
    name: 'body',
    label: i18n('entities.page.fields.teaser'),
    schema: schemas.string(
      i18n('entities.page.fields.title'),
      {
        required: true,
      },
    ),
  },
  {
    name: 'sort',
    label: i18n('entities.page.fields.sort'),
    schema: schemas.integer(
      i18n('entities.page.fields.sort'),
      {
        min: 0,
      },
    ),
  },
  {
    name: 'activated',
    label: i18n('entities.page.fields.activated'),
    schema: schemas.boolean(
      i18n('entities.page.fields.activated'),
      {},
    ),
  },
  {
    name: 'pdf',
    label: i18n('entities.page.fields.pdf'),
    schema: schemas.boolean(
      i18n('entities.page.fields.pdf'),
      {},
    ),
  },
  {
    name: 'author_id',
    label: i18n('entities.page.fields.author_id'),
    schema: schemas.string(
      i18n('entities.page.fields.author_id'),
      {},
    ),
  },
  // {
  //   name: 'parent',
  //   label: i18n('entities.page.fields.parent'),
  //   schema: schemas.integer(
  //     i18n('entities.page.fields.parent'),
  //     {},
  //   ),
  // },
];
