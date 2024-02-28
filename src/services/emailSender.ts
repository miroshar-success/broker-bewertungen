import assert from 'assert';
import { getConfig } from '../config';
import sendgridMail from '@sendgrid/mail';

if (getConfig().SENDGRID_KEY) {
  sendgridMail.setApiKey(getConfig().SENDGRID_KEY);
}

export default class EmailSender {
  templateId: string;
  variables: any;

  constructor(templateId, variables) {
    this.templateId = templateId;
    this.variables = variables;
  }

  static get TEMPLATES() {
    if (!EmailSender.isConfigured) {
      return {};
    }

    return {
      EMAIL_ADDRESS_VERIFICATION:
        getConfig()
          .SENDGRID_TEMPLATE_EMAIL_ADDRESS_VERIFICATION,
      INVITATION: getConfig().SENDGRID_TEMPLATE_INVITATION,
      PASSWORD_RESET:
        getConfig().SENDGRID_TEMPLATE_PASSWORD_RESET,
      CONTACT: getConfig().SENDGRID_TEMPLATE_CONTACT,
      REVIEW_NOTIFICATION:
        getConfig().SENDGRID_TEMPLATE_REVIEW_NOTIFICATION,
    };
  }

  static get CONTACT_RECIPIENT() {
    if (!EmailSender.isConfigured) {
      return null;
    }
    return getConfig().SENDGRID_RECIPIENT_FOR_CONTACT;
  }

  static get REVIEW_NOTIFICATION_RECIPIENT() {
    if (!EmailSender.isConfigured) {
      return null;
    }
    return getConfig()
      .SENDGRID_RECIPIENT_FOR_REVIEW_NOTIFICATION;
  }

  async sendTo(recipient) {
    if (!EmailSender.isConfigured) {
      console.error(`Email provider is not configured.`);
      return;
    }

    assert(recipient, 'to is required');
    assert(
      getConfig().SENDGRID_EMAIL_FROM,
      'SENDGRID_EMAIL_FROM is required',
    );
    assert(this.templateId, 'templateId is required');

    const msg = {
      to: recipient,
      from: getConfig().SENDGRID_EMAIL_FROM,
      templateId: this.templateId,
      dynamicTemplateData: this.variables,
    };

    try {
      return await sendgridMail.send(msg);
    } catch (error) {
      console.error('Error sending SendGrid email.');
      console.error(error);
      throw error;
    }
  }

  static get isConfigured() {
    return Boolean(
      getConfig().SENDGRID_EMAIL_FROM &&
        getConfig().SENDGRID_KEY,
    );
  }
}
