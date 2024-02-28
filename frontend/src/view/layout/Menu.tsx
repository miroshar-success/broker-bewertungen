import authSelectors from 'src/modules/auth/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import {
  menus,
  profileRoutes,
  tenantRoutes,
  planRoutes,
} from 'src/view/menus';

import { useEffect, useState } from 'react';

// react-router-dom components
import { useLocation, NavLink } from 'react-router-dom';

// @mui material components
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS examples components
import SidenavCollapse from 'src/mui/shared/Sidenav/SidenavCollapse';
import SidenavList from 'src/mui/shared/Sidenav/SidenavList';
import SidenavItem from 'src/mui/shared/Sidenav/SidenavItem';

// Custom styles for the Sidenav
import SidenavRoot from 'src/mui/shared/Sidenav/SidenavRoot';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { findRoute, matchedRoutes } from 'src/view/routes';
import { Avatar } from '@mui/material';
import config from 'src/config';

import { i18n } from 'src/i18n';

// Declaring props types for Sidenav
interface Props {
  brand?: string;
  brandName: string;
  [key: string]: any;
}

function Menu({
  brand,
  brandName,
  ...rest
}: Props): JSX.Element {
  const dispatch = useDispatch();

  const {
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    sidenavColor,
    darkMode,
  } = selectMuiSettings();

  const color = sidenavColor;

  const [openCollapse, setOpenCollapse] = useState<
    boolean | string
  >(false);
  const [openNestedCollapse, setOpenNestedCollapse] =
    useState<boolean | string>(false);
  const location = useLocation();
  const { pathname } = location;
  const currentRoutes = matchedRoutes(pathname);
  const currentRoute = findRoute(pathname, currentRoutes);
  const collapseName =
    (currentRoute && currentRoute.collapseName) || false;
  const items = pathname.split('/').slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];

  let textColor:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark'
    | 'white'
    | 'inherit'
    | 'text'
    | 'light' = 'white';

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark';
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit';
  }

  const closeSidenav = () => {
    window.innerWidth >= 1200 &&
      dispatch(
        muiActions.doSave({
          miniSidenav: true,
        }),
      );
    dispatch(muiActions.doMiniSidenav(true));
  };

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );
  const menuVisible = useSelector(
    layoutSelectors.selectMenuVisible,
  );

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  const match = (permission) => {
    return permissionChecker.match(permission);
  };

  const lockedForCurrentPlan = (permission) => {
    return permissionChecker.lockedForCurrentPlan(
      permission,
    );
  };

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, [collapseName, itemParentName]);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      dispatch(
        muiActions.doMiniSidenav(
          window.innerWidth < 1200 || miniSidenav,
        ),
      );
      dispatch(
        muiActions.doTransparentSidenav(
          window.innerWidth < 1200
            ? false
            : transparentSidenav,
        ),
      );
      dispatch(
        muiActions.doWhiteSidenav(
          window.innerWidth < 1200 ? false : whiteSidenav,
        ),
      );
    }

    /**
     * The event listener that's calling the handleMiniSidenav function when resizing the window.
     */
    window.addEventListener('resize', handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () =>
      window.removeEventListener(
        'resize',
        handleMiniSidenav,
      );
  }, [
    dispatch,
    pathname,
    transparentSidenav,
    whiteSidenav,
  ]);

  const renderAvailable = (permissionRequired) => {
    return {
      visible: match(permissionRequired),
      disabled: lockedForCurrentPlan(permissionRequired),
    };
  };

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse: any) =>
    collapse.map(
      ({
        name,
        path,
        key,
        href,
        permissionRequired,
      }: any) => {
        const { visible, disabled } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }
        key = key || path;
        return href ? (
          <Link
            key={key}
            href={disabled ? '#' : href}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <SidenavItem
              name={name}
              disabled={disabled}
              nested
            />
          </Link>
        ) : (
          <NavLink
            to={disabled ? '#' : path}
            disabled={disabled}
            key={key}
            style={{ textDecoration: 'none' }}
          >
            <SidenavItem
              name={name}
              active={active}
              disabled={disabled}
              nested
            />
          </NavLink>
        );
      },
    );

  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses: any) =>
    collapses.map(
      ({
        name,
        collapse,
        path,
        href,
        key,
        icon,
        permissionRequired,
      }: any) => {
        const { visible, disabled } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }

        key = key || path;

        let returnValue;

        if (collapse) {
          returnValue = (
            <SidenavItem
              disabled={disabled}
              key={key}
              color={color}
              name={name}
              active={
                key === itemParentName ? 'isParent' : false
              }
              open={openNestedCollapse === key}
              onClick={({ currentTarget }: any) =>
                openNestedCollapse === key &&
                currentTarget.classList.contains(
                  'MuiListItem-root',
                )
                  ? setOpenNestedCollapse(false)
                  : setOpenNestedCollapse(key)
              }
            >
              {renderNestedCollapse(collapse)}
            </SidenavItem>
          );
        } else {
          returnValue = href ? (
            <Link
              href={disabled ? '#' : href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={active}
                icon={icon}
                disabled={disabled}
              />
            </Link>
          ) : (
            <NavLink
              to={disabled ? '#' : path}
              key={key}
              style={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={color}
                name={name}
                active={active}
                icon={icon}
                disabled={disabled}
              />
            </NavLink>
          );
        }
        return (
          <SidenavList key={key}>{returnValue}</SidenavList>
        );
      },
    );

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = (routes) =>
    routes.map(
      ({
        type,
        name,
        icon,
        title,
        collapse,
        noCollapse,
        key,
        href,
        path,
        permissionRequired,
      }: any) => {
        const { visible, disabled } = renderAvailable(
          permissionRequired,
        );
        const active = !!findRoute(path, currentRoutes);
        if (!visible) {
          return null;
        }

        key = key || path;

        let returnValue;

        noCollapse = noCollapse || !collapse;

        if (type === 'collapse' || !type) {
          if (href) {
            returnValue = (
              <Link
                href={disabled ? '#' : href}
                key={key}
                target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  color={color}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                  disabled={disabled}
                />
              </Link>
            );
          } else if (noCollapse && path) {
            returnValue = (
              <NavLink
                to={disabled ? '#' : path}
                key={key}
                disabled={disabled}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  color={color}
                  noCollapse={noCollapse}
                  active={active}
                  disabled={disabled}
                >
                  {collapse
                    ? renderCollapse(collapse)
                    : null}
                </SidenavCollapse>
              </NavLink>
            );
          } else {
            returnValue = (
              <SidenavCollapse
                key={key}
                name={name}
                icon={icon}
                color={color}
                active={key === collapseName}
                open={openCollapse === key}
                disabled={disabled}
                onClick={() =>
                  openCollapse === key
                    ? setOpenCollapse(false)
                    : setOpenCollapse(key)
                }
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            );
          }
        } else if (type === 'title') {
          returnValue = (
            <MDTypography
              key={key}
              color={textColor}
              display="block"
              variant="caption"
              fontWeight="bold"
              textTransform="uppercase"
              pl={3}
              mt={2}
              mb={1}
              ml={1}
            >
              {title}
            </MDTypography>
          );
        } else if (type === 'divider') {
          returnValue = (
            <Divider
              key={key}
              light={
                (!darkMode &&
                  !whiteSidenav &&
                  !transparentSidenav) ||
                (darkMode &&
                  !transparentSidenav &&
                  whiteSidenav)
              }
            />
          );
        }

        return returnValue;
      },
    );

  return (
    <>
      <SidenavRoot
        {...rest}
        variant="permanent"
        ownerState={{
          transparentSidenav,
          whiteSidenav,
          miniSidenav,
          darkMode,
        }}
      >
        <MDBox py={3}>
          <MDBox pb={1} px={4} textAlign="center">
            <MDBox
              display={{ xs: 'block', xl: 'none' }}
              position="absolute"
              top={0}
              right={0}
              p={1.625}
              onClick={closeSidenav}
              sx={{ cursor: 'pointer' }}
            >
              <MDTypography variant="h6" color="secondary">
                <Icon sx={{ fontWeight: 'bold' }}>
                  close
                </Icon>
              </MDTypography>
            </MDBox>
            <MDBox
              component={Link}
              href="/"
              display="flex"
              alignItems="center"
            >
              <MDTypography
                display="block"
                fontSize="1.1rem"
                fontWeight="regular"
                color={
                  (transparentSidenav && !darkMode) ||
                  whiteSidenav
                    ? 'black'
                    : 'white'
                }
                overflow="hidden"
                textOverflow="ellipsis"
                maxWidth="100%"
                textAlign="center"
              >
                {i18n('app.title')}
              </MDTypography>
            </MDBox>
          </MDBox>
          <Divider
            light={
              (!darkMode &&
                !whiteSidenav &&
                !transparentSidenav) ||
              (darkMode &&
                !transparentSidenav &&
                whiteSidenav)
            }
          />
          <List>
            {renderRoutes([
              {
                name: userText,
                key: 'my-profile',
                icon: (
                  <Avatar
                    src={userAvatar}
                    alt={userText}
                    sx={{ width: '32px', height: '32px' }}
                  />
                ),
                collapse: [...profileRoutes]
                  .concat(
                    [
                      'multi',
                      'multi-with-subdomain',
                    ].includes(config.tenantMode)
                      ? tenantRoutes
                      : [],
                  )
                  .concat([...planRoutes]),
              },
              { type: 'divider', key: 'divider-0' },
              ...menus,
            ])}
          </List>
        </MDBox>
      </SidenavRoot>
    </>
  );
}

export default Menu;
