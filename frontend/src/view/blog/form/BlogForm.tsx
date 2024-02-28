import { Grid, InputAdornment } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthorAutocompleteFormItem from 'src/view/author/autocomplete/AuthorAutocompleteFormItem';
import BrokerAutocompleteFormItem from 'src/view/broker/autocomplete/BrokerAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import CloseIcon from '@mui/icons-material/Close';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import slug from 'slug';
import Storage from 'src/security/storage';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  name_normalized: yupFormSchemas.string(
    i18n('entities.blog.fields.link'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  metakeywords: yupFormSchemas.string(
    i18n('entities.blog.fields.metakeywords'),
    {
      min: 1,
      max: 255,
    },
  ),
  metadescription: yupFormSchemas.string(
    i18n('entities.blog.fields.metadescription'),
    {
      min: 1,
      max: 255,
    },
  ),
  name: yupFormSchemas.string(
    i18n('entities.blog.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  pagetitle: yupFormSchemas.string(
    i18n('entities.blog.fields.title'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  teaser: yupFormSchemas.string(
    i18n('entities.blog.fields.teaser'),
    {},
  ),
  content: yupFormSchemas.string(
    i18n('entities.blog.fields.content'),
    {
      required: true,
    },
  ),
  blog_image: yupFormSchemas.images(
    i18n('entities.blog.fields.blog_image'),
    {},
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.blog.fields.activated'),
    {},
  ),
  brokers: yupFormSchemas.relationToMany(
    i18n('entities.blog.fields.brokers'),
    {},
  ),
});

function BlogForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const dispatch = useDispatch();
  const { record } = props;
  const [normalizedName, setNormalizedName] = useState(
    slug(
      (record && (record.name_normalized || record.name)) ||
        '',
    ),
  );
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      pagetitle: record.pagetitle || null,
      metakeywords: record.metakeywords || null,
      metadescription: record.metadescription || null,
      author: record.author,
      related_links: record.related_links,
      blog_image: record.blog_image || null,
      teaser: record.teaser || null,
      name: record.name,
      content: record.content,
      activated: record.activated,
      brokers: record.brokers,
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
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="name"
                variant="standard"
                label={i18n('entities.blog.fields.name')}
                onChange={(newVal) => {
                  setNormalizedName(slug(newVal));
                }}
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="name_normalized"
                label={i18n('entities.blog.fields.link')}
                variant="standard"
                required={true}
                onChange={(newValue) => {
                  setNormalizedName(slug(newValue));
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <span>/blog/</span>
                  </InputAdornment>
                }
                value={normalizedName}
                {...{ forceValue: true }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="pagetitle"
                label={i18n(
                  'entities.blog.fields.pagetitle',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextAreaFormItem
                name="metadescription"
                label={i18n(
                  'entities.blog.fields.metadescription',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextAreaFormItem
                name="metakeywords"
                label={i18n(
                  'entities.blog.fields.metakeywords',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <AuthorAutocompleteFormItem
                name="author"
                label={i18n('entities.blog.fields.author')}
                showCreate={true}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <ImagesFormItem
                name="blog_image"
                label={i18n(
                  'entities.blog.fields.blog_image',
                )}
                storage={Storage.values.blog_image}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <HtmlEditorFormItem
                name="teaser"
                label={i18n('entities.blog.fields.teaser')}
                value={initialValues.teaser}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <HtmlEditorFormItem
                name="content"
                label={i18n('entities.blog.fields.content')}
                value={initialValues.content}
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <CheckboxFormItem
                name="activated"
                label={i18n(
                  'entities.blog.fields.activated',
                )}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <BrokerAutocompleteFormItem
                name="brokers"
                label={i18n('entities.blog.fields.brokers')}
                mode="multiple"
                showCreate={true}
                variant="standard"
                fullWidth
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

export default BlogForm;
