import Permissions from 'src/security/permissions';
import config from 'src/config';
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/admin',
    i18n: 'dashboard.menu',
    parent: '/',
    redirect: '/admin/dashboard',
    permissionRequired: null,
    skipBreadcrumb: true,
    exact: true,
  },

  {
    path: '/admin/dashboard',
    i18n: 'dashboard.menu',
    parent: '/admin',
    loader: () =>
      import('src/view/dashboard/DashboardPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/report',
    collapseName: 'reports',
    i18n: 'collapses.reports.menu',
    parent: '/admin',
    redirect: '/admin/report/tasks-by-month',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/person-name-breadcrumb',
    collapseName: 'my-profile',
    // labelCode: '{USER_TEXT}',
    i18n: 'roles.admin.label',
    parent: '/admin',
    redirect: '/admin/profile',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/profile',
    collapseName: 'my-profile',
    i18n: 'auth.profile.title',
    parent: '/admin/person-name-breadcrumb',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/password-change',
    collapseName: 'my-profile',
    i18n: 'auth.passwordChange.title',
    parent: '/admin/person-name-breadcrumb',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/tenant',
    collapseName: 'my-profile',
    i18n: 'tenant.list.title',
    parent: '/admin/person-name-breadcrumb',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/tenant/new',
    collapseName: 'my-profile',
    i18n: 'tenant.new.title',
    parent: '/admin/tenant',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/tenant/:id/edit',
    collapseName: 'my-profile',
    i18n: 'tenant.edit.title',
    parent: '/admin/tenant',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  config.isPlanEnabled && {
    path: '/admin/plan',
    i18n: 'plan.title',
    collapseName: 'my-profile',
    parent: '/admin/person-name-breadcrumb',
    loader: () => import('src/view/plan/PlanPage'),
    permissionRequired: permissions.planRead,
    exact: true,
  },

  {
    path: '/admin/user',
    i18n: 'user.menu',
    parent: '/admin',
    loader: () => import('src/view/user/list/UserPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/admin/user/new',
    i18n: 'user.new.title',
    parent: '/admin/user',
    loader: () => import('src/view/user/new/UserNewPage'),
    permissionRequired: permissions.userCreate,
    exact: true,
  },

  {
    path: '/admin/user/importer',
    i18n: 'user.importer.title',
    parent: '/admin/user',
    loader: () =>
      import('src/view/user/importer/UserImporterPage'),
    permissionRequired: permissions.userImport,
    exact: true,
  },

  {
    path: '/admin/user/:id/edit',
    i18n: 'user.edit.title',
    parent: '/admin/user',
    loader: () => import('src/view/user/edit/UserEditPage'),
    permissionRequired: permissions.userEdit,
    exact: true,
  },

  {
    path: '/admin/user/:id',
    i18n: 'user.view.title',
    parent: '/admin/user',
    loader: () => import('src/view/user/view/UserViewPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/admin/settings-breadcrumb',
    collapseName: 'settings',
    i18n: 'settings.title',
    parent: '/admin',
    redirect: '/admin/settings',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/audit-logs',
    collapseName: 'settings',
    i18n: 'auditLog.menu',
    parent: '/admin/settings-breadcrumb',
    loader: () => import('src/view/auditLog/AuditLogPage'),
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/admin/settings',
    collapseName: 'settings',
    i18n: 'settings.tenant',
    parent: '/admin/settings-breadcrumb',
    loader: () =>
      import('src/view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
  },

  // #region Broker
  {
    path: '/admin/broker',
    collapseName: 'broker',
    i18n: 'entities.broker.menu',
    parent: '/admin',
    loader: () =>
      import('src/view/broker/list/BrokerListPage'),
    permissionRequired: permissions.brokerRead,
    exact: true,
  },

  {
    path: '/admin/broker/new',
    collapseName: 'broker',
    i18n: 'entities.broker.new.title',
    parent: '/admin/broker',
    loader: () =>
      import('src/view/broker/form/BrokerFormPage'),
    permissionRequired: permissions.brokerCreate,
    exact: true,
  },

  {
    path: '/admin/broker/importer',
    collapseName: 'broker',
    i18n: 'entities.broker.importer.title',
    parent: '/admin/broker',
    loader: () =>
      import('src/view/broker/importer/BrokerImporterPage'),
    permissionRequired: permissions.brokerImport,
    exact: true,
  },

  {
    path: '/admin/broker/:id/edit',
    collapseName: 'broker',
    i18n: 'entities.broker.edit.title',
    parent: '/admin/broker',
    loader: () =>
      import('src/view/broker/form/BrokerFormPage'),
    permissionRequired: permissions.brokerEdit,
    exact: true,
  },

  {
    path: '/admin/broker/:id',
    collapseName: 'broker',
    i18n: 'entities.broker.view.title',
    parent: '/admin/broker',
    loader: () =>
      import('src/view/broker/view/BrokerViewPage'),
    permissionRequired: permissions.brokerRead,
    exact: true,
  },
  // #endregion

  // #region Author
  {
    path: '/admin/author',
    collapseName: 'author',
    i18n: 'collapses.author.menu',
    parent: '/admin',
    loader: () =>
      import('src/view/author/list/AuthorListPage'),
    permissionRequired: permissions.authorRead,
    exact: true,
  },
  {
    path: '/admin/author/new',
    collapseName: 'author',
    i18n: 'entities.author.new.title',
    parent: '/admin/author',
    loader: () =>
      import('src/view/author/form/AuthorFormPage'),
    permissionRequired: permissions.authorCreate,
    exact: true,
  },

  {
    path: '/admin/author/importer',
    collapseName: 'author',
    i18n: 'entities.author.importer.title',
    parent: '/admin/author',
    loader: () =>
      import('src/view/author/importer/AuthorImporterPage'),
    permissionRequired: permissions.authorImport,
    exact: true,
  },

  {
    path: '/admin/author/:id/edit',
    collapseName: 'author',
    i18n: 'entities.author.edit.title',
    parent: '/admin/author',
    loader: () =>
      import('src/view/author/form/AuthorFormPage'),
    permissionRequired: permissions.authorEdit,
    exact: true,
  },

  {
    path: '/admin/author/:id',
    collapseName: 'author',
    i18n: 'entities.author.view.title',
    parent: '/admin/author',
    loader: () =>
      import('src/view/author/view/AuthorViewPage'),
    permissionRequired: permissions.authorRead,
    exact: true,
  },
  // #endregion

  // #region Affiliate link
  {
    path: '/admin/affiliate-links',
    collapseName: 'affiliateLinks',
    i18n: 'collapses.affiliateLink.menu',
    parent: '/admin',
    redirect: '/admin/affiliate-link',
    permissionRequired: null,
    virtual: true,
  },

  // #region Affiliate links
  {
    path: '/admin/affiliate-link',
    collapseName: 'affiliateLinks',
    i18n: 'entities.affiliateLink.menu',
    parent: '/admin/affiliate-links',
    loader: () =>
      import(
        'src/view/affiliateLink/list/AffiliateLinkListPage'
      ),
    permissionRequired: permissions.affiliateLinkRead,
    exact: true,
  },
  {
    path: '/admin/affiliate-link/new',
    collapseName: 'affiliateLinks',
    i18n: 'entities.affiliateLink.new.title',
    parent: '/admin/affiliate-link',
    loader: () =>
      import(
        'src/view/affiliateLink/form/AffiliateLinkFormPage'
      ),
    permissionRequired: permissions.affiliateLinkCreate,
    exact: true,
  },

  {
    path: '/admin/affiliate-link/importer',
    collapseName: 'affiliateLinks',
    i18n: 'entities.affiliateLink.importer.title',
    parent: '/admin/affiliate-link',
    loader: () =>
      import(
        'src/view/affiliateLink/importer/AffiliateLinkImporterPage'
      ),
    permissionRequired: permissions.affiliateLinkImport,
    exact: true,
  },

  {
    path: '/admin/affiliate-link/:id/edit',
    collapseName: 'affiliateLinks',
    i18n: 'entities.affiliateLink.edit.title',
    parent: '/admin/affiliate-link',
    loader: () =>
      import(
        'src/view/affiliateLink/form/AffiliateLinkFormPage'
      ),
    permissionRequired: permissions.affiliateLinkEdit,
    exact: true,
  },

  {
    path: '/admin/affiliate-link/:id',
    collapseName: 'affiliateLinks',
    i18n: 'entities.affiliateLink.view.title',
    parent: '/admin/affiliate-link',
    loader: () =>
      import(
        'src/view/affiliateLink/view/AffiliateLinkViewPage'
      ),
    permissionRequired: permissions.affiliateLinkRead,
    exact: true,
  },
  // #endregion

  // #region Tracking Parameter
  {
    path: '/admin/tracking-parameter',
    collapseName: 'affiliateLinks',
    i18n: 'entities.trackingParameter.menu',
    parent: '/admin/affiliate-links',
    loader: () =>
      import(
        'src/view/trackingParameter/list/TrackingParameterListPage'
      ),
    permissionRequired: permissions.trackingParameterRead,
    exact: true,
  },
  {
    path: '/admin/tracking-parameter/new',
    collapseName: 'affiliateLinks',
    i18n: 'entities.trackingParameter.new.title',
    parent: '/admin/tracking-parameter',
    loader: () =>
      import(
        'src/view/trackingParameter/form/TrackingParameterFormPage'
      ),
    permissionRequired: permissions.trackingParameterCreate,
    exact: true,
  },

  {
    path: '/admin/tracking-parameter/importer',
    collapseName: 'affiliateLinks',
    i18n: 'entities.trackingParameter.importer.title',
    parent: '/admin/tracking-parameter',
    loader: () =>
      import(
        'src/view/trackingParameter/importer/TrackingParameterImporterPage'
      ),
    permissionRequired: permissions.trackingParameterImport,
    exact: true,
  },

  {
    path: '/admin/tracking-parameter/:id/edit',
    collapseName: 'affiliateLinks',
    i18n: 'entities.trackingParameter.edit.title',
    parent: '/admin/tracking-parameter',
    loader: () =>
      import(
        'src/view/trackingParameter/form/TrackingParameterFormPage'
      ),
    permissionRequired: permissions.trackingParameterEdit,
    exact: true,
  },

  {
    path: '/admin/tracking-parameter/:id',
    collapseName: 'affiliateLinks',
    i18n: 'entities.trackingParameter.view.title',
    parent: '/admin/tracking-parameter',
    loader: () =>
      import(
        'src/view/trackingParameter/view/TrackingParameterViewPage'
      ),
    permissionRequired: permissions.trackingParameterRead,
    exact: true,
  },
  // #endregion

  // #endregion

  // #region Blogs
  {
    path: '/admin/blogs',
    collapseName: 'blog',
    i18n: 'collapses.blog.menu',
    parent: '/admin',
    redirect: '/admin/blog',
    permissionRequired: null,
    virtual: true,
  },

  // #region Blog
  {
    path: '/admin/blog',
    collapseName: 'blog',
    i18n: 'entities.blog.menu',
    parent: '/admin/blogs',
    loader: () => import('src/view/blog/list/BlogListPage'),
    permissionRequired: permissions.blogRead,
    exact: true,
  },
  {
    path: '/admin/blog/new',
    collapseName: 'blog',
    i18n: 'entities.blog.new.title',
    parent: '/admin/blog',
    loader: () => import('src/view/blog/form/BlogFormPage'),
    permissionRequired: permissions.blogCreate,
    exact: true,
  },

  {
    path: '/admin/blog/importer',
    collapseName: 'blog',
    i18n: 'entities.blog.importer.title',
    parent: '/admin/blog',
    loader: () =>
      import('src/view/blog/importer/BlogImporterPage'),
    permissionRequired: permissions.blogImport,
    exact: true,
  },

  {
    path: '/admin/blog/:id/edit',
    collapseName: 'blog',
    i18n: 'entities.blog.edit.title',
    parent: '/admin/blog',
    loader: () => import('src/view/blog/form/BlogFormPage'),
    permissionRequired: permissions.blogEdit,
    exact: true,
  },

  {
    path: '/admin/blog/:id',
    collapseName: 'blog',
    i18n: 'entities.blog.view.title',
    parent: '/admin/blog',
    loader: () => import('src/view/blog/view/BlogViewPage'),
    permissionRequired: permissions.blogRead,
    exact: true,
  },
  // #endregion

  // #region Blog Comment
  {
    path: '/admin/blog-comment',
    collapseName: 'blog',
    i18n: 'entities.blogComment.menu',
    parent: '/admin/blogs',
    loader: () =>
      import(
        'src/view/blogComment/list/BlogCommentListPage'
      ),
    permissionRequired: permissions.blogCommentRead,
    exact: true,
  },
  {
    path: '/admin/blog-comment/new',
    collapseName: 'blog',
    i18n: 'entities.blogComment.new.title',
    parent: '/admin/blog-comment',
    loader: () =>
      import(
        'src/view/blogComment/form/BlogCommentFormPage'
      ),
    permissionRequired: permissions.blogCommentCreate,
    exact: true,
  },

  {
    path: '/admin/blog-comment/importer',
    collapseName: 'blog',
    i18n: 'entities.blogComment.importer.title',
    parent: '/admin/blog-comment',
    loader: () =>
      import(
        'src/view/blogComment/importer/BlogCommentImporterPage'
      ),
    permissionRequired: permissions.blogCommentImport,
    exact: true,
  },

  {
    path: '/admin/blog-comment/:id/edit',
    collapseName: 'blog',
    i18n: 'entities.blogComment.edit.title',
    parent: '/admin/blog-comment',
    loader: () =>
      import(
        'src/view/blogComment/form/BlogCommentFormPage'
      ),
    permissionRequired: permissions.blogCommentEdit,
    exact: true,
  },

  {
    path: '/admin/blog-comment/:id',
    collapseName: 'blog',
    i18n: 'entities.blogComment.view.title',
    parent: '/admin/blog-comment',
    loader: () =>
      import(
        'src/view/blogComment/view/BlogCommentViewPage'
      ),
    permissionRequired: permissions.blogCommentRead,
    exact: true,
  },
  // #endregion

  // #endregion

  // #region Broker Post
  {
    path: '/admin/broker-post',
    collapseName: 'brokerPost',
    i18n: 'collapses.brokerPost.menu',
    parent: '/admin',
    loader: () =>
      import('src/view/brokerPost/list/BrokerPostListPage'),
    permissionRequired: permissions.brokerPostRead,
    exact: true,
  },
  {
    path: '/admin/broker-post/new/:id',
    collapseName: 'brokerPost',
    i18n: 'entities.brokerPost.new.title',
    parent: '/admin/broker-post',
    loader: () =>
      import('src/view/brokerPost/form/BrokerPostFormPage'),
    permissionRequired: permissions.brokerPostCreate,
    exact: true,
  },

  {
    path: '/admin/broker-post/importer',
    collapseName: 'brokerPost',
    i18n: 'entities.brokerPost.importer.title',
    parent: '/admin/broker-post',
    loader: () =>
      import(
        'src/view/brokerPost/importer/BrokerPostImporterPage'
      ),
    permissionRequired: permissions.brokerPostImport,
    exact: true,
  },

  {
    path: '/admin/broker-post/:id/edit',
    collapseName: 'brokerPost',
    i18n: 'entities.brokerPost.edit.title',
    parent: '/admin/broker-post',
    loader: () =>
      import('src/view/brokerPost/form/BrokerPostFormPage'),
    permissionRequired: permissions.brokerPostEdit,
    exact: true,
  },

  {
    path: '/admin/broker-post/:id',
    collapseName: 'brokerPost',
    i18n: 'entities.brokerPost.view.title',
    parent: '/admin/broker-post',
    loader: () =>
      import('src/view/brokerPost/view/BrokerPostViewPage'),
    permissionRequired: permissions.brokerPostRead,
    exact: true,
  },
  // #endregion

  // #region Expert Advisor Test
  {
    path: '/admin/expert-advisor-test',
    collapseName: 'expertAdvisorTest',
    i18n: 'collapses.expertAdvisorTest.menu',
    parent: '/admin',
    loader: () =>
      import(
        'src/view/expertAdvisorTest/list/ExpertAdvisorTestListPage'
      ),
    permissionRequired: permissions.expertAdvisorTestRead,
    exact: true,
  },
  {
    path: '/admin/expert-advisor-test/new',
    collapseName: 'expertAdvisorTest',
    i18n: 'entities.expertAdvisorTest.new.title',
    parent: '/admin/expert-advisor-test',
    loader: () =>
      import(
        'src/view/expertAdvisorTest/form/ExpertAdvisorTestFormPage'
      ),
    permissionRequired: permissions.expertAdvisorTestCreate,
    exact: true,
  },

  {
    path: '/admin/expert-advisor-test/importer',
    collapseName: 'expertAdvisorTest',
    i18n: 'entities.expertAdvisorTest.importer.title',
    parent: '/admin/expert-advisor-test',
    loader: () =>
      import(
        'src/view/expertAdvisorTest/importer/ExpertAdvisorTestImporterPage'
      ),
    permissionRequired: permissions.expertAdvisorTestImport,
    exact: true,
  },

  {
    path: '/admin/expert-advisor-test/:id/edit',
    collapseName: 'expertAdvisorTest',
    i18n: 'entities.expertAdvisorTest.edit.title',
    parent: '/admin/expert-advisor-test',
    loader: () =>
      import(
        'src/view/expertAdvisorTest/form/ExpertAdvisorTestFormPage'
      ),
    permissionRequired: permissions.expertAdvisorTestEdit,
    exact: true,
  },

  {
    path: '/admin/expert-advisor-test/:id',
    collapseName: 'expertAdvisorTest',
    i18n: 'entities.expertAdvisorTest.view.title',
    parent: '/admin/expert-advisor-test',
    loader: () =>
      import(
        'src/view/expertAdvisorTest/view/ExpertAdvisorTestViewPage'
      ),
    permissionRequired: permissions.expertAdvisorTestRead,
    exact: true,
  },
  // #endregion

  // #region Routes
  {
    path: '/admin/routes',
    collapseName: 'routes',
    i18n: 'collapses.routes.menu',
    parent: '/admin',
    redirect: '/admin/navigation',
    permissionRequired: null,
    virtual: true,
  },

  // #region Navigation
  {
    path: '/admin/navigation',
    collapseName: 'routes',
    i18n: 'entities.navigation.menu',
    parent: '/admin/routes',
    loader: () =>
      import('src/view/navigation/list/NavigationListPage'),
    permissionRequired: permissions.navigationRead,
    exact: true,
  },

  {
    path: '/admin/navigation/new',
    collapseName: 'routes',
    i18n: 'entities.navigation.new.title',
    parent: '/admin/navigation',
    loader: () =>
      import('src/view/navigation/form/NavigationFormPage'),
    permissionRequired: permissions.navigationCreate,
    exact: true,
  },

  {
    path: '/admin/navigation/importer',
    collapseName: 'routes',
    i18n: 'entities.navigation.importer.title',
    parent: '/admin/navigation',
    loader: () =>
      import(
        'src/view/navigation/importer/NavigationImporterPage'
      ),
    permissionRequired: permissions.navigationImport,
    exact: true,
  },

  {
    path: '/admin/navigation/:id/edit',
    collapseName: 'routes',
    i18n: 'entities.navigation.edit.title',
    parent: '/admin/navigation',
    loader: () =>
      import('src/view/navigation/form/NavigationFormPage'),
    permissionRequired: permissions.navigationEdit,
    exact: true,
  },

  {
    path: '/admin/navigation/:id',
    collapseName: 'routes',
    i18n: 'entities.navigation.view.title',
    parent: '/admin/navigation',
    loader: () =>
      import('src/view/navigation/view/NavigationViewPage'),
    permissionRequired: permissions.navigationRead,
    exact: true,
  },
  // #endregion

  // #region Broker Article
  {
    path: '/admin/broker-article',
    collapseName: 'broker',
    i18n: 'entities.brokerArticle.menu',
    parent: '/admin/routes',
    loader: () =>
      import(
        'src/view/brokerArticle/list/BrokerArticleListPage'
      ),
    permissionRequired: permissions.brokerArticleRead,
    exact: true,
  },

  {
    path: '/admin/broker-article/new',
    collapseName: 'broker',
    i18n: 'entities.brokerArticle.new.title',
    parent: '/admin/brokerArticle',
    loader: () =>
      import(
        'src/view/brokerArticle/form/BrokerArticleFormPage'
      ),
    permissionRequired: permissions.brokerArticleCreate,
    exact: true,
  },

  {
    path: '/admin/broker-article/importer',
    collapseName: 'broker',
    i18n: 'entities.brokerArticle.importer.title',
    parent: '/admin/brokerArticle',
    loader: () =>
      import(
        'src/view/brokerArticle/importer/BrokerArticleImporterPage'
      ),
    permissionRequired: permissions.brokerArticleImport,
    exact: true,
  },

  {
    path: '/admin/broker-article/:id/edit',
    collapseName: 'broker',
    i18n: 'entities.brokerArticle.edit.title',
    parent: '/admin/brokerArticle',
    loader: () =>
      import(
        'src/view/brokerArticle/form/BrokerArticleFormPage'
      ),
    permissionRequired: permissions.brokerArticleEdit,
    exact: true,
  },

  {
    path: '/admin/broker-article/:id',
    collapseName: 'broker',
    i18n: 'entities.brokerArticle.view.title',
    parent: '/admin/brokerArticle',
    loader: () =>
      import(
        'src/view/brokerArticle/view/BrokerArticleViewPage'
      ),
    permissionRequired: permissions.brokerArticleRead,
    exact: true,
  },
  // #endregion

  // #region Category
  {
    path: '/admin/category',
    collapseName: 'routes',
    i18n: 'entities.category.menu',
    parent: '/admin/routes',
    loader: () =>
      import('src/view/category/list/CategoryListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/admin/category/new',
    collapseName: 'routes',
    i18n: 'entities.category.new.title',
    parent: '/admin/category',
    loader: () =>
      import('src/view/category/form/CategoryFormPage'),
    permissionRequired: permissions.categoryCreate,
    exact: true,
  },

  {
    path: '/admin/category/importer',
    collapseName: 'routes',
    i18n: 'entities.category.importer.title',
    parent: '/admin/category',
    loader: () =>
      import(
        'src/view/category/importer/CategoryImporterPage'
      ),
    permissionRequired: permissions.categoryImport,
    exact: true,
  },

  {
    path: '/admin/category/:id/edit',
    collapseName: 'routes',
    i18n: 'entities.category.edit.title',
    parent: '/admin/category',
    loader: () =>
      import('src/view/category/form/CategoryFormPage'),
    permissionRequired: permissions.categoryEdit,
    exact: true,
  },

  {
    path: '/admin/category/:id',
    collapseName: 'routes',
    i18n: 'entities.category.view.title',
    parent: '/admin/category',
    loader: () =>
      import('src/view/category/view/CategoryViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  // #endregion

  // #endregion

  // #region news
  {
    path: '/admin/news',
    collapseName: 'news',
    i18n: 'entities.news.menu',
    parent: '/admin',
    loader: () => import('src/view/news/list/NewsListPage'),
    permissionRequired: permissions.newsRead,
    exact: true,
  },
  {
    path: '/admin/news/new',
    collapseName: 'news',
    i18n: 'entities.news.new.title',
    parent: '/admin/news',
    loader: () => import('src/view/news/form/NewsFormPage'),
    permissionRequired: permissions.newsCreate,
    exact: true,
  },

  {
    path: '/admin/news/importer',
    collapseName: 'news',
    i18n: 'entities.news.importer.title',
    parent: '/admin/news',
    loader: () =>
      import('src/view/news/importer/NewsImporterPage'),
    permissionRequired: permissions.newsImport,
    exact: true,
  },

  {
    path: '/admin/news/:id/edit',
    collapseName: 'news',
    i18n: 'entities.news.edit.title',
    parent: '/admin/news',
    loader: () => import('src/view/news/form/NewsFormPage'),
    permissionRequired: permissions.newsEdit,
    exact: true,
  },

  {
    path: '/admin/news/:id',
    collapseName: 'news',
    i18n: 'entities.news.view.title',
    parent: '/admin/news',
    loader: () => import('src/view/news/view/NewsViewPage'),
    permissionRequired: permissions.newsRead,
    exact: true,
  },
  // #endregion

  // #region Promotion
  {
    path: '/admin/promotions',
    collapseName: 'promotion',
    i18n: 'collapses.promotion.menu',
    parent: '/admin',
    redirect: '/admin/promotion',
    permissionRequired: null,
    virtual: true,
  },

  // #region Promotions
  {
    path: '/admin/promotion',
    collapseName: 'promotion',
    i18n: 'entities.promotion.menu',
    parent: '/admin/promotions',
    loader: () =>
      import('src/view/promotion/list/PromotionListPage'),
    permissionRequired: permissions.promotionRead,
    exact: true,
  },
  {
    path: '/admin/promotion/new',
    collapseName: 'promotion',
    i18n: 'entities.promotion.new.title',
    parent: '/admin/promotion',
    loader: () =>
      import('src/view/promotion/form/PromotionFormPage'),
    permissionRequired: permissions.promotionCreate,
    exact: true,
  },

  {
    path: '/admin/promotion/importer',
    collapseName: 'promotion',
    i18n: 'entities.promotion.importer.title',
    parent: '/admin/promotion',
    loader: () =>
      import(
        'src/view/promotion/importer/PromotionImporterPage'
      ),
    permissionRequired: permissions.promotionImport,
    exact: true,
  },

  {
    path: '/admin/promotion/:id/edit',
    collapseName: 'promotion',
    i18n: 'entities.promotion.edit.title',
    parent: '/admin/promotion',
    loader: () =>
      import('src/view/promotion/form/PromotionFormPage'),
    permissionRequired: permissions.promotionEdit,
    exact: true,
  },

  {
    path: '/admin/promotion/:id',
    collapseName: 'promotion',
    i18n: 'entities.promotion.view.title',
    parent: '/admin/promotion',
    loader: () =>
      import('src/view/promotion/view/PromotionViewPage'),
    permissionRequired: permissions.promotionRead,
    exact: true,
  },
  // #endregion

  // #region Openx banners
  {
    path: '/admin/open-x',
    collapseName: 'promotion',
    i18n: 'entities.openx.menu',
    parent: '/admin/promotions',
    loader: () =>
      import('src/view/openx/list/OpenxListPage'),
    permissionRequired: permissions.openxRead,
    exact: true,
  },
  {
    path: '/admin/open-x/new',
    collapseName: 'promotion',
    i18n: 'entities.openx.new.title',
    parent: '/admin/open-x',
    loader: () =>
      import('src/view/openx/form/OpenxFormPage'),
    permissionRequired: permissions.openxCreate,
    exact: true,
  },

  {
    path: '/admin/open-x/importer',
    collapseName: 'promotion',
    i18n: 'entities.openx.importer.title',
    parent: '/admin/open-x',
    loader: () =>
      import('src/view/openx/importer/OpenxImporterPage'),
    permissionRequired: permissions.openxImport,
    exact: true,
  },

  {
    path: '/admin/open-x/:id/edit',
    collapseName: 'promotion',
    i18n: 'entities.openx.edit.title',
    parent: '/admin/open-x',
    loader: () =>
      import('src/view/openx/form/OpenxFormPage'),
    permissionRequired: permissions.openxEdit,
    exact: true,
  },

  {
    path: '/admin/open-x/:id',
    collapseName: 'promotion',
    i18n: 'entities.openx.view.title',
    parent: '/admin/open-x',
    loader: () =>
      import('src/view/openx/view/OpenxViewPage'),
    permissionRequired: permissions.openxRead,
    exact: true,
  },
  // #endregion

  // #endregion

  // #region Site Page
  {
    path: '/admin/site-page',
    collapseName: 'page',
    i18n: 'collapses.sitePage.menu',
    parent: '/admin',
    redirect: '/admin/general-page',
    permissionRequired: null,
    virtual: true,
  },

  // #region General Page
  {
    path: '/admin/general-page',
    collapseName: 'page',
    i18n: 'collapses.generalPage.menu',
    parent: '/admin/site-page',
    loader: () => import('src/view/page/list/PageListPage'),
    permissionRequired: permissions.generalPageRead,
    exact: true,
  },

  {
    path: '/admin/general-page/new',
    collapseName: 'page',
    i18n: 'entities.generalPage.new.title',
    parent: '/admin/general-page',
    loader: () => import('src/view/page/form/PageFormPage'),
    permissionRequired: permissions.generalPageCreate,
    exact: true,
  },

  {
    path: '/admin/general-page/importer',
    collapseName: 'page',
    i18n: 'entities.generalPage.importer.title',
    parent: '/admin/general-page',
    loader: () =>
      import('src/view/page/importer/PageImporterPage'),
    permissionRequired: permissions.generalPageImport,
    exact: true,
  },

  {
    path: '/admin/general-page/:id/edit',
    collapseName: 'page',
    i18n: 'entities.generalPage.edit.title',
    parent: '/admin/general-page',
    loader: () => import('src/view/page/form/PageFormPage'),
    permissionRequired: permissions.generalPageEdit,
    exact: true,
  },

  {
    path: '/admin/general-page/:id',
    collapseName: 'page',
    i18n: 'entities.generalPage.view.title',
    parent: '/admin/general-page',
    loader: () => import('src/view/page/view/PageViewPage'),
    permissionRequired: permissions.generalPageRead,
    exact: true,
  },
  // #endregion

  // #region Warning Page
  {
    path: '/admin/page-warning',
    collapseName: 'page',
    i18n: 'collapses.pageWarning.menu',
    parent: '/admin/site-page',
    loader: () =>
      import(
        'src/view/pageWarning/list/PageWarningListPage'
      ),
    permissionRequired: permissions.pageWarningRead,
    exact: true,
  },

  {
    path: '/admin/page-warning/new',
    collapseName: 'page',
    i18n: 'entities.pageWarning.new.title',
    parent: '/admin/page-warning',
    loader: () =>
      import(
        'src/view/pageWarning/form/PageWarningFormPage'
      ),
    permissionRequired: permissions.pageWarningCreate,
    exact: true,
  },

  {
    path: '/admin/page-warning/importer',
    collapseName: 'page',
    i18n: 'entities.pageWarning.importer.title',
    parent: '/admin/page-warning',
    loader: () =>
      import(
        'src/view/pageWarning/importer/PageWarningImporterPage'
      ),
    permissionRequired: permissions.pageWarningImport,
    exact: true,
  },

  {
    path: '/admin/page-warning/:id/edit',
    collapseName: 'page',
    i18n: 'entities.pageWarning.edit.title',
    parent: '/admin/page-warning',
    loader: () =>
      import(
        'src/view/pageWarning/form/PageWarningFormPage'
      ),
    permissionRequired: permissions.pageWarningEdit,
    exact: true,
  },

  {
    path: '/admin/page-warning/:id',
    collapseName: 'page',
    i18n: 'entities.pageWarning.view.title',
    parent: '/admin/page-warning',
    loader: () =>
      import(
        'src/view/pageWarning/view/PageWarningViewPage'
      ),
    permissionRequired: permissions.pageWarningRead,
    exact: true,
  },
  // #endregion

  // #endregion
].filter(Boolean);

const publicRoutes = [
  {
    path: '/admin/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
    exact: true,
  },
  {
    path: '/admin/auth/signup',
    loader: () => import('src/view/auth/SignupPage'),
    exact: true,
  },
  {
    path: '/admin/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
    exact: true,
  },
].filter(Boolean);

const emptyTenantRoutes = [
  {
    path: '/admin/auth/tenant',
    loader: () => import('src/view/auth/TenantPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/admin/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/admin/auth/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/admin/auth/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/admin/auth/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/admin/auth/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/404',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
].filter(Boolean);

const frontEndRoutes = [
  {
    path: '/',
    loader: () => import('src/view/home/HomeViewPage'),
  },
  {
    path: '/kontakt',
    loader: () => import('src/view/home/Contact'),
  },
  {
    path: '/zu/**',
    loader: () => import('src/view/home/Redirect'),
  },
  {
    path: '/broker-vergleich',
    loader: () =>
      import('src/view/home/broker/ComparisonPage'),
  },
  {
    path: '/forex-cfd-broker-vergleich',
    loader: () =>
      import('src/view/home/broker/BrokerComparisonPage'),
  },
  {
    path: '/forex-cfd-broker-vergleich/**',
    loader: () =>
      import('src/view/home/broker/BrokerComparisonPage'),
  },
  {
    path: '/blog',
    loader: () => import('src/view/home/blog/BlogListPage'),
  },
  {
    path: '/blog/**',
    loader: () =>
      import('src/view/home/blog/BlogDetailPage'),
  },
  {
    path: '/erfahrungsberichte/**',
    loader: () =>
      import('src/view/home/broker/BrokerViewPage'),
  },
  {
    path: '**',
    loader: () => import('src/view/home/GeneralPage'),
  },
].filter(Boolean);

export default {
  emailUnverifiedRoutes,
  emptyPermissionsRoutes,
  emptyTenantRoutes,
  frontEndRoutes,
  privateRoutes,
  publicRoutes,
  simpleRoutes,
};

export function findRoute(url = null, routes = []) {
  return (
    !!url &&
    (routes.find((route) => url === route.path) ||
      routes.find(
        (route) =>
          /\/:[\w\d_-]+/g.test(route.path) &&
          new RegExp(
            `^${route.path.replace(
              /:[\w\d_-]+/g,
              '[\\w\\d]+',
            )}$`,
          ).test(url),
      ))
  );
}

export function matchedRoutes(
  url = null,
  exactOnly = false,
) {
  if (url === null || url === undefined) {
    return null;
  }

  let routes = [];

  const searchRouteStack = (url, exactOnly) => {
    const found = findRoute(url, privateRoutes);

    if (exactOnly === true) {
      return found;
    }

    if (found) {
      routes.push(found);
      if (found.parent && found.parent !== '/') {
        return searchRouteStack(found.parent, exactOnly);
      }
    }

    routes.reverse();

    return routes;
  };

  return searchRouteStack(url, exactOnly);
}
