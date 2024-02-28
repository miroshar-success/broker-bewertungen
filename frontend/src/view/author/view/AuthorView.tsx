import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';
import AuthorViewItem from './AuthorViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBox from 'src/mui/components/MDBox';

function AuthorView(props) {
  const renderView = () => {
    const { record } = props;
    return (
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n('entities.author.fields.id')}
            value={record.id}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n('entities.author.fields.name')}
            value={record.name}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n('entities.author.fields.link')}
            value={
              record.link
                ? record.link
                : record.author_image
                ? record.author_image[0]?.link
                : null
            }
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <MDBox pt={7}>
            <LogoViewItem
              label={i18n('entities.author.fields.image')}
              value={record.author_image}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n(
              'entities.author.fields.description',
            )}
            value={record.description}
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

export default AuthorView;
