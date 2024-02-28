import { i18n } from '../../i18n';
import { removeAllIframeTags } from '../../utils';
import AuthorView from '../shared/AuthorView';
import Box from '@mui/material/Box';
import Breadcrumb from '../Breadcrumb';
import BrokerCharacteristicsView from './components/BrokerCharacteristicsView';
import BrokerForexSignaleView from './components/BrokerForexSignaleView';
import BrokerHeader from './components/BrokerHeader';
import BrokerHomepageUrls from './components/BrokerHomepageUrls';
import BrokerMarketsView from './components/BrokerMarketsView';
import BrokerOverviewView from './components/BrokerOverviewView';
import BrokerPlatformView from './components/BrokerPlatformView';
import BrokerServiceView from './components/BrokerServiceView';
import BrokerSpreadsView from './components/BrokerSpreadsView';
import BrokerTabs from './BrokerTabs';
import HtmlView from '../shared/HtmlView';
import Layout from '../Layout';
import moment from 'moment';
import React from 'react';
import TopBrokersView from './components/TopBrokersView';
import Typography from '@mui/material/Typography';

const BrokerViewPage = ({ record, ...props }) => {
  const tabValue = 0;

  let title = '';
  let keywords: any[] = [
    'erfahrungen',
    'bewertungen',
    'test',
  ];
  let description = '';
  let author = null;

  if (record) {
    author = record.author;
    keywords.unshift(record.name);
    const stars = '✪'.repeat(
      (record.rating?.overall_rating ?? 0) | 0,
    );
    title = `${
      record.name
    } Erfahrungen ${moment().year()} » unabhängiger Test`;
    description = record.is_broker
      ? `${
          record.name
        } Erfahrungen » Fazit von Tradern: ${stars} aus ${
          record.rating?.overall_reviews ?? 0
        } Bewertungen » Unser Test zu Spreads ✚ Plattform ✚ Service ➔ Jetzt lesen!`
      : `${
          record.name
        } Erfahrungen & Test » Fazit von Tradern: ${stars} aus ${
          record.rating?.overall_reviews ?? 0
        } Bewertungen ➔ Jetzt lesen!`;
  }

  return (
    <Layout
      title={title}
      keywords={keywords}
      description={description}
      author={author}
      url={props.url}
      noArticle
    >
      {record && (
        <Box display="flex" flexDirection="column" gap={2}>
          <>
            <Breadcrumb
              items={[
                Boolean(record.categories[0]?.category) && {
                  name: record.categories[0]?.category
                    ?.name,
                  route:
                    record.categories[0]?.category?.link,
                },
                {
                  name: record.name,
                  route: props.url,
                },
              ].filter(Boolean)}
              {...props}
            />
            <BrokerHeader record={record} />
            {record.expert_advisor ? null : record.forex_signale ? (
              <BrokerForexSignaleView record={record} />
            ) : (
              <>
                <Box py={2}>
                  <BrokerTabs
                    labels={[
                      'overview',
                      {
                        raw: true,
                        label: `${record.name} Erfahrungen`,
                      },
                      'characteristics',
                      'platform',
                      'markets',
                      'spreads',
                      'service',
                    ]}
                    value={tabValue}
                  />
                </Box>
                <Box py={2}>
                  <Box>
                    <BrokerOverviewView record={record} />
                  </Box>
                  <Box display="none">
                    <BrokerCharacteristicsView
                      record={record}
                    />
                  </Box>
                  <Box display="none">
                    <BrokerPlatformView record={record} />
                  </Box>
                  <Box display="none">
                    <BrokerMarketsView record={record} />
                  </Box>
                  <Box display="none">
                    <BrokerSpreadsView record={record} />
                  </Box>
                  <Box display="none">
                    <BrokerServiceView record={record} />
                  </Box>
                </Box>
                <BrokerHomepageUrls record={record} />
              </>
            )}
          </>
          {Boolean(record.creteria) &&
            Boolean(record.creteria.body) && (
              <Box fontSize="1rem">
                <HtmlView
                  value={removeAllIframeTags(
                    record.creteria?.body,
                  )}
                />
              </Box>
            )}
          <AuthorView value={record.author} />
          <Typography variant="h3" mb={2}>
            {i18n('entities.home.top_brokers')}
          </Typography>
          <TopBrokersView rows={props.topBrokers} />
        </Box>
      )}
    </Layout>
  );
};

export default BrokerViewPage;
