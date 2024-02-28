import { Grid } from '@mui/material';
import { i18n } from '../../../i18n';
import { removeAllIframeTags } from '../../../utils';
import AttrTypography from '../shared/AttrTypography';
import Box from '@mui/material/Box';
import BrokerAttrs from '../shared/BrokerAttrs';
import BrokerCheckbox from '../shared/BrokerCheckbox';
import BrokerSection from './BrokerSection';
import HtmlView from '../../shared/HtmlView';
import React from 'react';
import SingleCheckbox from './SingleCheckbox';
import Typography from '@mui/material/Typography';

function BrokerCharacteristicsView({ record }) {
  return (
    <>
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <Typography variant="h3" pb={2}>
            {`${record.name} ${i18n(
              'entities.broker.text.portrait',
            )}`}
          </Typography>
          <HtmlView
            value={removeAllIframeTags(
              record.meta?.description,
            )}
          />
        </Grid>
        {/* {record.video?.youtube_hash &&
          record.video?.youtube_hash.trim() !== '' && (
            <Grid xs={12} item>
              <Typography variant="h5" mt={2}>
                {i18n('entities.broker.text.introduction')}
              </Typography>
              <Box position="relative" pb="56.25%">
                <iframe
                  src={`https://www.youtube.com/embed/${record.video?.youtube_hash}`}
                  frameBorder={0}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  style={{
                    left: 0,
                    top: 0,
                    position: 'absolute',
                  }}
                />
              </Box>
            </Grid>
          )} */}
        <BrokerSection
          tooltip={
            <>
              {i18n(
                `entities.broker.characteristics.tooltip.licensed_broker`,
              )}
            </>
          }
        >
          {i18n(
            `entities.broker.characteristics.fields.licensed_broker`,
          )}
        </BrokerSection>
        <Grid md={8} xs={12} item>
          <AttrTypography>
            {Boolean(record.meta?.licensed_broker)
              ? i18n('common.yes')
              : i18n('common.no')}
          </AttrTypography>
        </Grid>
        <Grid xs={12} item>
          <SingleCheckbox
            record={record}
            fields={[
              'OFFICE_IN_GERMANY',
              'REGULATION_AND_DEPOSIT_SECURITY',
              'SEGREGATED_ACCOUNTS',
            ]}
          />
        </Grid>
        <BrokerSection>
          {i18n(
            `entities.broker.characteristics.fields.minimum_deposit`,
          )}
        </BrokerSection>
        <Grid md={8} xs={12} item>
          <AttrTypography
            children={record.meta?.minimum_deposit}
          />
        </Grid>
        <BrokerSection
          tooltip={
            <>
              {i18n(
                `entities.broker.characteristics.tooltip.bonus`,
              )}
            </>
          }
        >
          {i18n(
            `entities.broker.characteristics.fields.bonus`,
          )}
        </BrokerSection>
        <Grid md={8} xs={12} item>
          <BrokerCheckbox record={record} field={'bonus'} />
        </Grid>
        <BrokerSection
          tooltip={
            <>
              {i18n(
                `entities.broker.characteristics.tooltip.accounting_bank`,
              )}
            </>
          }
        >
          {i18n(
            `entities.broker.characteristics.fields.accounting_bank`,
          )}
        </BrokerSection>
        <Grid md={8} xs={12} item>
          <BrokerAttrs records={record.banks} />
        </Grid>
        <Grid xs={12} item>
          <SingleCheckbox
            record={record}
            fields={[
              'ACCOUNT_CURRENCIES',
              'POSIBILITIES_FOR_WITHDRAWALS',
              'RESERVE_LIABILIRY',
              'INTEREST_ON_DEPOSIT',
            ]}
          />
        </Grid>
        <BrokerSection>
          {i18n(
            `entities.broker.characteristics.fields.withholding_tax`,
          )}
        </BrokerSection>
        <Grid md={8} xs={12} item>
          <AttrTypography>
            {i18n(
              `entities.broker.enumerators.meta.withholding_tax.${record.meta?.withholding_tax}`,
            )}
          </AttrTypography>
        </Grid>
      </Grid>
    </>
  );
}

export default BrokerCharacteristicsView;
