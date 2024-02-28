import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useEffect, useMemo, useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import BrokerBaseForm from 'src/view/broker/form/components/BrokerBaseForm';
import schema from 'src/view/broker/form/schemas/FormSchema';
import MDBox from 'src/mui/components/MDBox';
import TabPanel from 'src/view/shared/tab/TabPanel';
import BrokerTabs from 'src/view/broker/BrokerTabs';
import BrokerOverviewForm from 'src/view/broker/form/components/BrokerOverviewForm';
import BrokerCharacteristicsForm from 'src/view/broker/form/components/BrokerCharacteristicsForm';
import BrokerPlatformForm from 'src/view/broker/form/components/BrokerPlatformForm';
import BrokerMarketsForm from 'src/view/broker/form/components/BrokerMarketsForm';
import BrokerSpreadsForm from 'src/view/broker/form/components/BrokerSpreadsForm';
import BrokerServiceForm from 'src/view/broker/form/components/BrokerServiceForm';
import BrokerTestForm from 'src/view/broker/form/components/BrokerTestForm';
import BrokerOldForm from 'src/view/broker/form/components/BrokerOldForm';
import {
  brokerCheckboxFormPrefix,
  brokerCheckboxNames,
  brokerCheckboxTextPrefix,
} from 'src/view/broker/form/schemas/BrokerCheckboxes';
import {
  brokerForexSignalFields,
  brokerForexSignalFormPrefix,
} from 'src/view/broker/form/schemas/BrokerForexSignals';
import BrokerArticleListPage from 'src/view/brokerArticle/list/BrokerArticleListPage';
import MDAlert from 'src/mui/components/MDAlert';

