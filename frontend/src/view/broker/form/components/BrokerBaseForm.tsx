import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import AuthorAutocompleteFormItem from 'src/view/author/autocomplete/AuthorAutocompleteFormItem';
import CategoryAutocompleteFormItem from 'src/view/category/autocomplete/CategoryAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import MDBox from 'src/mui/components/MDBox';
import NavigationAutocompleteFormItem from 'src/view/navigation/autocomplete/NavigationAutocompleteFormItem';
import slug from 'slug';
import Storage from 'src/security/storage';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function BrokerBaseForm(props) {
  const { record } = props;
  const [normalizedName, setNormalizedName] = useState(
    slug(
      (record && (record.name_normalized || record.name)) ||
        '',
    ),
  );
  return (
    <Grid spacing={2} container>
      <Grid item xs={12} mb={3}>
        <FieldSetViewItem
          label={i18n('entities.broker.fields.metadata')}
        >
          <Grid spacing={2} container>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="demo_url"
                label={i18n(
                  'entities.broker.fields.demo_url',
                )}
                variant="standard"
                autoFocus
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="account_url"
                label={i18n(
                  'entities.broker.fields.account_url',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="maximum_leverage"
                label={i18n(
                  'entities.broker.fields.maximum_leverage',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="minimum_deposit_short"
                label={i18n(
                  'entities.broker.fields.minimum_deposit_short',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <CheckboxFormItem
                name="custodian_fees"
                label={i18n(
                  'entities.broker.fields.custodian_fees',
                )}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <CheckboxFormItem
                name="mobile_trading"
                label={i18n(
                  'entities.broker.fields.mobile_trading',
                )}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <CheckboxFormItem
                name="phone_order"
                label={i18n(
                  'entities.broker.fields.phone_order',
                )}
              />
            </Grid>
          </Grid>
        </FieldSetViewItem>
      </Grid>
      <Grid item md={6} xs={12}>
        <InputFormItem
          name="name"
          label={i18n('entities.broker.fields.name')}
          variant="standard"
          required={true}
          onChange={(newVal) => {
            setNormalizedName(slug(newVal));
          }}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <InputFormItem
          name="name_normalized"
          label={i18n(
            'entities.broker.fields.name_normalized',
          )}
          variant="standard"
          required={true}
          onChange={(newValue) => {
            setNormalizedName(slug(newValue));
          }}
          value={normalizedName}
          {...{ forceValue: true }}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <NavigationAutocompleteFormItem
          name="navigation"
          label={i18n('entities.broker.fields.navigation')}
          required={true}
          showCreate={true}
          variant="standard"
          withChildren
          fullWidth
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <AuthorAutocompleteFormItem
          name="author"
          label={i18n('entities.broker.fields.author')}
          required={false}
          showCreate={true}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <CategoryAutocompleteFormItem
          name="categories"
          label={i18n('entities.broker.fields.categories')}
          required={false}
          showCreate={true}
          variant="standard"
          mode="multiple"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <CategoryAutocompleteFormItem
          name="categories_in_top_lists"
          label={i18n(
            'entities.broker.fields.categories_in_top_lists',
          )}
          required={false}
          showCreate={true}
          variant="standard"
          mode="multiple"
          fullWidth
        />
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
        <CheckboxFormItem
          name="activated"
          label={i18n('entities.broker.fields.activated')}
        />
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
        <CheckboxFormItem
          name="is_broker"
          label={i18n('entities.broker.fields.is_broker')}
        />
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
        <CheckboxFormItem
          name="is_compareable"
          label={i18n(
            'entities.broker.fields.is_compareable',
          )}
        />
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
        <CheckboxFormItem
          name="top_broker"
          label={i18n('entities.broker.fields.top_broker')}
        />
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
        <CheckboxFormItem
          name="top_binary_broker"
          label={i18n(
            'entities.broker.fields.top_binary_broker',
          )}
        />
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
        <CheckboxFormItem
          name="top_forex_broker"
          label={i18n(
            'entities.broker.fields.top_forex_broker',
          )}
        />
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
        <CheckboxFormItem
          name="featured_broker"
          label={i18n(
            'entities.broker.fields.featured_broker',
          )}
        />
      </Grid>
      <Grid item lg={3} md={6} xs={12}>
        <CheckboxFormItem
          name="pdf"
          label={i18n('entities.broker.fields.pdf')}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <LogoFormItem
          name="broker_image_top_broker_logo"
          label={i18n(
            'entities.broker.fields.broker_image.top_broker_logo',
          )}
          storage={
            Storage.values.broker_image_top_broker_logo
          }
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <LogoFormItem
          name="broker_image_top_broker_horizontal_logo"
          label={i18n(
            'entities.broker.fields.broker_image.top_broker_horizontal_logo',
          )}
          storage={
            Storage.values
              .broker_image_top_broker_horizontal_logo
          }
        />
      </Grid>
      <Grid item xs={12}>
        <FieldSetViewItem
          label={i18n(
            'entities.broker.fields.homepage_impression',
          )}
        >
          <TextAreaFormItem
            name="homepage_impression"
            variant="standard"
            fullWidth
          />
        </FieldSetViewItem>
      </Grid>
      <Grid item md={4} xs={12}>
        <LogoFormItem
          name="broker_image_broker_regulation_image"
          label={i18n(
            'entities.broker.fields.broker_image.broker_regulation_image',
          )}
          storage={
            Storage.values
              .broker_image_broker_regulation_image
          }
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <LogoFormItem
          name="broker_image_broker_logo"
          label={i18n(
            'entities.broker.fields.broker_image.broker_logo',
          )}
          storage={Storage.values.broker_image_broker_logo}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <LogoFormItem
          name="broker_image_broker_detail_logo"
          label={i18n(
            'entities.broker.fields.broker_image.broker_detail_logo',
          )}
          storage={
            Storage.values.broker_image_broker_detail_logo
          }
        />
      </Grid>
    </Grid>
  );
}

export default BrokerBaseForm;
