import passport from 'passport';
import AuthService from '../../services/auth/authService';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import ApiResponseHandler from '../apiResponseHandler';
import { databaseInit } from '../../database/databaseConnection';
import { get } from 'lodash';

export default (app, routes) => {
  app.use(passport.initialize());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  routes.post(
    '/auth/social/onboard',
    async function (req, res) {
      try {
        const payload = await AuthService.handleOnboard(
          req.currentUser,
          req.body.invitationToken,
          req.body.tenantId,
          req,
        );

        await ApiResponseHandler.success(req, res, payload);
      } catch (error) {
        await ApiResponseHandler.error(req, res, error);
      }
    },
  );

  if (process.env.AUTH_SOCIAL_GOOGLE_CLIENT_ID) {
    passport.use(
      new GoogleStrategy(
        {
          clientID:
            process.env.AUTH_SOCIAL_GOOGLE_CLIENT_ID,
          clientSecret:
            process.env.AUTH_SOCIAL_GOOGLE_CLIENT_SECRET,
          callbackURL:
            process.env.AUTH_SOCIAL_GOOGLE_CALLBACK_URL,
        },
        function (
          accessToken,
          refreshToken,
          profile,
          done,
        ) {
          databaseInit()
            .then((database) => {
              const email = get(profile, 'emails[0].value');
              const emailVerified = get(
                profile,
                'emails[0].verified',
                false,
              );
              const displayName = get(
                profile,
                'displayName',
              );
              const { firstName, lastName } =
                splitFullName(displayName);

              return AuthService.signinFromSocial(
                'google',
                profile.id,
                email,
                emailVerified,
                firstName,
                lastName,
                { database },
              );
            })
            .then((jwtToken) => {
              done(null, jwtToken);
            })
            .catch((error) => {
              console.error(error);
              done(error, null);
            });
        },
      ),
    );

    routes.get(
      '/auth/social/google',
      passport.authenticate('google', {
        scope: ['email', 'profile'],
        session: false,
      }),
      function (req, res) {
        // The request will be redirected for authentication, so this
        // function will not be called.
      },
    );

    routes.get(
      '/auth/social/google/callback',
      function (req, res, next) {
        passport.authenticate('google', (err, jwtToken) => {
          handleCallback(res, err, jwtToken);
        })(req, res, next);
      },
    );
  }

  if (process.env.AUTH_SOCIAL_FACEBOOK_CLIENT_ID) {
    passport.use(
      new FacebookStrategy(
        {
          clientID:
            process.env.AUTH_SOCIAL_FACEBOOK_CLIENT_ID,
          clientSecret:
            process.env.AUTH_SOCIAL_FACEBOOK_CLIENT_SECRET,
          callbackURL:
            process.env.AUTH_SOCIAL_FACEBOOK_CALLBACK_URL,
          profileFields: ['id', 'email', 'displayName'],
        },
        function (
          accessToken,
          refreshToken,
          profile,
          done,
        ) {
          databaseInit()
            .then((database) => {
              const email = get(profile, 'emails[0].value');
              const emailVerified = true;

              const displayName = get(
                profile,
                'displayName',
              );
              const { firstName, lastName } =
                splitFullName(displayName);

              return AuthService.signinFromSocial(
                'facebook',
                profile.id,
                email,
                emailVerified,
                firstName,
                lastName,
                { database },
              );
            })
            .then((jwtToken) => {
              done(null, jwtToken);
            })
            .catch((error) => {
              console.error(error);
              done(error, null);
            });
        },
      ),
    );

    routes.get(
      '/auth/social/facebook',
      passport.authenticate('facebook', {
        session: false,
      }),
      function (req, res) {
        // The request will be redirected for authentication, so this
        // function will not be called.
      },
    );

    routes.get(
      '/auth/social/facebook/callback',
      function (req, res, next) {
        passport.authenticate(
          'facebook',
          (err, jwtToken) => {
            handleCallback(res, err, jwtToken);
          },
        )(req, res, next);
      },
    );
  }
};

function handleCallback(res, err, jwtToken) {
  if (err) {
    console.error(err);
    let errorCode = 'generic';

    if (
      ['auth-invalid-provider', 'auth-no-email'].includes(
        err.message,
      )
    ) {
      errorCode = err.message;
    }

    res.redirect(
      `${process.env.FRONTEND_URL}/auth/signin?socialErrorCode=${errorCode}`,
    );
    return;
  }

  res.redirect(
    `${process.env.FRONTEND_URL}/?social=true&authToken=${jwtToken}`,
  );
}

function splitFullName(fullName) {
  let firstName;
  let lastName;

  if (fullName && fullName.split(' ').length > 1) {
    const [firstNameArray, ...lastNameArray] =
      fullName.split(' ');
    firstName = firstNameArray;
    lastName = lastNameArray.join(' ');
  } else {
    firstName = fullName || null;
    lastName = null;
  }

  return { firstName, lastName };
}
