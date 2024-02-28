import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';

function BlogCommentView(props) {
  const renderView = () => {
    const { record } = props;
    return (
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n('entities.blogComment.fields.id')}
            value={record.id}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n('entities.blogComment.fields.name')}
            value={record.name}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.blogComment.fields.email',
            )}
            value={record.email}
          />
        </Grid>
        <Grid item xs={12}>
          <HtmlViewItem
            label={i18n(
              'entities.blogComment.fields.content',
            )}
            value={record.content}
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

export default BlogCommentView;
