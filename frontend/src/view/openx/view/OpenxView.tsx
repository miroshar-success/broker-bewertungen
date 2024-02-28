import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';

function OpenxView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n('entities.openx.fields.code')}
            value={record.code}
            multiline={true}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n('entities.openx.fields.noscript')}
            value={record.noscript}
            multiline={true}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextViewItem
            label={i18n('entities.openx.fields.zone')}
            value={i18n(
              `entities.openx.enumerators.zone.${record.zone}`,
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CheckboxViewItem
            label={i18n('entities.openx.fields.activated')}
            checked={record.activated}
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

export default OpenxView;
