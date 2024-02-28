/**
 * Storage permissions.
 *
 * @id - Used to identify the rule on permissions and upload.
 * @folder - Folder where the files will be saved
 * @maxSizeInBytes - Max allowed size in bytes
 * @bypassWritingPermissions - Does not validate if the user has permission to write
 * @publicRead - The file can be publicly accessed via the URL without the need for a signed token
 */
export default class Storage {
  static get values() {
    return {
      userAvatarsProfiles: {
        id: 'userAvatarsProfiles',
        folder: 'user/avatars/profile/:userId',
        maxSizeInBytes: 10 * 1024 * 1024,
        bypassWritingPermissions: true,
        publicRead: true,
      },

      settingsLogos: {
        id: 'settingsLogos',
        folder: 'tenant/:tenantId/settings/logos',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },

      settingsBackgroundImages: {
        id: 'settingsBackgroundImages',
        folder:
          'tenant/:tenantId/settings/backgroundImages',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },

      ckeditorImages: {
        id: 'ckeditorImages',
        folder: 'ckeditor_images',
        maxSizeInBytes: 10 * 1024 * 1024,
        bypassWritingPermissions: true,
        publicRead: true,
      },

      author_image: {
        id: 'author_image',
        folder: 'authors',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      broker_image_top_broker_logo: {
        id: 'broker_image_top_broker_logo',
        folder: 'broker_screenshots/top_broker_logo',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      broker_image_top_broker_horizontal_logo: {
        id: 'broker_image_top_broker_horizontal_logo',
        folder:
          'broker_screenshots/top_broker_horizontal_logo',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      broker_image_broker_regulation_image: {
        id: 'broker_image_broker_regulation_image',
        folder:
          'broker_screenshots/broker_regulation_image',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      broker_image_broker_logo: {
        id: 'broker_image_broker_logo',
        folder: 'broker_screenshots/broker_logo',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      broker_image_broker_detail_logo: {
        id: 'broker_image_broker_detail_logo',
        folder: 'broker_screenshots/broker_detail_logo',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      broker_certificate_image_certificate_image: {
        id: 'broker_certificate_image_certificate_image',
        folder: 'broker_certificate',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      news_image: {
        id: 'news_image',
        folder: 'news_images',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      promotion_image: {
        id: 'promotion_image',
        folder: 'promo',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      page_image: {
        id: 'page_image',
        folder: 'pages_images',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      blog_image: {
        id: 'blog_image',
        folder: 'blog_images',
        maxSizeInBytes: 10 * 1024 * 1024,
      },

      expert_advisor_test_image: {
        id: 'expert_advisor_test_image',
        folder: 'expert_advisor_test_screenshots',
        maxSizeInBytes: 10 * 1024 * 1024,
      },
    };
  }
}
