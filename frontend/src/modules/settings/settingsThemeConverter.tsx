const defaults = {
  primary: '#2196f3',
  secondary: '#f50057',
};

export default {
  fromString(value) {
    if (value && value.primary && value.secondary) {
      return value;
    }

    if (!value || !value.includes('-')) {
      return { ...defaults };
    }

    const [primary, secondary] = value.split('-');

    return {
      primary,
      secondary,
    };
  },

  toString(value) {
    if (value && value.primary && value.secondary) {
      return `${value.primary}-${value.secondary}`;
    }

    return this.toString(this.fromString(value));
  },
};