function BrokerForm(props) {
  const { sidenavColor } = selectMuiSettings();

  const [initialValues] = useState(() => {
    const record = props.record || {};
    const result = {
      // #region Base
      name: record.name,
      name_normalized: record.name_normalized,
      navigation: record.navigation,
      author: record.author,
      activated: record.activated,
      is_broker: record.is_broker,
      is_compareable: record.is_compareable,
      top_broker: record.top_broker,
      top_binary_broker: record.top_binary_broker,
      top_forex_broker: record.top_forex_broker,
      featured_broker: record.featured_broker,
      pdf: record.pdf,
      // #endregion

      // #region Broker's Categories
      categories: (record.categories || []).map(
        (v) => v.category || {},
      ),
      categories_in_top_lists: (record.categories || [])
        .filter((v) => v.show_in_top_listings)
        .map((v) => v.category || {}),
      // #endregion

      // #region Broker Meta
      homepage: record.meta?.homepage,
      homepage_title: record.meta?.homepage_title,
      homepage_impression: record.meta?.homepage_impression,
      broker_type: record.meta?.broker_type,
      description: record.meta?.description,
      teaser: record.meta?.teaser,
      demo_url: record.meta?.demo_url,
      account_url: record.meta?.account_url,
      maximum_leverage: record.meta?.maximum_leverage,
      minimum_deposit: record.meta?.minimum_deposit,
      minimum_deposit_short:
        record.meta?.minimum_deposit_short,
      custodian_fees: record.meta?.custodian_fees,
      mobile_trading: record.meta?.mobile_trading,
      phone_order: record.meta?.phone_order,
      licensed_broker: record.meta?.licensed_broker,
      withholding_tax: record.meta?.withholding_tax,
      scalping_allowed: record.meta?.scalping_allowed,
      // #endregion

      // #region Broker Upside
      upsides: record.upsides,
      // #endregion

      // #region Broker Regulatory Authority
      regulatory_authorities: record.regulatory_authorities,
      // #endregion

      // #region Broker Deposit Guarantee
      deposit_guarantees: record.deposit_guarantees,
      // #endregion

      // #region Broker Certificate
      certificates: record.certificates,
      // #endregion

      // #region Broker Spread
      spreads: record.spreads,
      // #endregion

      // #region Broker Feature
      features: record.features,
      // #endregion

      // #region Broker Bank
      banks: record.banks,
      // #endregion

      // #region Broker Phone
      phone: record.phone?.phone,
      // #endregion

      // #region Broker Fax
      fax: record.fax?.fax,
      // #endregion

      // #region Broker Email
      email: record.email?.email,
      // #endregion

      // #region Broker Address
      address: record.address,
      address_line_0: record.address?.line_0,
      address_line_1: record.address?.line_1,
      address_line_2: record.address?.line_2,
      address_line_3: record.address?.line_3,
      address_line_4: record.address?.line_4,
      address_line_5: record.address?.line_5,
      // #endregion

      // #region Broker Video
      youtube_hash: record.video?.youtube_hash,
      // #endregion

      // #region Broker Checkbox
      checkbox: record.checkbox,
      // #endregion

      // #region Broker Order Type
      order_types: record.order_types,
      // #endregion

      // #region Criteria
      creteria_activated: record.creteria?.activated,
      creteria_body: record.creteria?.body,
      // #endregion

      // #region Minimum Trading Unit
      minimum_trading_units: record.minimum_trading_units,
      // #endregion

      // #region Currency Pair
      currency_pairs: record.currency_pairs,
      // #endregion

      // #region Trade Platform
      trade_platforms: record.trade_platforms,
      // #endregion

      // #region Trade Store
      trade_stores: record.trade_stores,
      // #endregion

      // #region Deposit
      deposits: record.deposits,
      // #endregion

      // #region Broker Forex Signal
      forex_signal: record.forex_signal,
      // #endregion

      broker_image_top_broker_logo:
        record.broker_image_top_broker_logo || [],
      broker_image_top_broker_horizontal_logo:
        record.broker_image_top_broker_horizontal_logo ||
        [],
      broker_image_broker_regulation_image:
        record.broker_image_broker_regulation_image || [],
      broker_image_broker_logo:
        record.broker_image_broker_logo || [],
      broker_image_broker_detail_logo:
        record.broker_image_broker_detail_logo || [],
    };

    if (record.checkbox) {
      for (const brokerCheckboxName of brokerCheckboxNames) {
        result[
          [
            brokerCheckboxFormPrefix,
            brokerCheckboxName,
          ].join('')
        ] = record.checkbox[brokerCheckboxName];
        result[
          [
            brokerCheckboxFormPrefix,
            brokerCheckboxTextPrefix,
            brokerCheckboxName,
          ].join('')
        ] =
          record.checkbox[
            [
              brokerCheckboxTextPrefix,
              brokerCheckboxName,
            ].join('')
          ];
      }
    }

    if (record.forex_signal) {
      for (const brokerForexSignalField of brokerForexSignalFields) {
        result[
          [
            brokerForexSignalFormPrefix,
            brokerForexSignalField,
          ].join('')
        ] = record.forex_signal[brokerForexSignalField];
      }
    }

    return result;
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.register({ name: key });
      form.setValue(key, initialValues[key]);
    });
  };

  const { saveLoading, modal } = props;

  const [tabValue, setTabValue] = useState(0);

  const handleSetTabValue = (event: any, newValue: any) =>
    setTabValue(newValue);

  useEffect(() => {
    onReset();
  }, [initialValues]);

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {props.record?.forex_signale && (
            <MDAlert color="success">
              {i18n(
                'entities.broker.placeholders.forexSignal',
              )}
            </MDAlert>
          )}
          <MDBox>
            <BrokerTabs
              value={tabValue}
              onChange={handleSetTabValue}
              broker={props.record?.id}
              labels={
                props.record?.forex_signale && [
                  'broker',
                  'overview',
                  'forexSignal',
                  'test',
                ]
              }
            />
          </MDBox>
          <MDBox py={3}>
            <TabPanel value={tabValue} index={0}>
              <BrokerBaseForm {...props} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <BrokerOverviewForm {...props} />
            </TabPanel>
            {!props.record?.forex_signale && (
              <>
                <TabPanel value={tabValue} index={2}>
                  <BrokerCharacteristicsForm {...props} />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                  <BrokerPlatformForm {...props} />
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                  <BrokerMarketsForm {...props} />
                </TabPanel>
                <TabPanel value={tabValue} index={5}>
                  <BrokerSpreadsForm {...props} />
                </TabPanel>
                <TabPanel value={tabValue} index={6}>
                  <BrokerServiceForm {...props} />
                </TabPanel>
              </>
            )}
            <TabPanel
              value={tabValue}
              index={props.record?.forex_signale ? 2 : 8}
            >
              <BrokerOldForm {...props} />
            </TabPanel>
            <TabPanel
              value={tabValue}
              index={props.record?.forex_signale ? 3 : 7}
            >
              <BrokerTestForm {...props} />
            </TabPanel>
            {Boolean(props.record?.id) && (
              <TabPanel
                value={tabValue}
                index={props.record?.forex_signale ? 4 : 9}
              >
                <BrokerArticleListPage
                  broker={props.record?.id || null}
                />
              </TabPanel>
            )}
          </MDBox>
          <FormButtons
            style={{
              flexDirection: modal
                ? 'row-reverse'
                : undefined,
            }}
          >
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </MDButton>

            <MDButton
              variant="outlined"
              color={sidenavColor}
              disabled={saveLoading}
              onClick={onReset}
              type="button"
              startIcon={<UndoIcon />}
              size="small"
            >
              {i18n('common.reset')}
            </MDButton>

            {props.onCancel ? (
              <MDButton
                variant="outlined"
                color={sidenavColor}
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                type="button"
                startIcon={<CloseIcon />}
                size="small"
              >
                {i18n('common.cancel')}
              </MDButton>
            ) : null}
          </FormButtons>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default BrokerForm;
