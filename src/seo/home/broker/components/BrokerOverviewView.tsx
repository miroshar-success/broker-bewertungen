import { Grid } from '@mui/material';
import { i18n } from '../../../i18n';
import { removeAllIframeTags } from '../../../utils';
import AttrTypography from '../shared/AttrTypography';
import Box from '@mui/material/Box';
import BrokerAttrs from '../shared/BrokerAttrs';
import BrokerImages from '../shared/BrokerImages';
import BrokerUpsides from '../shared/BrokerUpsides';
import HtmlView from '../../shared/HtmlView';
import React from 'react';
import Typography from '@mui/material/Typography';

function BrokerOverviewView({ record }) {
  return (
    <>
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <HtmlView
            value={removeAllIframeTags(record.meta?.teaser)}
          />
        </Grid>
        <Grid md={6} xs={12} item>
          <Typography variant="h5" mt={2}>
            {i18n('entities.broker.text.upsides')}
          </Typography>
          <BrokerUpsides record={record} />

          <Typography variant="h5" mt={2}>
            {i18n('entities.broker.fields.minimum_deposit')}
          </Typography>
          <AttrTypography noIndent>
            {record.meta?.minimum_deposit}
          </AttrTypography>

          <Typography variant="h5" mt={2}>
            {i18n(
              'entities.broker.fields.scalping_allowed',
            )}
          </Typography>
          <Box position="relative" my={1}>
            {record.meta?.scalping_allowed ? '✔' : '✖'}
          </Box>

          <Typography variant="h5" mt={2}>
            {i18n('entities.broker.fields.regulation')}
          </Typography>
          <BrokerAttrs
            records={record.regulatory_authorities}
            noIndent
          />

          <Typography variant="h5" mt={2}>
            {i18n(
              'entities.broker.fields.deposit_guarantees',
            )}
          </Typography>
          <BrokerAttrs
            records={record.deposit_guarantees}
            renderFn={(v) => `${v.name} ${v.text}`}
            noIndent
          />
        </Grid>
        <Grid md={6} xs={12} item>
          <Typography variant="h5" mt={2}>
            {i18n('entities.broker.fields.broker_type')}
          </Typography>
          <AttrTypography noIndent>
            {i18n(
              `entities.broker.enumerators.meta.broker_type.${record.meta?.broker_type}`,
            )}
          </AttrTypography>

          <Typography variant="h5" mt={2}>
            {i18n('entities.broker.fields.certificates')}
          </Typography>
          <BrokerImages
            records={record.certificates}
            noIndent
          />

          <Typography variant="h5" mt={2}>
            {i18n('entities.broker.fields.spreads')}
          </Typography>
          <BrokerAttrs
            records={record.spreads}
            attrs={{
              link: 'url',
              title: 'spread',
            }}
            filterFn={(v) => v.primary}
            noIndent
          />

          <Typography variant="h5" mt={2}>
            {i18n('entities.broker.fields.specialties')}
          </Typography>
          <BrokerAttrs
            records={record.features}
            attrs={{ link: 'url', title: 'feature' }}
            noIndent
          />
        </Grid>
      </Grid>
    </>
  );
}

export default BrokerOverviewView;
