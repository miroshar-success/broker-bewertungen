import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import promotionEnumerators from '../../../modules/promotion/promotionEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import PromotionAutocompleteFormItem from 'src/view/promotion/autocomplete/PromotionAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import Storage from 'src/security/storage';
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.promotion.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  link: yupFormSchemas.string(
    i18n('entities.promotion.fields.link'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  promotion_image: yupFormSchemas.images(
    i18n('entities.promotion.fields.uploadfile'),
    {
      required: true,
    },
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.promotion.fields.activated'),
    {},
  ),
});

function PromotionForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      link: record.link,
      name: record.name,
      activated: record.activated,
      promotion_image: record.promotion_image || null,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
    dispatch(formActions.doRefresh());
  };

  const { saveLoading, modal } = props;

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={2} container>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="name"
                label={i18n(
                  'entities.promotion.fields.name',
                )}
                variant="standard"
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="link"
                label={i18n(
                  'entities.promotion.fields.link',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <LogoFormItem
                name="promotion_image"
                label={i18n(
                  'entities.promotion.fields.uploadfile',
                )}
                storage={Storage.values.promotion_image}
                required={true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CheckboxFormItem
                name="activated"
                label={i18n(
                  'entities.promotion.fields.activated',
                )}
              />
            </Grid>
          </Grid>
          <FormButtons
            style={{
              flexDirection: modal
                ? 'row-reverse'
                : undefined,
            }}
          >
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </MDButton>

            <MDButton
              variant="outlined"
              color={sidenavColor}
              disabled={saveLoading}
              onClick={onReset}
              type="button"
              startIcon={<UndoIcon />}
              size="small"
            >
              {i18n('common.reset')}
            </MDButton>

            {props.onCancel ? (
              <MDButton
                variant="outlined"
                color={sidenavColor}
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                type="button"
                startIcon={<CloseIcon />}
                size="small"
              >
                {i18n('common.cancel')}
              </MDButton>
            ) : null}
          </FormButtons>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default PromotionForm;
