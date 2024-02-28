import { Grid, InputAdornment } from '@mui/material';
import { i18n } from 'src/i18n';
import brokerEnumerators from 'src/modules/broker/brokerEnumerators';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import BrokerCheckboxFormInput from 'src/view/broker/form/components/BrokerCheckboxFormInput';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import GroupFormItem from 'src/view/shared/form/items/GroupFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';

function BrokerCharacteristicsForm(props) {
  const { darkMode } = selectMuiSettings();
  const { record } = props;
  return (
    <Grid spacing={2} container>
      <Grid item md={6} xs={12}>
        <Grid spacing={2} container>
          <Grid item xs={12}>
            <InputFormItem
              name="homepage"
              label={i18n(
                'entities.broker.fields.homepage',
              )}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <InputFormItem
              name="phone"
              label={i18n('entities.broker.fields.phone')}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <InputFormItem
              name="fax"
              label={i18n('entities.broker.fields.fax')}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <InputFormItem
              name="email"
              label={i18n('entities.broker.fields.email')}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <FieldSetViewItem
          label={i18n('entities.broker.fields.addresses')}
        >
          <Grid spacing={2} container>
            <Grid item xs={12}>
              <InputFormItem
                name="address_line_0"
                label={i18n(
                  'entities.broker.fields.address.line_0',
                )}
                variant="standard"
                value={record.address?.line_0}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="address_line_1"
                label={i18n(
                  'entities.broker.fields.address.line_1',
                )}
                variant="standard"
                value={record.address?.line_1}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="address_line_2"
                label={i18n(
                  'entities.broker.fields.address.line_2',
                )}
                variant="standard"
                value={record.address?.line_2}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="address_line_3"
                label={i18n(
                  'entities.broker.fields.address.line_3',
                )}
                variant="standard"
                value={record.address?.line_3}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="address_line_4"
                label={i18n(
                  'entities.broker.fields.address.line_4',
                )}
                variant="standard"
                value={record.address?.line_4}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFormItem
                name="address_line_5"
                label={i18n(
                  'entities.broker.fields.address.line_5',
                )}
                variant="standard"
                value={record.address?.line_5}
              />
            </Grid>
          </Grid>
        </FieldSetViewItem>
      </Grid>
      <Grid item xs={12}>
        <HtmlEditorFormItem
          name="description"
          label={i18n('entities.broker.fields.description')}
        />
      </Grid>
      <Grid item xs={12}>
        <FieldSetViewItem
          description={i18n(
            'entities.broker.fields.youtube_hash_description',
          )}
          label={i18n('entities.broker.fields.video')}
        >
          <MDBox position="relative" pb="56.25%" mb={2}>
            <iframe
              src={`https://www.youtube.com/embed/${record.video?.youtube_hash}`}
              frameBorder={0}
              width="100%"
              height="100%"
              allowFullScreen
              style={{
                left: 0,
                top: 0,
                position: 'absolute',
              }}
            />
          </MDBox>
          <InputFormItem
            name="youtube_hash"
            label={i18n(
              'entities.broker.fields.youtube_hash',
            )}
            variant="standard"
            startAdornment={
              <InputAdornment position="start">
                <span>
                  {i18n(
                    'entities.broker.fields.youtube_hash_prefix',
                  )}
                </span>
              </InputAdornment>
            }
          />
        </FieldSetViewItem>
      </Grid>
      <Grid item xs={12}>
        <CheckboxFormItem
          name="licensed_broker"
          label={i18n(
            'entities.broker.fields.licensed_broker',
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="office_in_germany"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="regulation_and_deposit_security"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="segregated_accounts"
        />
      </Grid>
      <Grid item xs={12}>
        <InputFormItem
          name="minimum_deposit"
          label={i18n(
            'entities.broker.fields.minimum_deposit',
          )}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput {...props} name="bonus" />
      </Grid>
      <Grid item xs={12}>
        <GroupFormItem
          name="banks"
          label={i18n('entities.broker.fields.banks')}
          groupInputTemplates={[
            {
              input: InputFormItem,
              name: 'name',
              label: i18n(
                'entities.broker.fields.bank.name',
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
                'entities.broker.fields.bank.url',
              ),
              md: 6,
              xs: 12,
              defaultValue: '',
            },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="account_currencies"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="posibilities_for_withdrawals"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="reserve_liabiliry"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="interest_on_deposit"
        />
      </Grid>
      <Grid item xs={12}>
        <SelectFormItem
          name="withholding_tax"
          label={i18n(
            'entities.broker.fields.withholding_tax',
          )}
          options={brokerEnumerators.meta.withholding_tax.map(
            (value) => ({
              value,
              label: i18n(
                `entities.broker.enumerators.meta.withholding_tax.${value}`,
              ),
            }),
          )}
          variant="standard"
        />
      </Grid>
    </Grid>
  );
}

export default BrokerCharacteristicsForm;
