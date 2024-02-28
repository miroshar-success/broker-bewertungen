import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import formActions from 'src/modules/form/formActions';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import Storage from 'src/security/storage';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.author.fields.name'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  link: yupFormSchemas.string(
    i18n('entities.author.fields.link'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  author_image: yupFormSchemas.images(
    i18n('entities.author.fields.image'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  description: yupFormSchemas.string(
    i18n('entities.author.fields.description'),
    {
      required: true,
    },
  ),
});

function AuthorForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      link: record.link
        ? record.link
        : record.author_image
        ? record.author_image[0]?.link
        : null,
      author_image: record.author_image,
      description: record.description,
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
                label={i18n('entities.author.fields.name')}
                variant="standard"
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="link"
                label={i18n('entities.author.fields.link')}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <LogoFormItem
                name="author_image"
                label={i18n('entities.author.fields.image')}
                storage={Storage.values.author_image}
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextAreaFormItem
                name="description"
                label={i18n(
                  'entities.author.fields.description',
                )}
                value={initialValues.description}
                required={true}
                variant="standard"
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

export default AuthorForm;
