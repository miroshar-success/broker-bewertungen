import moment from 'moment';
import {
  DEFAULT_MOMENT_FORMAT_DATE_ONLY,
  DEFAULT_MOMENT_FORMAT,
} from 'src/config/common';
import { i18n } from 'src/i18n';

const filterRenders = {
  enumerator: (i18nStartPath) => (value) =>
    value ? i18n(`${i18nStartPath}.${value}`) : null,
  enumeratorMultiple: (i18nStartPath) => (values) =>
    values
      ? values
          .map((value) => i18n(`${i18nStartPath}.${value}`))
          .join(', ')
      : null,
  generic: () => (value) => value,
  stringArray: () => (value) => (value || []).join(', '),
  json: () => (value) =>
    value ? JSON.stringify(value, null, 2) : null,
  decimal: (fractionDigits?) => (value) =>
    formatDecimal(value, fractionDigits),
  boolean: (trueLabel?, falseLabel?) => (value) =>
    value == null
      ? null
      : Boolean(value)
      ? trueLabel || i18n('common.yes')
      : falseLabel || i18n('common.no'),
  relationToOne: () => (value) =>
    (value && value.label) || null,
  relationToMany: () => (value) =>
    (value || []).map((item) => item.label).join(', '),
  filesOrImages: () => (value) =>
    (value || []).map((item) => item.downloadUrl).join(' '),
  date: () => (value) => formatDate(value),
  dateRange: () => (value) => {
    if (!value || !value.length) {
      return null;
    }

    const start = value[0];
    const end = value.length === 2 && value[1];

    if (!start && !end) {
      return null;
    }

    if (start && !end) {
      return `> ${formatDate(start)}`;
    }

    if (!start && end) {
      return `< ${formatDate(end)}`;
    }

    return `${formatDate(start)} - ${formatDate(end)}`;
  },
  datetime: () => (value) => formatDatetime(value),
  datetimeRange: () => (value) => {
    if (!value || !value.length) {
      return null;
    }

    const start = value[0];
    const end = value.length === 2 && value[1];

    if (!start && !end) {
      return null;
    }

    if (start && !end) {
      return `> ${formatDatetime(start)}`;
    }

    if (!start && end) {
      return `< ${formatDatetime(end)}`;
    }

    return `${formatDatetime(start)} - ${formatDatetime(
      end,
    )}`;
  },
  decimalRange: (fractionDigits?) => (value) => {
    if (!value || !value.length) {
      return null;
    }

    const start = value[0];
    const end = value.length === 2 && value[1];

    if (start == null && end == null) {
      return null;
    }

    if (start != null && end == null) {
      return `> ${formatDecimal(start, fractionDigits)}`;
    }

    if (start == null && end != null) {
      return `< ${formatDecimal(end, fractionDigits)}`;
    }

    return `${formatDecimal(
      start,
      fractionDigits,
    )} - ${formatDecimal(end, fractionDigits)}`;
  },
  range: () => (value) => {
    if (!value || !value.length) {
      return null;
    }

    const start = value[0];
    const end = value.length === 2 && value[1];

    if (
      (start == null || start === '') &&
      (end == null || end === '')
    ) {
      return null;
    }

    if (start != null && (end == null || end === '')) {
      return `> ${start}`;
    }

    if ((start == null || start === '') && end != null) {
      return `< ${end}`;
    }

    return `${start} - ${end}`;
  },
};

function formatDecimal(value, fractionDigits) {
  return value
    ? fractionDigits
      ? Number(value).toFixed(fractionDigits)
      : Number(value)
    : null;
}

function formatDate(value) {
  return value
    ? moment(value).format(DEFAULT_MOMENT_FORMAT_DATE_ONLY)
    : null;
}

function formatDatetime(value) {
  return value
    ? moment(value).format(DEFAULT_MOMENT_FORMAT)
    : null;
}

export default filterRenders;
