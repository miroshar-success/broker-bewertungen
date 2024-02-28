import { Grid } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import BrokerAttrs from 'src/view/home/broker/shared/BrokerAttrs';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import dColors from 'src/mui/assets/theme-dark/base/colors';
import HtmlView from 'src/view/shared/view/HtmlView';
import lColors from 'src/mui/assets/theme/base/colors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function BrokerForexSignaleView({ record }) {
  const { darkMode } = selectMuiSettings();
  const colors = darkMode ? dColors : lColors;
  return (
    <>
      <Grid container>
        {Boolean(record.meta?.teaser) && (
          <Grid xs={12} item>
            <MDBox
              pt={2}
              pb={1}
              borderBottom={`1px dashed ${colors.inputBorderColor}`}
            >
              <HtmlView value={record.meta?.teaser} />
            </MDBox>
          </Grid>
        )}
        {Boolean(record.forex_signal) && (
          <>
            <Grid md={6} xs={12} item>
              <MDTypography variant="h5" mt={2}>
                Anbieter
              </MDTypography>
              <AttrTypography noIndent>
                {record.forex_signal?.prodiver}
              </AttrTypography>

              <MDTypography variant="h5" mt={2}>
                Kosten
              </MDTypography>
              <BrokerAttrs
                records={record.forex_signal?.costs}
                attrs={{ link: 'url', title: 'text' }}
                noIndent
              />

              <MDTypography variant="h5" mt={2}>
                Signalversand
              </MDTypography>
              <BrokerAttrs
                records={record.forex_signal?.notifications}
                attrs={{ link: 'url', title: 'text' }}
                noIndent
              />

              <MDTypography variant="h5" mt={2}>
                Testmöglichkeit
              </MDTypography>
              <MDBox display="flex">
                <CheckboxViewItem
                  checked={
                    record.forex_signal
                      ?.test_posibilities_tick
                  }
                />
                <AttrTypography noIndent>
                  {record.forex_signal?.test_posibilities}
                </AttrTypography>
              </MDBox>
            </Grid>
            <Grid md={6} xs={12} item>
              <MDTypography variant="h5" mt={2}>
                gehandelte Märkte
              </MDTypography>
              <BrokerAttrs
                records={
                  record.forex_signal?.traded_markets
                }
                attrs={{ link: 'url', title: 'text' }}
                noIndent
              />

              <MDTypography variant="h5" mt={2}>
                Anlagehorizont
              </MDTypography>
              <BrokerAttrs
                records={
                  record.forex_signal?.investment_horizon
                }
                attrs={{ link: 'url', title: 'text' }}
                noIndent
              />

              <MDTypography variant="h5" mt={2}>
                Für Anfänger geeignet
              </MDTypography>
              <CheckboxViewItem
                checked={
                  record.forex_signal?.beginners_level
                }
              />

              <MDTypography variant="h5" mt={2}>
                Häufigkeit der Trading Signale
              </MDTypography>
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
