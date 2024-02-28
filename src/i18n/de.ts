/**
 * I18n dictionary for the en.
 */

const en = {
  app: {
    title: 'broker-bewertungen.de',
  },

  auth: {
    userNotFound: `Sorry, we don't recognize your credentials`,
    wrongPassword: `Sorry, we don't recognize your credentials`,
    weakPassword: 'This password is too weak',
    emailAlreadyInUse: 'Email is already in use',
    invalidEmail: 'Please provide a valid email',
    passwordReset: {
      invalidToken:
        'Password reset link is invalid or has expired',
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Email verification link is invalid or has expired.',
      error: `Email not recognized.`,
      signedInAsWrongUser: `This email confirmation was sent to {0} but you're signed in as {1}.`,
    },
    passwordChange: {
      invalidPassword: 'The old password is invalid',
    },
  },

  user: {
    errors: {
      userAlreadyExists:
        'User with this email already exists.',
      userNotFound: 'User not found.',
      destroyingHimself: `You can't delete yourself.`,
      revokingOwnPermission: `You can't revoke your own admin permission.`,
      revokingPlanUser: `You can't revoke the admin permission of the plan manager.`,
      destroyingPlanUser: `You can't delete the plan manager.`,
    },
  },

  tenant: {
    exists:
      'There is already a workspace on this application.',
    url: {
      exists: 'This workspace URL is already in use.',
    },
    invitation: {
      notSameEmail: `This invitation was sent to {0} but you're signed in as {1}.`,
    },
    planActive: `There is a plan active for this workspace. Please cancel the plan first.`,
    stripeNotConfigured: 'Stripe is not configured.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  errors: {
    inUse: {
      message: '`{0}` is in use',
    },
    notFound: {
      message: 'Not Found',
    },
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
  },

  email: {
    error: `Email provider is not configured.`,
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  entities: {
    broker: {
      errors: {
        unique: {
          name_normalized: 'Name Normalized must be unique',
        },
      },
    },
    broker_article: {
      errors: {
        unique: {
          name_normalized: 'Name Normalized must be unique',
        },
      },
    },
    broker_upside: {
      errors: {
        notEmpty: {
          text: 'Demo Account Text is required',
        },
      },
    },
    broker_regulatory_authority: {
      errors: {
        notEmpty: {
          name: 'Regulatory Authority Name is required',
        },
      },
    },
    broker_deposit_guarantee: {
      errors: {
        notEmpty: {
          name: 'Deposit Guarantee Name is required',
        },
      },
    },
    broker_certificate: {
      errors: {
        notEmpty: {
          name: 'Certificate Name is required',
        },
      },
    },
    broker_spread: {
      errors: {
        notEmpty: {
          spread: 'Spread is required',
        },
      },
    },
    broker_feature: {
      errors: {
        notEmpty: {
          feature: 'Special Feature is required',
        },
      },
    },
    broker_phone: {
      errors: {
        notEmpty: {},
      },
    },
    broker_fax: {
      errors: {
        notEmpty: {},
      },
    },
    broker_email: {
      errors: {
        notEmpty: {},
      },
    },
    broker_address: {
      errors: {
        notEmpty: {},
      },
    },
    broker_video: {
      errors: {
        notEmpty: {},
      },
    },
    broker_checkbox: {
      errors: {
        notEmpty: {},
      },
    },
    broker_forex_signal: {
      errors: {
        notEmpty: {},
      },
    },
    broker_bank: {
      errors: {
        notEmpty: {
          name: 'Bank Name is required',
        },
      },
    },
    broker_order_type: {
      errors: {
        notEmpty: {
          type: 'Broker Order Type is required',
        },
      },
    },
    broker_minimum_trading_unit: {
      errors: {
        notEmpty: {
          minimum_trading_units:
            'Broker Minimum Trading Unit is required',
        },
      },
    },
    broker_currency_pair: {
      errors: {
        notEmpty: {},
      },
    },
    broker_creteria: {
      errors: {
        notEmpty: {},
      },
    },
    broker_trade_platform: {
      errors: {
        notEmpty: {},
      },
    },
    broker_trade_store: {
      errors: {
        notEmpty: {},
      },
    },
    broker_deposit: {
      errors: {
        notEmpty: {},
      },
    },
    author: {
      errors: {
        unique: {},
      },
    },
    affiliateLink: {
      errors: {
        unique: {},
      },
    },
    trackingParameters: {
      errors: {
        unique: {},
      },
    },
    navigation: {
      errors: {
        unique: {},
      },
    },
    category: {
      errors: {
        unique: {},
      },
    },
    news: {
      errors: {
        unique: {},
      },
    },
    promotion: {
      errors: {
        unique: {},
      },
    },
    openx_banner: {
      errors: {
        unique: {
          hash_zone: 'Openx banner hash must be unique.',
        },
        update: 'Sorry, update is failed.',
        distroy: 'Sorry, delete is failed.',
        find: 'Sorry, data is not existed.',
      },
    },
    page: {
      errors: {
        unique: {},
        notEmpty: {
          name: 'Related Link name is required.',
          url: 'Related Link url is required.',
        },
      },
    },
    page_warning: {
      errors: {
        unique: {},
      },
    },
    blog: {
      errors: {
        unique: {
          name_normalized:
            'Name normalized must be unique.',
        },
      },
    },
  },
};

export default en;
