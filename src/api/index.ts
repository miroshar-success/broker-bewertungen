import { authMiddleware } from '../middlewares/authMiddleware';
import { contentType } from 'mime-types';
import { createRateLimiter } from './apiRateLimiter';
import { databaseMiddleware } from '../middlewares/databaseMiddleware';
import { languageMiddleware } from '../middlewares/languageMiddleware';
import { tenantMiddleware } from '../middlewares/tenantMiddleware';
import * as fs from 'fs';
import authSocial from './auth/authSocial';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import setupSwaggerUI from './apiDocumentation';
import { handleSEO } from '../seo';
import { getConfig } from '../config';

const app = express();

// Enables CORS
app.use(cors({ origin: true }));

// Initializes and adds the database middleware.
app.use(databaseMiddleware);

// Sets the current language of the request
app.use(languageMiddleware);

// Configures the authentication middleware
// to set the currentUser to the requests
app.use(authMiddleware);

// Setup the Documentation
setupSwaggerUI(app);

// Default rate limiter
const defaultRateLimiter = createRateLimiter({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'errors.429',
});
app.use(defaultRateLimiter);

// Enables Helmet, a set of tools to
// increase security.
// const cspDirectives = {
//   ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//   'script-src': [
//     "'self'",
//     "'unsafe-eval'",
//     "'unsafe-inline'",
//   ],
//   'script-src-elem': ['*'],
//   'frame-src': ['*'],
// };

// console.log('----- Content Security Policy -----');
// console.log(cspDirectives);

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       useDefaults: false,
//       directives: {
//         ...cspDirectives,
//       },
//     },
//   }),
// );

// Parses the body of POST/PUT request
// to JSON
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      const url = (<any>req).originalUrl;
      if (url.startsWith('/api/plan/stripe/webhook')) {
        // Stripe Webhook needs the body raw in order
        // to validate the request
        (<any>req).rawBody = buf.toString();
      }
    },
  }),
);

// Configure the Entity routes
const routes = express.Router();

// Enable Passport for Social Sign-in
authSocial(app, routes);

require('./affiliateLink').default(routes);
require('./auditLog').default(routes);
require('./auth').default(routes);
require('./author').default(routes);
require('./blog').default(routes);
require('./blogComment').default(routes);
require('./broker').default(routes);
require('./brokerArticle').default(routes);
require('./brokerPost').default(routes);
require('./category').default(routes);
require('./expertAdvisorTest').default(routes);
require('./file').default(routes);
require('./mui').default(routes);
require('./navigation').default(routes);
require('./news').default(routes);
require('./openx').default(routes);
require('./page').default(routes);
require('./pageWarning').default(routes);
require('./plan').default(routes);
require('./promotion').default(routes);
require('./settings').default(routes);
require('./sitemap').default(routes);
require('./tenant').default(routes);
require('./trackingParameter').default(routes);
require('./user').default(routes);

// Loads the Tenant if the :tenantId param is passed
routes.param('tenantId', tenantMiddleware);

// Add the routes to the /api endpoint
app.use('/api', routes);

const mimes = {
  '.css': 'text/css',
  '.js': 'text/javascript',
};

// For compressed files
app.get(
  ['*.css', '*.jpeg', '*.jpg', '*.js', '*.png', '*.svg'],
  (req, res, next) => {
    const gzUrl = path.resolve(
      __dirname,
      `../../frontend/build/${req.url}.gz`,
    );

    // only if file exists
    if (!fs.existsSync(gzUrl)) {
      return next();
    }

    res.set('Content-Encoding', 'gzip');
    const ext = path.extname(req.url);
    const ctnType =
      mimes[ext] ||
      contentType(ext) ||
      'application/octet-stream';
    res.set('Content-Type', ctnType);
    res.sendFile(gzUrl);
  },
);

app.use(
  express.static(path.resolve(__dirname, '../../uploads')),
);

app.use(
  express.static(
    path.resolve(__dirname, '../../frontend/build'),
  ),
);

app.get('*', async (req, res) => {
  if (
    String(getConfig().SEO_SSR).toLowerCase() === 'false' ||
    !(await handleSEO(req, res))
  ) {
    res.sendFile(
      path.resolve(
        __dirname,
        '../../frontend/build',
        'index.html',
      ),
    );
  }
});

export default app;
