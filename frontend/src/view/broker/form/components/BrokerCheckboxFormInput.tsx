import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import brokerEnumerators from 'src/modules/broker/brokerEnumerators';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';
import GroupFormItem from 'src/view/shared/form/items/GroupFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import PropTypes from 'prop-types';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

function BrokerCheckboxFormInput(props) {
  const { name, record } = props;
  const value =
    record && record.checkbox
      ? record.checkbox[name]
      : null;
  return (
    <FieldSetViewItem
      label={i18n(
        `entities.broker.fields.checkbox.${name}`,
      )}
    >
      <Grid spacing={2} container>
        <Grid item md={3} xs={12}>
          <SelectFormItem
            name={`checkbox_${name}`}
            label={i18n(
              'entities.broker.fields.checkbox.image_type',
            )}
            variant="standard"
            options={brokerEnumerators.checkbox.image_type.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.broker.enumerators.checkbox.image_type.${value}`,
                ),
              }),
            )}
            value={value}
          />
        </Grid>
        <Grid item md={9} xs={12}>
          <GroupFormItem
            label={i18n(
              'entities.broker.fields.checkbox.items',
            )}
            name={`text_${name}`}
            namePrefix="checkbox_"
            valueAttr="checkbox"
            groupInputTemplates={[
              {
                input: InputFormItem,
                name: 'text',
                label: i18n(
                  'entities.broker.fields.checkbox.text',
                ),
                md: 6,
                xs: 12,
                defaultValue: '',
              },
              {
                input: InputFormItem,
                name: 'url',
                label: i18n(
                  'entities.broker.fields.checkbox.url',
                ),
                md: 6,
                xs: 12,
                defaultValue: '',
              },
            ]}
            noContainer
          />
        </Grid>
      </Grid>
    </FieldSetViewItem>
  );
}

BrokerCheckboxFormInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BrokerCheckboxFormInput;
