import { Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import actions from 'src/modules/tenant/form/tenantFormActions';
import selectors from 'src/modules/tenant/form/tenantFormSelectors';
import authSelectors from 'src/modules/auth/authSelectors';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import config from 'src/config';
import { urlfy } from '../shared/urlfy';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';
import InputAdornment from '@mui/material/InputAdornment';
import { yupResolver } from '@hookform/resolvers/yup';
import MDButton from 'src/mui/components/MDButton';

const schemaWithUrl = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('tenant.fields.tenantName'),
    {
      required: true,
      max: 50,
    },
  ),
  url: yupFormSchemas
    .string(i18n('tenant.fields.tenantUrl'), {
      required: true,
      max: 50,
    })
    .matches(
      /^[a-z0-9][-a-zA-Z0-9]*$/,
      i18n('tenant.validation.url'),
    ),
});

const schemaWithoutUrl = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('tenant.fields.tenantName'),
    {
      required: true,
      max: 50,
    },
  ),
});

const schema = tenantSubdomain.isEnabled
  ? schemaWithUrl
  : schemaWithoutUrl;

function TenantNewForm(props) {
  const dispatch = useDispatch();

  const [initialValues] = useState({
    name: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const loading = useSelector(selectors.selectSaveLoading);

  const invitedTenants = useSelector(
    authSelectors.selectInvitedTenants,
  );

  const onSubmit = (values) => {
    dispatch(actions.doCreate(values));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputFormItem
          name="name"
          label={i18n('tenant.fields.tenantName')}
          autoComplete="name"
          onChange={(value) => {
            // @ts-ignore
            form.setValue('url', urlfy(value));
          }}
          autoFocus
        />

        {tenantSubdomain.isEnabled && (
          <InputFormItem
            name="url"
            placeholder={i18n('tenant.fields.tenantUrl')}
            endAdornment={
              <InputAdornment position="end">
                .{config.frontendUrl.host}
              </InputAdornment>
            }
          />
        )}

        <MDButton
          style={{ marginTop: '16px' }}
          variant="gradient"
          color="info"
          type="submit"
          fullWidth
          disabled={loading}
        >
          {i18n('tenant.create.button')}
        </MDButton>
        {Boolean(invitedTenants.length) && (
          <MDButton
            style={{ marginTop: '16px' }}
            type="button"
            fullWidth
            onClick={props.onViewToggle}
          >
            {i18n('tenant.invitation.view')}
          </MDButton>
        )}
      </form>
    </FormProvider>
  );
}

export default TenantNewForm;
