import { Box, Typography } from '@mui/material';
import { i18n } from '../i18n';
import { removeAllIframeTags } from '../utils';
import AuthorView from './shared/AuthorView';
import BrokerListTable from './broker/BrokerListTable';
import DefaultCategoryDescription from './DefaultCategoryDescription';
import HtmlView from './shared/HtmlView';
import TopBrokersView from './broker/components/TopBrokersView';
import React, {useState} from 'react'
import Breadcrumb from './Breadcrumb';

function CategoryPage({ category, ...props }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        '& > * + *': {
          mt: 2,
        },
      }}
    >
      <>
          <Breadcrumb
          setLoaded={setLoaded}
            items={[
              {
                name: `${category.name} Vergleich`,
                route: category.link,
              },
            ]}
            {...props}
          />
        {loaded && <Typography variant="h2">
          {category.title}
        </Typography>}
        {loaded && (category.teaser ? (
          <HtmlView
            value={removeAllIframeTags(category.teaser)}
          />
        ) : (
          <HtmlView
            value={removeAllIframeTags(
              i18n(
                'entities.category.placeholders.description',
                category.name,
              ),
            )}
          />
        ))}
        {loaded && <Typography display="block" variant="h3" my={2}>
          {i18n('entities.home.top_brokers')}
        </Typography>}
        {loaded && <TopBrokersView />}
        {loaded && <BrokerListTable rows={props.brokers} />}
        {loaded && (category.description ? (
          <HtmlView
            value={removeAllIframeTags(
              category.description,
            )}
          />
        ) : (
          <DefaultCategoryDescription />
        ))}
      </>
      {loaded && <AuthorView value={category.author} />}
    </Box>
  );
}

export default CategoryPage;
