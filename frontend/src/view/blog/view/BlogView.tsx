import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import BlogViewItem from 'src/view/blog/view/BlogViewItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NavigationViewItem from 'src/view/navigation/view/NavigationViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import AuthorViewItem from 'src/view/author/view/AuthorViewItem';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';
import { isUndefined } from 'lodash';
import BrokerViewItem from 'src/view/broker/view/BrokerViewItem';

function BlogView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <TextViewItem
              label={i18n('entities.blog.fields.name')}
              value={record.name}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextViewItem
              label={i18n('entities.blog.fields.link')}
              value={record.link}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextViewItem
              label={i18n('entities.blog.fields.pagetitle')}
              value={record.pagetitle}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextViewItem
              label={i18n(
                'entities.blog.fields.metadescription',
              )}
              value={record.metadescription}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextViewItem
              label={i18n(
                'entities.blog.fields.metakeywords',
              )}
              value={record.metakeywords}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <AuthorViewItem
              label={i18n('entities.blog.fields.author')}
              value={record.author}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <MDBox pt={7}>
              <LogoViewItem
                label={i18n(
                  'entities.blog.fields.blog_image',
                )}
                value={record.blog_image}
              />
            </MDBox>
          </Grid>
          <Grid item md={12} xs={12}>
            <HtmlViewItem
              label={i18n('entities.news.fields.teaser')}
              value={record.teaser}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <HtmlViewItem
              label={i18n('entities.news.fields.content')}
              value={record.content}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <CheckboxViewItem
              label={i18n('entities.blog.fields.activated')}
              checked={record.activated}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <BrokerViewItem
              label={i18n('entities.blog.fields.brokers')}
              value={record.brokers}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default BlogView;
