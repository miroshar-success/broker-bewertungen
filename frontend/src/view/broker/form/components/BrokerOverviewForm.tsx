import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import brokerEnumerators from 'src/modules/broker/brokerEnumerators';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import GroupFormItem from 'src/view/shared/form/items/GroupFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import Storage from 'src/security/storage';

function BrokerOverviewForm(props) {
  const { record } = props;
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <HtmlEditorFormItem
          name="teaser"
          label={i18n('entities.broker.fields.teaser')}
        />
      </Grid>
      {!record.forex_signale && (
        <>
          <Grid item xs={12}>
            <GroupFormItem
              name="upsides"
              label={i18n('entities.broker.fields.upsides')}
              groupInputTemplates={[
                {
                  input: SelectFormItem,
                  name: 'type',
                  label: i18n(
                    'entities.broker.fields.upside.type',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                  options:
                    brokerEnumerators.upside.type.map(
                      (value) => ({
                        value,
                        label: i18n(
                          `entities.broker.enumerators.upside.type.${value}`,
                        ),
                      }),
                    ),
                },
                {
                  input: InputFormItem,
                  name: 'text',
                  label: i18n(
                    'entities.broker.fields.upside.text',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                  required: true,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <GroupFormItem
              name="regulatory_authorities"
              label={i18n(
                'entities.broker.fields.regulatory_authorities',
              )}
              groupInputTemplates={[
                {
                  input: InputFormItem,
                  name: 'name',
                  label: i18n(
                    'entities.broker.fields.regulatory_authority.name',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                  required: true,
                },
                {
                  input: InputFormItem,
                  name: 'abbreviation',
                  label: i18n(
                    'entities.broker.fields.regulatory_authority.abbreviation',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                },
                {
                  input: InputFormItem,
                  name: 'url',
                  label: i18n(
                    'entities.broker.fields.regulatory_authority.url',
                  ),
                  xs: 12,
                  defaultValue: '',
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <GroupFormItem
              name="deposit_guarantees"
              label={i18n(
                'entities.broker.fields.deposit_guarantees',
              )}
              groupInputTemplates={[
                {
                  input: InputFormItem,
                  name: 'name',
                  label: i18n(
                    'entities.broker.fields.deposit_guarantee.name',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                  required: true,
                },
                {
                  input: InputFormItem,
                  name: 'url',
                  label: i18n(
                    'entities.broker.fields.deposit_guarantee.url',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                },
                {
                  input: InputFormItem,
                  name: 'text',
                  label: i18n(
                    'entities.broker.fields.deposit_guarantee.text',
                  ),
                  xs: 12,
                  defaultValue: '',
                },
              ]}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SelectFormItem
              name="broker_type"
              label={i18n(
                'entities.broker.fields.broker_type',
              )}
              options={brokerEnumerators.meta.broker_type.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.broker.enumerators.meta.broker_type.${value}`,
                  ),
                }),
              )}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <GroupFormItem
              name="certificates"
              label={i18n(
                'entities.broker.fields.certificates',
              )}
              groupInputTemplates={[
                {
                  input: LogoFormItem,
                  name: 'image',
                  label: i18n(
                    'entities.broker.fields.certificate.image',
                  ),
                  md: 3,
                  xs: 12,
                  defaultValue: '',
                  storage:
                    Storage.values
                      .broker_certificate_image_certificate_image,
                },
                {
                  input: InputFormItem,
                  name: 'name',
                  label: i18n(
                    'entities.broker.fields.certificate.name',
                  ),
                  md: 3,
                  xs: 12,
                  defaultValue: '',
                  required: true,
                },
                {
                  input: InputFormItem,
                  name: 'url',
                  label: i18n(
                    'entities.broker.fields.certificate.url',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <GroupFormItem
              name="spreads"
              label={i18n('entities.broker.fields.spreads')}
              groupInputTemplates={[
                {
                  input: InputFormItem,
                  name: 'spread',
                  label: i18n(
                    'entities.broker.fields.spread.spread',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                  required: true,
                },
                {
                  input: InputFormItem,
                  name: 'url',
                  label: i18n(
                    'entities.broker.fields.spread.url',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                },
                {
                  input: CheckboxFormItem,
                  name: 'primary',
                  label: i18n(
                    'entities.broker.fields.spread.primary',
                  ),
                  xs: 12,
                  defaultValue: false,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <GroupFormItem
              name="features"
              label={i18n(
                'entities.broker.fields.features',
              )}
              groupInputTemplates={[
                {
                  input: InputFormItem,
                  name: 'feature',
                  label: i18n(
                    'entities.broker.fields.feature.feature',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                  required: true,
                },
                {
                  input: InputFormItem,
                  name: 'url',
                  label: i18n(
                    'entities.broker.fields.feature.url',
                  ),
                  md: 6,
                  xs: 12,
                  defaultValue: '',
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckboxFormItem
              name="scalping_allowed"
              label={i18n(
                'entities.broker.fields.scalping_allowed',
              )}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default BrokerOverviewForm;
