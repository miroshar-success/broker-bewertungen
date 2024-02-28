import { Box, Typography } from '@mui/material';
import { i18n } from '../i18n';
import { removeAllIframeTags } from '../utils';
import AuthorView from './shared/AuthorView';
import HtmlView from './shared/HtmlView';
import MaterialLink from '@mui/material/Link';
import TopBrokersView from './broker/components/TopBrokersView';
import React, {Suspense, useState} from 'react'
import Breadcrumb from './Breadcrumb';

function NormalPage({ page, ...props }) {
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
        <Breadcrumb {...props} setLoaded={setLoaded} />
        {loaded && <HtmlView value={removeAllIframeTags(page.body)} />}
        {loaded && Boolean(page.related_links.length) && (
          <Box>
            <Typography variant="h3">
              {page.navigation.type === 'FOREX_STRATEGY'
                ? 'Weitere Forex Strategien'
                : page.navigation.type === 'DOWNLOADS'
                ? 'Weitere MetaTrader Indikatoren'
                : 'Weiterführende Links'}
            </Typography>
            {page.related_links.map(
              ({ name, url }, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  fontWeight="regular"
                >
                  <MaterialLink href={url}>
                    {name}
                  </MaterialLink>
                </Typography>
              ),
            )}
          </Box>
        )}
        {loaded && Boolean(page.page_warning) && (
          <>
            <Typography variant="h3">Warnung</Typography>
            <HtmlView
              value={removeAllIframeTags(
                page.page_warning.body,
              )}
            />
          </>
        )}
        {loaded && Boolean(page.pdf) && (
          <Typography
            variant="body2"
            fontWeight="regular"
            mt={2}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <img src="/images/files/pdf.png" />
            <MaterialLink
              href={`${
                page.navigation?.link || page.link
              }.pdf`}
              underline="hover"
              style={{ cursor: 'pointer' }}
            >
              {`${page.name} als PDF speichern`}
            </MaterialLink>
          </Typography>
        )}
      </>
      {loaded && <AuthorView value={page.author} />}
      {loaded && <Typography display="block" variant="h3" mb={2}>
        {i18n('entities.home.top_brokers')}
      </Typography>}
      {loaded && <TopBrokersView rows={props.topBrokers} />}
    </Box>
  );
}

export default NormalPage;
