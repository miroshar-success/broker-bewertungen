import Roles from 'src/security/roles';
import Plans from 'src/security/plans';
import Storage from 'src/security/storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      // #region _BASE_
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planRead: {
        id: 'planRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      muiEdit: {
        id: 'muiEdit',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      // #endregion

      // #region Author
      authorImport: {
        id: 'authorImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      authorCreate: {
        id: 'authorCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.author_image],
      },
      authorEdit: {
        id: 'authorEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.author_image],
      },
      authorDestroy: {
        id: 'authorDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.author_image],
      },
      authorRead: {
        id: 'authorRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      authorAutocomplete: {
        id: 'authorAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Affiliate_link
      affiliateLinkImport: {
        id: 'affiliateLinkImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      affiliateLinkCreate: {
        id: 'affiliateLinkCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      affiliateLinkEdit: {
        id: 'affiliateLinkEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      affiliateLinkDestroy: {
        id: 'affiliateLinkDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      affiliateLinkRead: {
        id: 'affiliateLinkRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      affiliateLinkAutocomplete: {
        id: 'affiliateLinkAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Tracking Parameter
      trackingParameterImport: {
        id: 'trackingParameterImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      trackingParameterCreate: {
        id: 'trackingParameterCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      trackingParameterEdit: {
        id: 'trackingParameterEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      trackingParameterDestroy: {
        id: 'trackingParameterDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      trackingParameterRead: {
        id: 'trackingParameterRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      trackingParameterAutocomplete: {
        id: 'trackingParameterAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Broker
      brokerImport: {
        id: 'brokerImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerCreate: {
        id: 'brokerCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.broker_image_top_broker_logo,
          storage.broker_image_top_broker_horizontal_logo,
          storage.broker_image_broker_regulation_image,
          storage.broker_image_broker_logo,
          storage.broker_image_broker_detail_logo,
          storage.broker_certificate_image_certificate_image,
        ],
      },
      brokerEdit: {
        id: 'brokerEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.broker_image_top_broker_logo,
          storage.broker_image_top_broker_horizontal_logo,
          storage.broker_image_broker_regulation_image,
          storage.broker_image_broker_logo,
          storage.broker_image_broker_detail_logo,
          storage.broker_certificate_image_certificate_image,
        ],
      },
      brokerDestroy: {
        id: 'brokerDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.broker_image_top_broker_logo,
          storage.broker_image_top_broker_horizontal_logo,
          storage.broker_image_broker_regulation_image,
          storage.broker_image_broker_logo,
          storage.broker_image_broker_detail_logo,
          storage.broker_certificate_image_certificate_image,
        ],
      },
      brokerRead: {
        id: 'brokerRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerAutocomplete: {
        id: 'brokerAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Broker Article
      brokerArticleImport: {
        id: 'brokerArticleImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerArticleCreate: {
        id: 'brokerArticleCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerArticleEdit: {
        id: 'brokerArticleEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerArticleDestroy: {
        id: 'brokerArticleDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerArticleRead: {
        id: 'brokerArticleRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerArticleAutocomplete: {
        id: 'brokerArticleAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Broker Post
      brokerPostImport: {
        id: 'brokerPostImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerPostCreate: {
        id: 'brokerPostCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerPostEdit: {
        id: 'brokerPostEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerPostDestroy: {
        id: 'brokerPostDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerPostRead: {
        id: 'brokerPostRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brokerPostAutocomplete: {
        id: 'brokerPostAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Expert Advisor Test
      expertAdvisorTestImport: {
        id: 'expertAdvisorTestImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      expertAdvisorTestCreate: {
        id: 'expertAdvisorTestCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.expert_advisor_test_image],
      },
      expertAdvisorTestEdit: {
        id: 'expertAdvisorTestEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.expert_advisor_test_image],
      },
      expertAdvisorTestDestroy: {
        id: 'expertAdvisorTestDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.expert_advisor_test_image],
      },
      expertAdvisorTestRead: {
        id: 'expertAdvisorTestRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      expertAdvisorTestAutocomplete: {
        id: 'expertAdvisorTestAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Category
      categoryImport: {
        id: 'categoryImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      categoryCreate: {
        id: 'categoryCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      categoryEdit: {
        id: 'categoryEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      categoryDestroy: {
        id: 'categoryDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      categoryRead: {
        id: 'categoryRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      categoryAutocomplete: {
        id: 'categoryAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Navigation
      navigationImport: {
        id: 'navigationImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      navigationCreate: {
        id: 'navigationCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      navigationEdit: {
        id: 'navigationEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      navigationDestroy: {
        id: 'navigationDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      navigationRead: {
        id: 'navigationRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      navigationAutocomplete: {
        id: 'navigationAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region News
      newsImport: {
        id: 'newsImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      newsCreate: {
        id: 'newsCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.news_image],
      },
      newsEdit: {
        id: 'newsEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.news_image],
      },
      newsDestroy: {
        id: 'newsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.news_image],
      },
      newsRead: {
        id: 'newsRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      newsAutocomplete: {
        id: 'newsAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Promotion
      promotionImport: {
        id: 'promotionImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      promotionCreate: {
        id: 'promotionCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.promotion_image],
      },
      promotionEdit: {
        id: 'promotionEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.promotion_image],
      },
      promotionDestroy: {
        id: 'promotionDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.promotion_image],
      },
      promotionRead: {
        id: 'promotionRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      promotionAutocomplete: {
        id: 'promotionAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Openx
      openxImport: {
        id: 'openxImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      openxCreate: {
        id: 'openxCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      openxEdit: {
        id: 'openxEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      openxDestroy: {
        id: 'openxDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      openxRead: {
        id: 'openxRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      openxAutocomplete: {
        id: 'openxAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region General Page
      generalPageImport: {
        id: 'generalPageImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      generalPageCreate: {
        id: 'generalPageCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.page_image],
      },
      generalPageEdit: {
        id: 'generalPageEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.page_image],
      },
      generalPageDestroy: {
        id: 'generalPageDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.page_image],
      },
      generalPageRead: {
        id: 'generalPageRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      generalPageAutocomplete: {
        id: 'generalPageAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Warning Page
      pageWarningImport: {
        id: 'pageWarningImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      pageWarningCreate: {
        id: 'pageWarningCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      pageWarningEdit: {
        id: 'pageWarningEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      pageWarningDestroy: {
        id: 'pageWarningDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      pageWarningRead: {
        id: 'pageWarningRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      pageWarningAutocomplete: {
        id: 'pageWarningAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Blog
      blogImport: {
        id: 'blogImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      blogCreate: {
        id: 'blogCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.blog_image],
      },
      blogEdit: {
        id: 'blogEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.blog_image],
      },
      blogDestroy: {
        id: 'blogDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.blog_image],
      },
      blogRead: {
        id: 'blogRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      blogAutocomplete: {
        id: 'blogAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion

      // #region Blog Comment
      blogCommentImport: {
        id: 'blogCommentImport',
        allowedRoles: [],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      blogCommentCreate: {
        id: 'blogCommentCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      blogCommentEdit: {
        id: 'blogCommentEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      blogCommentDestroy: {
        id: 'blogCommentDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      blogCommentRead: {
        id: 'blogCommentRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      blogCommentAutocomplete: {
        id: 'blogCommentAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.custom,
        ],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      // #endregion
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
