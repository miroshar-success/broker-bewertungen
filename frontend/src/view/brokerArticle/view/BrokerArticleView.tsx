import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import AuthorViewItem from 'src/view/author/view/AuthorViewItem';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function BrokerArticleView(props) {
  const renderView = () => {
    const { record } = props;
    return (
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.brokerArticle.fields.id')}
            value={record.id}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.brokerArticle.fields.name',
            )}
            value={record.name}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.brokerArticle.fields.name_normalized',
            )}
            value={record.link}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.brokerArticle.fields.pagetitle',
            )}
            value={record.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n(
              'entities.brokerArticle.fields.metadescription',
            )}
            value={record.metadescription}
          />
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n(
              'entities.brokerArticle.fields.metakeywords',
            )}
            value={record.metakeywords}
          />
        </Grid>
        <Grid item xs={12}>
          <HtmlViewItem
            label={i18n(
              'entities.brokerArticle.fields.content',
            )}
            value={record.content}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CheckboxViewItem
            label={i18n(
              'entities.brokerArticle.fields.activated',
            )}
            checked={record.activated}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <AuthorViewItem
            label={i18n(
              'entities.brokerArticle.fields.author',
            )}
            value={record.author}
          />
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

export default BrokerArticleView;
