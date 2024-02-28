import { Grid, InputAdornment } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthorAutocompleteFormItem from 'src/view/author/autocomplete/AuthorAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import CloseIcon from '@mui/icons-material/Close';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import SaveIcon from '@mui/icons-material/Save';
import slug from 'slug';
import UndoIcon from '@mui/icons-material/Undo';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.brokerArticle.fields.name'),
    {
      required: true,
      min: 1,
      max: 100,
    },
  ),
  name_normalized: yupFormSchemas.string(
    i18n('entities.brokerArticle.fields.name_normalized'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  pagetitle: yupFormSchemas.string(
    i18n('entities.brokerArticle.fields.pagetitle'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  metadescription: yupFormSchemas.string(
    i18n('entities.brokerArticle.fields.metadescription'),
    {},
  ),
  metakeywords: yupFormSchemas.string(
    i18n('entities.brokerArticle.fields.metakeywords'),
    {},
  ),
  content: yupFormSchemas.string(
    i18n('entities.brokerArticle.fields.content'),
    {},
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.brokerArticle.fields.activated'),
    {},
  ),
  author: yupFormSchemas.relationToOne(
    i18n('entities.brokerArticle.fields.author'),
    {},
  ),
});

function BrokerArticleForm(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      name_normalized: record.name_normalized,
      pagetitle: record.pagetitle,
      metadescription: record.metadescription,
      metakeywords: record.metakeywords,
      content: record.content,
      activated: record.activated,
      author: record.author || null,
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

  const [normalizedName, setNormalizedName] = useState(
    slug(
      props.record?.name_normalized ||
        props.record?.name ||
        '',
    ),
  );

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={2} container>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="name"
                label={i18n(
                  'entities.brokerArticle.fields.name',
                )}
                variant="standard"
                required={true}
                onChange={(newVal) => {
                  setNormalizedName(slug(newVal));
                }}
                autoFocus
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="name_normalized"
                label={i18n(
                  'entities.brokerArticle.fields.name_normalized',
                )}
                variant="standard"
                required={true}
                onChange={(newValue) => {
                  setNormalizedName(slug(newValue));
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <span>
                      {`/${props.record?.broker?.name_normalized}/`}
                    </span>
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
                  'entities.brokerArticle.fields.pagetitle',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="metadescription"
                label={i18n(
                  'entities.brokerArticle.fields.metadescription',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="metakeywords"
                label={i18n(
                  'entities.brokerArticle.fields.metakeywords',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <HtmlEditorFormItem
                name="content"
                label={i18n(
                  'entities.brokerArticle.fields.content',
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CheckboxFormItem
                name="activated"
                label={i18n(
                  'entities.brokerArticle.fields.activated',
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <AuthorAutocompleteFormItem
                name="author"
                label={i18n(
                  'entities.brokerArticle.fields.author',
                )}
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

export default BrokerArticleForm;
