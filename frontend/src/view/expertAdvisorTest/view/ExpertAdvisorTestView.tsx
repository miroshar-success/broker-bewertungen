import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';
import NavigationViewItem from 'src/view/navigation/view/NavigationViewItem';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';
import BrokerViewItem from 'src/view/broker/view/BrokerViewItem';

function ExpertAdvisorTestView(props) {
  const renderView = () => {
    const { record } = props;
    return (
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <FieldSetViewItem
            label={i18n(
              'entities.expertAdvisorTest.fields.general',
            )}
          >
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <TextViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.id',
                  )}
                  value={record.id}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.name',
                  )}
                  value={record.name}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <BrokerViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.broker',
                  )}
                  value={record.broker}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <NavigationViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.navigation',
                  )}
                  value={record.navigation}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.deposit',
                  )}
                  value={record.deposit}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.start_date',
                  )}
                  value={record.start_date}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <CheckboxViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.activated',
                  )}
                  checked={record.activated}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <CheckboxViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.pdf',
                  )}
                  checked={record.pdf}
                />
              </Grid>
            </Grid>
          </FieldSetViewItem>
        </Grid>
        <Grid xs={12} item>
          <FieldSetViewItem
            label={i18n(
              'entities.expertAdvisorTest.fields.metadata',
            )}
          >
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <TextViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.homepage',
                  )}
                  value={
                    record.expert_advisor_test_metas
                      ? record.expert_advisor_test_metas[0]
                          .homepage
                      : ''
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.meta_keywords',
                  )}
                  value={
                    record.expert_advisor_test_metas
                      ? record.expert_advisor_test_metas[0]
                          .meta_keywords
                      : ''
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.meta_description',
                  )}
                  value={
                    record.expert_advisor_test_metas
                      ? record.expert_advisor_test_metas[0]
                          .meta_description
                      : ''
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <HtmlViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.description',
                  )}
                  value={
                    record.expert_advisor_test_metas[0]
                      ? record.expert_advisor_test_metas[0]
                          .description
                      : ''
                  }
                />
              </Grid>
            </Grid>
          </FieldSetViewItem>
        </Grid>
        <Grid xs={12} item>
          <FieldSetViewItem
            label={i18n(
              'entities.expertAdvisorTest.fields.screenshot',
            )}
          >
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <LogoViewItem
                  label={i18n(
                    'entities.expertAdvisorTest.fields.expert_advisor_test_image',
                  )}
                  value={record.expert_advisor_test_image}
                />
              </Grid>
            </Grid>
          </FieldSetViewItem>
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default ExpertAdvisorTestView;
