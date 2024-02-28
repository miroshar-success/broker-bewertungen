import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/sitemap/sitemapActions';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';
import ReCaptchaV2FormItem from 'src/view/shared/form/items/ReCaptchaV2FormItem';
import selectors from 'src/modules/sitemap/sitemapSelectors';
import Spinner from 'src/view/shared/Spinner';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  recaptcha: yupFormSchemas.string(
    i18n('common.recaptcha'),
    { required: true },
  ),
});

function SitemapRefresh() {
  const { sidenavColor } = selectMuiSettings();

  const recaptchaRef = useRef(null);

  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      recaptcha: '',
    },
  });

  const onSubmit = (values) => {
    dispatch(actions.doRefresh(values.recaptcha));
    recaptchaRef?.current?.reset();
    form.setValue('recaptcha', '', {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  return (
    <PageContent p={3}>
      <MDTypography variant="h4" mb={2}>
        {i18n('common.sitemap')}
      </MDTypography>
      <FormProvider {...form}>
        <MDBox
          component="form"
          role="form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <MDBox
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
          >
            <MDBox>
              <ReCaptchaV2FormItem
                recaptchaRef={recaptchaRef}
              />
            </MDBox>
            <MDButton
              type="submit"
              variant="gradient"
              color={sidenavColor}
              disabled={loading}
            >
              {i18n('common.rebuild')}
            </MDButton>
            {loading && (
              <MDBox>
                <Spinner />
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      </FormProvider>
    </PageContent>
  );
}

export default SitemapRefresh;
