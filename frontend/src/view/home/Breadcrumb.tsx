import { Link, useRouteMatch } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import config from 'src/config';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import navigationHomeSelectors from 'src/modules/navigation/home/navigationHomeSelectors';
import PropTypes from 'prop-types';

function Breadcrumb({ items, setLoaded }) {
  const { sidenavColor } = selectMuiSettings();
  const match = useRouteMatch();
  const loading = useSelector(
    navigationHomeSelectors.selectLoading,
  );
  const navigationItems = useSelector(
    navigationHomeSelectors.selectNavigation,
  );
  if (loading) {
    return null;
  }
  const replaceFn = (item) =>
    item.route.replace(/\/*$/, '') ===
    '/expert-advisors-vergleich'
      ? { name: 'Expert Advisor Vergleich' }
      : {};
  const navItems = [];
  const currentRoute = match.url;
  const selectNavigationItemFn = (item) => {
    if (
      currentRoute.indexOf(
        item.route.replace(/\/*$/, ''),
      ) === 0
    ) {
      navItems.push({
        ...item,
        ...replaceFn(item),
      });
      (item.children || [])
        .filter(({ type }) => !type)
        .forEach(selectNavigationItemFn);
    }
  };
  navigationItems.forEach(selectNavigationItemFn);
  const result =
    items?.map((item) => ({
      ...item,
      ...replaceFn(item),
    })) || navItems.filter(({ route }) => route !== '/');
  return (
    <MDBox
      display="inline-flex"
      flexWrap="wrap"
      gap={1}
      mb={2}
    >
      <script
        type="application/ld+json"
        onLoad={() => setLoaded(true)}
        async={false}
        defer={false}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: (result || []).map(
              (item, idx, arr) => ({
                '@type': 'ListItem',
                position: idx + 1,
                name: item.name,
                ...(idx + 1 < arr.length
                  ? {
                      item: `${
                        config.frontendUrl.protocol
                      }://${
                        config.frontendUrl.host
                      }${item.route.replace(/\/*$/, '')}`,
                    }
                  : {}),
              }),
            ),
          }),
        }}
      />
      {Boolean(result.length) &&
        result.map((item, idx, arr) => (
          <MDBox
            key={item.route}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            gap={1}
          >
            {Boolean(idx) && (
              <ArrowRightIcon color="secondary" />
            )}
            <MDTypography
              variant="body2"
              color={
                idx + 1 !== arr.length
                  ? sidenavColor
                  : 'text'
              }
              fontWeight="regular"
            >
              <MaterialLink
                component={Link}
                to={item.route.replace(/\/*$/, '')}
                underline="hover"
                sx={{
                  color: 'inherit !important',
                }}
              >
                {item.name}
              </MaterialLink>
            </MDTypography>
          </MDBox>
        ))}
    </MDBox>
  );
}

Breadcrumb.defaultValues = {
  items: null,
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      route: PropTypes.string,
    }),
  ),
  setLoaded: PropTypes.any
};

export default Breadcrumb;
