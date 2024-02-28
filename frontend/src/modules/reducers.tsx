import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import affiliateLink from 'src/modules/affiliateLink/affiliateLinkReducers';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import auth from 'src/modules/auth/authReducers';
import author from 'src/modules/author/authorReducers';
import blog from 'src/modules/blog/blogReducers';
import blogComment from 'src/modules/blogComment/blogCommentReducers';
import broker from 'src/modules/broker/brokerReducers';
import brokerArticle from 'src/modules/brokerArticle/brokerArticleReducers';
import brokerPost from 'src/modules/brokerPost/brokerPostReducers';
import category from 'src/modules/category/categoryReducers';
import expertAdvisorTest from 'src/modules/expertAdvisorTest/expertAdvisorTestReducers';
import form from 'src/modules/form/formReducers';
import layout from 'src/modules/layout/layoutReducers';
import mui from 'src/modules/mui/muiReducers';
import navigation from 'src/modules/navigation/navigationReducers';
import news from 'src/modules/news/newsReducers';
import openx from 'src/modules/openx/openxReducers';
import page from 'src/modules/page/pageReducers';
import pageWarning from 'src/modules/pageWarning/pageWarningReducers';
import plan from 'src/modules/plan/planReducers';
import promotion from 'src/modules/promotion/promotionReducers';
import settings from 'src/modules/settings/settingsReducers';
import sitemap from 'src/modules/sitemap/sitemapReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import trackingParameter from 'src/modules/trackingParameter/trackingParameterReducers';
import user from 'src/modules/user/userReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    affiliateLink,
    auditLog,
    auth,
    author,
    blog,
    blogComment,
    broker,
    brokerArticle,
    brokerPost,
    category,
    expertAdvisorTest,
    form,
    layout,
    mui,
    navigation,
    news,
    openx,
    page,
    pageWarning,
    plan,
    promotion,
    settings,
    sitemap,
    tenant,
    trackingParameter,
    user,
  });
