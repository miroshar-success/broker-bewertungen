import { i18n } from '../../../i18n';
import AttrTypography from './AttrTypography';
import PropTypes from 'prop-types';
import React from 'react';

function BrokerContact({ record }) {
  return (
    <>
      {['phone', 'fax', 'email'].map((v) => {
        const contact = record[v] && record[v][v];
        if (!contact || contact.trim() === '') {
          return null;
        }
        return (
          <AttrTypography key={v}>
            {i18n(
              `entities.broker.comparison.contacts.${v}`,
            )}
            : {contact}
          </AttrTypography>
        );
      })}
    </>
  );
}

BrokerContact.propTypes = {
  record: PropTypes.any.isRequired,
};

export default BrokerContact;
