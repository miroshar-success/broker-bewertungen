import { Box, Typography } from '@mui/material';
import { i18n } from '../../i18n';
import Breadcrumb from '../Breadcrumb';
import CompareOverview from './comparisons/CompareOverview';
import CompareProfile from './comparisons/CompareProfile';
import CompareRegulation from './comparisons/CompareRegulation';
import CompareService from './comparisons/CompareService';
import CompareSpreadsAndFees from './comparisons/CompareSpreadsAndFees';
import CompareTradable from './comparisons/CompareTradable';
import CompareTradingPlatforms from './comparisons/CompareTradingPlatforms';
import Layout from '../Layout';
import React from 'react';

function BrokerComparePage(props) {
  const { recordA, recordB } = props;
  return (
    <Layout
      title={i18n(
        'entities.broker.comparison.vsTitle',
        recordA?.name || '-',
        recordB?.name || '-',
      )}
      keywords={[
        'forex',
        'cfd',
        'broker',
        'vergleich',
        recordA?.name_normalized,
        recordB?.name_normalized,
      ]}
      description={i18n(
        'entities.broker.comparison.metaVsDescription',
        recordA?.name || '-',
        recordB?.name || '-',
      )}
      url={props.url}
    >
      <Box display="none">
        <Breadcrumb
          items={[
            {
              name: i18n(
                'entities.broker.comparison.title',
              ),
              route: '/forex-cfd-broker-vergleich',
            },
          ]}
          {...props}
        />
      </Box>
      <Typography variant="h1">
        {i18n('entities.broker.comparison.title')}
      </Typography>
      <Typography
        color="text"
        fontWeight="regular"
        variant="body2"
      >
        {i18n('entities.broker.comparison.description')}
      </Typography>
      <Box>
        <CompareOverview
          recordA={recordA}
          recordB={recordB}
        />
        <CompareRegulation
          recordA={recordA}
          recordB={recordB}
        />
        <CompareProfile
          recordA={recordA}
          recordB={recordB}
        />
        <CompareTradable
          recordA={recordA}
          recordB={recordB}
        />
        <CompareSpreadsAndFees
          recordA={recordA}
          recordB={recordB}
        />
        <CompareTradingPlatforms
          recordA={recordA}
          recordB={recordB}
        />
        <CompareService
          recordA={recordA}
          recordB={recordB}
        />
      </Box>
    </Layout>
  );
}

export default BrokerComparePage;
