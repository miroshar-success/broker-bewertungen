import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';

function BrokerTestForm(props) {
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <CheckboxFormItem
          name="creteria_activated"
          label={i18n(
            'entities.broker.fields.creteria.activated',
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <HtmlEditorFormItem
          name="creteria_body"
          label={i18n(
            'entities.broker.fields.creteria.body',
          )}
          height={500}
        />
      </Grid>
    </Grid>
  );
}

export default BrokerTestForm;
