import PermissionChecker from 'src/modules/auth/permissionChecker';
import { Redirect, Route } from 'react-router-dom';

const isAuthenticated = false;

function FrontEndRoute({
  component: Component,
  currentTenant,
  currentUser,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          const permissionChecker = new PermissionChecker(
            currentTenant,
            currentUser,
          );

          if (!permissionChecker.isAuthenticated) {
            return <Redirect to="/admin/auth/signin" />;
          }
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default FrontEndRoute;
