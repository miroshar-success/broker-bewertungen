import * as yup from 'yup';
import { i18n } from 'src/i18n';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';

const yupImporterSchemas = {
  generic(label) {
    return yup.mixed().label(label);
  },
  string(label, config?) {
    config = config || {};

    let yupChain = yup
      .string()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .nullable(true)
      .trim()
      .label(label);

    if (config.required) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    if (config.matches) {
      yupChain = yupChain.matches(config.matches);
    }

    return yupChain;
  },
  boolean(label, config?) {
    return yup.bool().default(false).label(label);
  },
  relationToOne(label, config?) {
    config = config || {};

    let yupChain = yup.mixed().nullable(true).label(label);

    if (config.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  },
  stringArray(label, config?) {
    config = config || {};

    let yupChain = yup
      .mixed()
      .label(label)
      .transform((value) =>
        Array.isArray(value)
          ? value
          : (value || '')
              .trim()
              .split(' ')
              .filter((item) => Boolean(item))
              .map((item) => item.trim()),
      );

    if (config.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  },
  relationToMany(label, config?) {
    config = config || {};

    let yupChain = yup
      .array()
      .nullable(true)
      .label(label)
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null;
        }

        if (Array.isArray(originalValue)) {
          return originalValue;
        }

        return originalValue
          .trim()
          .split(' ')
          .map((value) => {
            return value;
          });
      });

    if (config.required || config.min) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    } else if (config.required) {
      yupChain = yupChain.min(1);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    return yupChain;
  },
  json(label) {
    return yup.mixed().label(label);
  },
  integer(label, config?) {
    config = config || {};

    let yupChain = yup
      .number()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .integer()
      .nullable(true)
      .label(label);

    if (config.required) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    return yupChain;
  },
  images(label, config?) {
    config = config || {};

    let yupChain = yup
      .array()
      .nullable(true)
      .label(label)
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null;
        }

        if (Array.isArray(originalValue)) {
          return originalValue;
        }

        return originalValue
          .trim()
          .split(' ')
          .map((value) => {
            return {
              name: value.trim(),
              publicUrl: value.trim(),
              new: true,
            };
          });
      });

    if (config.required || config.min) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    } else if (config.required) {
      yupChain = yupChain.min(1);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    return yupChain;
  },
  files(label, config?) {
    config = config || {};

    let yupChain = yup
      .array()
      .nullable(true)
      .label(label)
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null;
        }

        if (Array.isArray(originalValue)) {
          return originalValue;
        }

        return originalValue
          .trim()
          .split(' ')
          .map((value) => {
            return {
              name: value.trim(),
              publicUrl: value.trim(),
              new: true,
            };
          });
      });

    if (config.required || config.min) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    } else if (config.required) {
      yupChain = yupChain.min(1);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    return yupChain;
  },
  enumerator(label, config?) {
    config = config || {};

    let yupChain = yup
      .string()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .label(label)
      .nullable(true)
      .oneOf([null, ...(config.options || [])]);

    if (config.required) {
      yupChain = yupChain.required(
        i18n('validation.string.selected'),
      );
    }

    return yupChain;
  },
  email(label, config?) {
    config = config || {};

    let yupChain = yup
      .string()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .nullable(true)
      .trim()
      .label(label)
      .email();

    if (config.required) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    if (config.matches) {
      yupChain = yupChain.matches(config.matches);
    }

    return yupChain;
  },
  decimal(label, config?) {
    config = config || {};
    let yupChain = yup
      .number()
      .transform((cv, ov) => {
        return ov === '' ? null : cv;
      })
      .nullable(true)
      .label(label);

    if (config.required) {
      yupChain = yupChain.required();
    }

    if (config.min || config.min === 0) {
      yupChain = yupChain.min(config.min);
    }

    if (config.max) {
      yupChain = yupChain.max(config.max);
    }

    return yupChain;
  },
  datetime(label, config?) {
    config = config || {};
    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(label)
      .test(
        'is-date',
        i18n('validation.mixed.default'),
        (value) => {
          if (!value) {
            return true;
          }

          return value instanceof Date;
        },
      );

    if (config.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  },
  date(label, config?) {
    config = config || {};
    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(label)
      .transform((value) => {
        if (!value) {
          return null;
        }

        if (!(value instanceof Date)) {
          return 'Invalid date';
        }

        return moment(value).format(
          DEFAULT_MOMENT_FORMAT_DATE_ONLY,
        );
      })
      .test(
        'is-date',
        i18n('validation.mixed.default'),
        (value, context: any) => {
          if (context.originalValue === 'Invalid date') {
            return false;
          }

          return true;
        },
      );

    if (config.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  },
};

export default yupImporterSchemas;
