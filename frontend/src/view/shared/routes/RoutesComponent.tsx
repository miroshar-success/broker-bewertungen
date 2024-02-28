import authSelectors from 'src/modules/auth/authSelectors';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import EmailUnverifiedRoute from 'src/view/shared/routes/EmailUnverifiedRoute';
import PrivateRoute from 'src/view/shared/routes/PrivateRoute';
import PublicRoute from 'src/view/shared/routes/PublicRoute';
import CustomLoadable from 'src/view/shared/CustomLoadable';
import ProgressBar from 'src/view/shared/ProgressBar';
import routes from 'src/view/routes';
import EmptyTenantRoute from 'src/view/shared/routes/EmptyTenantRoute';
import EmptyPermissionsRoute from 'src/view/shared/routes/EmptyPermissionsRoute';

// for MUI 2 Dashboard
import muiSelectors from 'src/modules/mui/muiSelectors';
import FrontEndRoute from 'src/view/shared/routes/FrontEndRoute';

const ScrollToTop = ({ history, location }) => {
  useEffect(() => {
    if (history.action === 'POP') {
      return;
    }

    let { hash, pathname } = location;
    if (hash) {
      let element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
    } else {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  });

  return null;
};

function RoutesComponent(props) {
  const isInitialMount = useRef(true);

  const authLoading = useSelector(
    authSelectors.selectLoadingInit,
  );
  const muiSettingsLoading = useSelector(
    muiSelectors.selectLoading,
  );
  const loading = authLoading || muiSettingsLoading;
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      ProgressBar.start();
      return;
    }

    if (!loading) {
      ProgressBar.done();
    }
  }, [loading]);

  if (loading) {
    return <div />;
  }

  return (
    <>
      <Route component={ScrollToTop} />
      <Switch>
        {routes.publicRoutes.map((route) => (
          <PublicRoute
            key={route.path}
            exact={route.exact}
            path={route.path}
            currentUser={currentUser}
            currentTenant={currentTenant}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}

        {routes.emailUnverifiedRoutes.map((route) => (
          <EmailUnverifiedRoute
            key={route.path}
            exact
            path={route.path}
            currentUser={currentUser}
            currentTenant={currentTenant}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}

        {routes.emptyTenantRoutes.map((route) => (
          <EmptyTenantRoute
            key={route.path}
            exact
            path={route.path}
            currentUser={currentUser}
            currentTenant={currentTenant}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}

        {routes.emptyPermissionsRoutes.map((route) => (
          <EmptyPermissionsRoute
            key={route.path}
            exact
            path={route.path}
            currentUser={currentUser}
            currentTenant={currentTenant}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}

        {routes.privateRoutes
          .filter((route) => !route.virtual)
          .map((route) => (
            <PrivateRoute
              key={route.path}
              currentUser={currentUser}
              currentTenant={currentTenant}
              permissionRequired={route.permissionRequired}
              path={route.path}
              component={CustomLoadable({
                loader: route.loader,
              })}
              redirect={route.redirect}
              virtual={route.virtual}
              exact={Boolean(route.exact)}
            />
          ))}

        {routes.simpleRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={CustomLoadable({
              loader: route.loader,
            })}
            exact
          />
        ))}

        {routes.frontEndRoutes.map((route) => (
          <FrontEndRoute
            key={route.path}
            exact={true}
            path={route.path}
            currentUser={currentUser}
            currentTenant={currentTenant}
            component={CustomLoadable({
              loader: route.loader,
            })}
          />
        ))}
      </Switch>
    </>
  );
}

export default RoutesComponent;
