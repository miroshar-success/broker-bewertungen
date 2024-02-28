import { Box, Typography } from '@mui/material';
import { getConfig } from '../../config';
import MaterialLink from '@mui/material/Link';
import React from 'react';

interface BreadcrumbProps {
  items?: Array<
    | {
        name: string;
        route: string;
      }
    | boolean
  >;
  [key: string]: any;
  setLoaded?: Function
}

function Breadcrumb({ items, ...props }: BreadcrumbProps) {
  const replaceFn = (item) =>
    item.route.replace(/\/*$/, '') ===
    '/expert-advisors-vergleich'
      ? { name: 'Expert Advisor Vergleich' }
      : {};
  const navItems: any[] = [];
  const currentRoute = props.url;
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
  props.navigationItems.forEach(selectNavigationItemFn);
  const result =
    items?.map((item: any) => ({
      ...item,
      ...replaceFn(item),
    })) || navItems.filter(({ route }) => route !== '/');
  return (
    <Box
      display="inline-flex"
      flexWrap="wrap"
      gap={1}
      mb={2}
    >
      <script
        type="application/ld+json"
        onLoad={() => props.setLoaded && props.setLoaded(true)}
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
                        getConfig().FRONTEND_URL
                      }${item.route.replace(/\/*$/, '')}`,
                    }
                  : {}),
              }),
            ),
          }),
        }}
        defer={false}
        async={false}
      />
      {Boolean(result.length) &&
        result.map((item, idx, arr) => (
          <Box
            key={item.route}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            gap={1}
          >
            {Boolean(idx) && <>&gt;</>}
            <Typography
              variant="body2"
              fontWeight="regular"
            >
              <MaterialLink
                href={item.route.replace(/\/*$/, '')}
              >
                {item.name}
              </MaterialLink>
            </Typography>
          </Box>
        ))}
    </Box>
  );
}

Breadcrumb.defaultValues = {
  items: null,
};

export default Breadcrumb;
