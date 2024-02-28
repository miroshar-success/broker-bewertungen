import { Grid } from '@mui/material';

import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import BrokerAutocompleteFormItem from 'src/view/broker/autocomplete/BrokerAutocompleteFormItem';
import brokerComparisonActions from 'src/modules/broker/comparison/brokerComparisonActions';
import brokerComparisonSelectors from 'src/modules/broker/comparison/brokerComparisonSelectors';
import CompareDetail from 'src/view/home/broker/comparisons/CompareDetail';
import CompareOverview from 'src/view/home/broker/comparisons/CompareOverview';
import CompareProfile from 'src/view/home/broker/comparisons/CompareProfile';
import CompareRegulation from 'src/view/home/broker/comparisons/CompareRegulation';
import CompareSection from 'src/view/home/broker/comparisons/CompareSection';
import CompareService from 'src/view/home/broker/comparisons/CompareService';
import CompareSpreadsAndFees from 'src/view/home/broker/comparisons/CompareSpreadsAndFees';
import CompareTradable from 'src/view/home/broker/comparisons/CompareTradable';
import CompareTradingPlatforms from 'src/view/home/broker/comparisons/CompareTradingPlatforms';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';
import Spinner from 'src/view/shared/Spinner';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { getHistory } from 'src/modules/store';
import Layout from 'src/view/home/Layout';
import Breadcrumb from 'src/view/home/Breadcrumb';
import MDBox from 'src/mui/components/MDBox';
import brokerTopSelectors from 'src/modules/broker/top/brokerTopSelectors';

const schema = yup.object().shape({
  brokerA: yupFormSchemas.relationToOne(
    i18n('entities.broker.comparison.brokerA'),
    {
      required: true,
    },
  ),
  brokerB: yupFormSchemas.relationToOne(
    i18n('entities.broker.comparison.brokerB'),
    {
      required: true,
    },
  ),
});

function BrokerComparePage(props) {
  const dispatch = useDispatch();

  const match = useRouteMatch();

  const extracts =
    /^\/forex-cfd-broker-vergleich\/([\w-]+)-versus-([\w-]+)$/.exec(
      match.url,
    );
  const [, valueA, valueB] = extracts || [];

  const { sidenavColor } = selectMuiSettings();

  const loading = useSelector(
    brokerComparisonSelectors.selectLoading,
  );
  const recordA = useSelector(
    brokerComparisonSelectors.selectRecordA,
  );
  const recordB = useSelector(
    brokerComparisonSelectors.selectRecordB,
  );
  const hasTopBrokers = useSelector(
    brokerTopSelectors.selectHasRows,
  );
  const topBrokers = useSelector(
    brokerTopSelectors.selectRows,
  );

  const recordToValue = (record) =>
    record && {
      id: record.name_normalized,
      name: record.name,
    };

  const [initialValues] = useState(() => {
    return {
      brokerA:
        (valueA && { id: valueA }) ||
        recordToValue(recordA) ||
        (hasTopBrokers &&
          topBrokers[0] && {
            id: topBrokers[0].name_normalized,
          }),
      brokerB:
        (valueB && { id: valueB }) ||
        recordToValue(recordB) ||
        (hasTopBrokers &&
          topBrokers[1] && {
            id: topBrokers[1].name_normalized,
          }),
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    getHistory().push(
      `/forex-cfd-broker-vergleich/${values.brokerA}-versus-${values.brokerB}`,
    );
  };

  useEffect(() => {
    if (valueA && valueB) {
      dispatch(
        brokerComparisonActions.doFind(valueA, valueB),
      );
    } else if (
      initialValues.brokerA?.id &&
      initialValues.brokerB?.id
    ) {
      dispatch(
        brokerComparisonActions.doFind(
          initialValues.brokerA?.id,
          initialValues.brokerB?.id,
        ),
      );
    }
  }, [valueA, valueB]);

  const [title, setTitle] = useState(
    i18n('entities.broker.comparison.title'),
  );
  const [description, setDescription] = useState(
    i18n('entities.broker.comparison.metaDescription'),
  );

  useEffect(() => {
    setTitle(
      i18n(
        'entities.broker.comparison.vsTitle',
        recordA?.name || '-',
        recordB?.name || '-',
      ),
    );
    setDescription(
      i18n(
        'entities.broker.comparison.metaVsDescription',
        recordA?.name || '-',
        recordB?.name || '-',
      ),
    );
  }, [recordA, recordB]);

  return (
    <Layout
      title={title}
      keywords={[
        'forex',
        'cfd',
        'broker',
        'vergleich',
        recordA?.name_normalized,
        recordB?.name_normalized,
      ].filter(Boolean)}
      description={description}
    >
      <PageContent
        px={{
          lg: 5,
          xs: 2,
        }}
      >
        <MDBox display="none">
          <Breadcrumb
            items={[
              {
                name: i18n(
                  'entities.broker.comparison.title',
                ),
                route: '/forex-cfd-broker-vergleich',
              },
            ]}
          />
        </MDBox>
        <MDTypography variant="h1">
          {i18n('entities.broker.comparison.title')}
        </MDTypography>
        <MDTypography
          color="text"
          fontWeight="regular"
          variant="body2"
          mb={2}
        >
          {i18n('entities.broker.comparison.description')}
        </MDTypography>
        <FormWrapper>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <MDBox
                sx={{
                  '& > * + *': {
                    mt: 2,
                  },
                  '& > * + *:before': {
                    display: 'block',
                    content: '""',
                    borderTop:
                      '1px dotted rgba(128,128,128,.5)',
                    width: '100%',
                    ml: 2,
                  },
                }}
              >
                <Grid spacing={2} container>
                  <CompareSection name="selectBrokers" />
                  <CompareDetail
                    childrenA={
                      <BrokerAutocompleteFormItem
                        name="brokerA"
                        label={i18n(
                          'entities.broker.comparison.brokerA',
                        )}
                        variant="standard"
                        value={recordToValue(recordA)}
                        forceValue
                        disabled={loading}
                        hideLabel
                        useLink
                        required
                        fullWidth
                      />
                    }
                    childrenB={
                      <BrokerAutocompleteFormItem
                        name="brokerB"
                        label={i18n(
                          'entities.broker.comparison.brokerB',
                        )}
                        variant="standard"
                        value={recordToValue(recordB)}
                        forceValue
                        disabled={loading}
                        hideLabel
                        useLink
                        required
                        fullWidth
                      />
                    }
                    after={
                      <MDButton
                        variant="contained"
                        disabled={loading}
                        type="submit"
                        onClick={form.handleSubmit(
                          onSubmit,
                        )}
                        color={sidenavColor}
                        fullWidth
                      >
                        {i18n(
                          'entities.broker.comparison.compare',
                        )}
                      </MDButton>
                    }
                  />
                </Grid>
                {loading && (
                  <Grid spacing={2} container>
                    <Grid xs={12} item>
                      <Spinner />
                    </Grid>
                  </Grid>
                )}
                {!loading && recordA && recordB && (
                  <>
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
                  </>
                )}
              </MDBox>
            </form>
          </FormProvider>
        </FormWrapper>
      </PageContent>
    </Layout>
  );
}

export default BrokerComparePage;
