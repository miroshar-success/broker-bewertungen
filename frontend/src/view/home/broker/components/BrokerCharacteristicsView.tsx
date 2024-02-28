import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import BrokerAttrs from 'src/view/home/broker/shared/BrokerAttrs';
import BrokerCheckbox from 'src/view/home/broker/shared/BrokerCheckbox';
import BrokerSection from 'src/view/home/broker/components/BrokerSection';
import HtmlView from 'src/view/shared/view/HtmlView';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import SingleCheckbox from 'src/view/home/broker/components/SingleCheckbox';

function BrokerCharacteristicsView({ record }) {
  return (
    <>
      <Grid container>
        <Grid xs={12} item>
          <MDTypography variant="h3" pb={2}>
            {`${record.name} ${i18n(
              'entities.broker.text.portrait',
            )}`}
          </MDTypography>
          <HtmlView value={record.meta?.description} />
        </Grid>
        {record.video?.youtube_hash &&
          record.video?.youtube_hash.trim() !== '' && (
            <Grid xs={12} item>
              <MDTypography variant="h5" mt={2}>
                {i18n('entities.broker.text.introduction')}
              </MDTypography>
              <MDBox position="relative" pb="56.25%">
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
              </MDBox>
            </Grid>
          )}
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
