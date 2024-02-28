import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import PageViewItem from 'src/view/page/view/PageViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NavigationViewItem from 'src/view/navigation/view/NavigationViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import AuthorViewItem from 'src/view/author/view/AuthorViewItem';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';
import { isUndefined } from 'lodash';
import PageWarningViewItem from 'src/view/pageWarning/view/PageWarningViewItem';

function PageView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <>
        <MDBox
          pb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h4">
            {'meta data'}
          </MDTypography>
        </MDBox>
        <MDBox p={3}>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <NavigationViewItem
                label={i18n(
                  'entities.generalPage.fields.navigation',
                )}
                value={record.navigation}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextViewItem
                label={i18n(
                  'entities.generalPage.fields.link',
                )}
                value={record.link}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextViewItem
                label={i18n(
                  'entities.generalPage.fields.title',
                )}
                value={record.title}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextViewItem
                label={i18n(
                  'entities.generalPage.fields.meta_keywords',
                )}
                value={record.meta_keywords}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextViewItem
                label={i18n(
                  'entities.generalPage.fields.meta_description',
                )}
                value={record.meta_description}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextViewItem
                label={i18n(
                  'entities.generalPage.fields.created',
                )}
                value={record.created}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <AuthorViewItem
                label={i18n(
                  'entities.generalPage.fields.author',
                )}
                value={record.author}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox
          pb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h4">
            {'teasers'}
          </MDTypography>
        </MDBox>
        <MDBox p={3}>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <MDBox pt={7}>
                <LogoViewItem
                  label={i18n(
                    'entities.generalPage.fields.page_image',
                  )}
                  value={record.page_image}
                />
              </MDBox>
            </Grid>

            <Grid item md={12} xs={12}>
              <TextViewItem
                label={i18n(
                  'entities.generalPage.fields.teaser_link',
                )}
                value={
                  record.page_image
                    ? record.page_image[0]?.link
                    : null
                }
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextViewItem
                label={i18n(
                  'entities.generalPage.fields.teaser_title',
                )}
                value={
                  record.page_image
                    ? record.page_image[0]?.linkTitle
                    : null
                }
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <HtmlViewItem
                label={i18n('entities.news.fields.teaser')}
                value={record.teaser}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox
          pb={3}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h4">
            {'pages content'}
          </MDTypography>
        </MDBox>
        <MDBox p={3}>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <TextViewItem
                label={i18n(
                  'entities.generalPage.fields.name',
                )}
                value={record.name}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <HtmlViewItem
                label={i18n('entities.news.fields.body')}
                value={record.body}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <CheckboxViewItem
                label={i18n(
                  'entities.generalPage.fields.activated',
                )}
                checked={record.activated}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CheckboxViewItem
                label={i18n(
                  'entities.generalPage.fields.pdf',
                )}
                checked={record.pdf}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <PageWarningViewItem
                label={i18n(
                  'entities.generalPage.fields.page_warning',
                )}
                value={record.page_warning}
              />
            </Grid>
          </Grid>
        </MDBox>
      </>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default PageView;
