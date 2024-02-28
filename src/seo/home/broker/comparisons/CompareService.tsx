import { i18n } from '../../../i18n';
import BrokerImages from '../shared/BrokerImages';
import CompareCheckbox from './CompareCheckbox';
import CompareDetail from './CompareDetail';
import CompareRegion from './CompareRegion';
import CompareSection from './CompareSection';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';

function CompareService({ recordA, recordB }) {
  return (
    <>
      <CompareRegion>
        {i18n(
          'entities.broker.comparison.region.service',
          recordA.name,
          recordB.name,
        )}
      </CompareRegion>
      <CompareCheckbox
        recordA={recordA}
        recordB={recordB}
        fields={[
          'GERMAN_SUPPORT',
          'CONTACT',
          'DAILY_TRADE_HELP',
          'GERMAN_WEBINAR',
          'GERMAN_SEMINAR',
          'COACHINGS_AVAILABLE',
          'KNOWLEDGE_BASE',
        ]}
      />
      <Grid spacing={2} container>
        <CompareSection name="awards" />
        <CompareDetail
          childrenA={
            <BrokerImages records={recordA.certificates} />
          }
          childrenB={
            <BrokerImages records={recordB.certificates} />
          }
        />
      </Grid>
    </>
  );
}

CompareService.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareService;
