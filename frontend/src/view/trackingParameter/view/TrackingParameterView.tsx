import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';
import TrackingParameterViewItem from './TrackingParameterViewItem';

function TrackingParameterView(props) {
  const renderView = () => {
    const { record } = props;
    return (
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.trackingParameter.fields.id',
            )}
            value={record.id}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.trackingParameter.fields.param',
            )}
            value={record.param}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.trackingParameter.fields.value',
            )}
            value={record.value}
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

export default TrackingParameterView;
