import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';
import PageWarningViewItem from './PageWarningViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBox from 'src/mui/components/MDBox';

function PageWarningView(props) {
  const renderView = () => {
    const { record } = props;
    return (
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n('entities.pageWarning.fields.id')}
            value={record.id}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.pageWarning.fields.title',
            )}
            value={record.title}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n('entities.pageWarning.fields.body')}
            value={record.body}
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

export default PageWarningView;
