import RateLimit from 'express-rate-limit';
// import MongoStore from 'rate-limit-mongo';
// import { getConfig } from '../config';

const skipREs: Array<RegExp> = [
  /\/import$/,
  /^\/api\/author/,
  /^\/api\/blog/,
  /^\/api\/broker/,
  /^\/api\/category/,
  /^\/api\/comment/,
  /^\/api\/file\/download/,
  /^\/api\/general-page/,
  /^\/api\/navigation/,
  /^\/api\/promotion/,
];

export function createRateLimiter({
  max,
  windowMs,
  message,
}: {
  max: number;
  windowMs: number;
  message: string;
}) {
  return RateLimit({
    // store: new MongoStore({
    //   uri: getConfig().DATABASE_CONNECTION,
    // }),
    max,
    windowMs,
    message,
    skip: (req) => {
      if (req.method === 'OPTIONS') {
        return true;
      }

      for (const skipRE of skipREs) {
        if (skipRE.test(req.originalUrl)) {
          console.log('skipped', req.originalUrl);
          return true;
        }
      }

      return false;
    },
  });
}
