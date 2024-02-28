import { useForm, FormProvider } from 'react-hook-form';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import { i18n } from 'src/i18n';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { Link, useLocation } from 'react-router-dom';
import { Button, Card } from '@mui/material';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MDBox from 'src/mui/components/MDBox';
import { BrandLogo } from 'src/assets/resources';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';

const schema = yup.object().shape({
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
});

function PasswordResetPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );

  const token = queryString.parse(location.search).token;

  const [initialValues] = useState({
    password: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const loading = useSelector(
    selectors.selectLoadingPasswordReset,
  );

  const onSubmit = async ({ password }) => {
    dispatch(actions.doResetPassword(token, password));
  };

  return (
    <CoverLayout
      image={
        backgroundImageUrl || '/images/forgotPassword.jpg'
      }
    >
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDBox
            display="flex"
            justifyContent="center"
            py={2}
          >
            <BrandLogo width="80%" />
          </MDBox>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputFormItem
                name="password"
                label={i18n('user.fields.password')}
                autoComplete="password"
                type="password"
                autoFocus
              />

              <MDBox mt={4}>
                <MDButton
                  variant="gradient"
                  color="info"
                  type="submit"
                  fullWidth
                  disabled={loading}
                >
                  {i18n('auth.passwordReset.message')}
                </MDButton>
              </MDBox>

              <MDBox my={3} textAlign="center">
                <MDTypography
                  variant="button"
                  color="info"
                  component={Link}
                  to="/admin/auth/signin"
                  fontWeight="medium"
                  textGradient
                >
                  {i18n('common.cancel')}
                </MDTypography>
              </MDBox>
            </form>
          </FormProvider>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default PasswordResetPage;
