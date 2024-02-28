import { i18n } from '../../../i18n';
import BrokerCheckbox from '../shared/BrokerCheckbox';
import CompareDetail from './CompareDetail';
import CompareSection from './CompareSection';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';

function CompareCheckbox({ recordA, recordB, fields }) {
  return (
    <>
      {(fields || []).map((field) => {
        const tooltipKey = `entities.broker.comparison.checkbox.tooltip.${field.toUpperCase()}`;
        const tooltip = i18n(tooltipKey);

        return (
          <Grid key={field} spacing={2} container>
            <CompareSection
              tooltip={
                tooltip === tooltipKey ? null : (
                  <>{tooltip}</>
                )
              }
            >
              {i18n(
                `entities.broker.comparison.checkbox.name.${field.toUpperCase()}`,
              )}
            </CompareSection>
            <CompareDetail
              childrenA={
                <BrokerCheckbox
                  record={recordA}
                  field={field}
                />
              }
              childrenB={
                <BrokerCheckbox
                  record={recordB}
                  field={field}
                />
              }
            />
          </Grid>
        );
      })}
    </>
  );
}

CompareCheckbox.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CompareCheckbox;
