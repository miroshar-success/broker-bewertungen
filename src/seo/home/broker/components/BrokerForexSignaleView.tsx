import { Grid, Box, Typography } from '@mui/material';
import { removeAllIframeTags } from '../../../utils';
import AttrTypography from '../shared/AttrTypography';
import BrokerAttrs from '../shared/BrokerAttrs';
import HtmlView from '../../shared/HtmlView';
import React from 'react';

function BrokerForexSignaleView({ record }) {
  return (
    <>
      <Grid container>
        {Boolean(record.meta?.teaser) && (
          <Grid xs={12} item>
            <Box pt={2} pb={1}>
              <HtmlView
                value={removeAllIframeTags(
                  record.meta?.teaser,
                )}
              />
            </Box>
          </Grid>
        )}
        {Boolean(record.forex_signal) && (
          <>
            <Grid md={6} xs={12} item>
              <Typography variant="h5" mt={2}>
                Anbieter
              </Typography>
              <AttrTypography noIndent>
                {record.forex_signal?.prodiver}
              </AttrTypography>

              <Typography variant="h5" mt={2}>
                Kosten
              </Typography>
              <BrokerAttrs
                records={record.forex_signal?.costs}
                attrs={{ link: 'url', title: 'text' }}
                noIndent
              />

              <Typography variant="h5" mt={2}>
                Signalversand
              </Typography>
              <BrokerAttrs
                records={record.forex_signal?.notifications}
                attrs={{ link: 'url', title: 'text' }}
                noIndent
              />

              <Typography variant="h5" mt={2}>
                Testmöglichkeit
              </Typography>
              <Box display="flex">
                {record.forex_signal?.test_posibilities_tick
                  ? '✔'
                  : '✖'}
                <AttrTypography noIndent>
                  {record.forex_signal?.test_posibilities}
                </AttrTypography>
              </Box>
            </Grid>
            <Grid md={6} xs={12} item>
              <Typography variant="h5" mt={2}>
                gehandelte Märkte
              </Typography>
              <BrokerAttrs
                records={
                  record.forex_signal?.traded_markets
                }
                attrs={{ link: 'url', title: 'text' }}
                noIndent
              />

              <Typography variant="h5" mt={2}>
                Anlagehorizont
              </Typography>
              <BrokerAttrs
                records={
                  record.forex_signal?.investment_horizon
                }
                attrs={{ link: 'url', title: 'text' }}
                noIndent
              />

              <Typography variant="h5" mt={2}>
                Für Anfänger geeignet
              </Typography>
              {record.forex_signal?.beginners_level
                ? '✔'
                : '✖'}

              <Typography variant="h5" mt={2}>
                Häufigkeit der Trading Signale
              </Typography>
              <BrokerAttrs
                records={
                  record.forex_signal?.trading_signal_amount
                }
                attrs={{ link: 'url', title: 'text' }}
                noIndent
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

export default BrokerForexSignaleView;
