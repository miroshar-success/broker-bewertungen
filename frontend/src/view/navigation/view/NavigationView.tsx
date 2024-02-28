import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { Grid } from '@mui/material';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import NavigationViewItem from 'src/view/navigation/view/NavigationViewItem';

function NavigationView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.navigation.fields.id')}
            value={record.id}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <NavigationViewItem
            label={i18n(
              'entities.navigation.fields.parent',
            )}
            value={record.parent}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.navigation.fields.name')}
            value={record.name}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.navigation.fields.link')}
            value={record.link}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.navigation.fields.title')}
            value={record.title}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n(
              'entities.navigation.fields.target',
            )}
            value={record.target}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.navigation.fields.type')}
            value={i18n(
              `entities.navigation.enumerators.type.${record.type}`,
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextViewItem
            label={i18n('entities.navigation.fields.sort')}
            value={record.sort}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CheckboxViewItem
            label={i18n(
              'entities.navigation.fields.activated',
            )}
            checked={record.activated}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CheckboxViewItem
            label={i18n(
              'entities.navigation.fields.show_user_logged_in',
            )}
            checked={record.show_user_logged_in}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CheckboxViewItem
            label={i18n(
              'entities.navigation.fields.show_in_navigation',
            )}
            checked={record.show_in_navigation}
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

export default NavigationView;
