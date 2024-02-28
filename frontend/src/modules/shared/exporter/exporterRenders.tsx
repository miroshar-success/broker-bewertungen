import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { getUserNameOrEmailPrefix } from 'src/modules/utils';

const exporterRenders = {
  stringArray: () => (value) => (value || []).join(', '),
  json: () => (value) =>
    value ? JSON.stringify(value, null, 2) : null,
  decimal: (fractionDigits?) => (value) =>
    value
      ? fractionDigits
        ? Number(value).toFixed(fractionDigits)
        : Number(value)
      : null,
  boolean: () => (value) => String(Boolean(value)),
  relationToOne:
    (field = null) =>
    (value) =>
      (value && (value[field] ?? value.id)) || null,
  relationToMany:
    (field = null) =>
    (value) =>
      (value || [])
        .map((item) => item[field] ?? item.id)
        .join(', '),
  relationToOneUser: () => (value) =>
    (value && getUserNameOrEmailPrefix(value)) || null,
  relationToManyUser: () => (value) =>
    (value || [])
      .map((item) => getUserNameOrEmailPrefix(item))
      .join(', '),
  filesOrImages: () => (value) =>
    (value || []).map((item) => item.downloadUrl).join(' '),
  datetime: () => (value) =>
    value
      ? moment(value).format(DEFAULT_MOMENT_FORMAT)
      : null,
};

export default exporterRenders;
