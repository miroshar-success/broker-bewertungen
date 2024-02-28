import { Grid, InputAdornment } from '@mui/material';
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
import newsEnumerators from '../../../modules/news/newsEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import NewsAutocompleteFormItem from 'src/view/news/autocomplete/NewsAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import Storage from 'src/security/storage';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';
import formActions from 'src/modules/form/formActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  link: yupFormSchemas.string(
    i18n('entities.news.fields.link'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  meta_keywords: yupFormSchemas.string(
    i18n('entities.news.fields.meta_keywords'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  meta_description: yupFormSchemas.string(
    i18n('entities.news.fields.meta_description'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  name: yupFormSchemas.string(
    i18n('entities.news.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  title: yupFormSchemas.string(
    i18n('entities.news.fields.title'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  news_images: yupFormSchemas.images(
    i18n('entities.news.fields.teaser_upload'),
  ),
  teaser: yupFormSchemas.string(
    i18n('entities.news.fields.teaser'),
    {},
  ),
  teaser_link: yupFormSchemas.string(
    i18n('entites.news.fields.teaser_link'),
    {},
  ),
  teaser_title: yupFormSchemas.string(
    i18n('entites.news.fields.teaser_title'),
    {},
  ),
  body: yupFormSchemas.string(
    i18n('entities.news.fields.body'),
    {
      required: true,
    },
  ),
  target: yupFormSchemas.enumerator(
    i18n('entities.news.fields.target'),
    {
      options: newsEnumerators.target,
    },
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.news.fields.activated'),
    {},
  ),
  pdf: yupFormSchemas.boolean(
    i18n('entities.news.fields.pdf'),
    {},
  ),
  frontpage: yupFormSchemas.boolean(
    i18n('entities.news.fields.frontpage'),
    {},
  ),
  created: yupFormSchemas.datetime(
    i18n('entities.news.fields.created'),
    {},
  ),
});

function NewsForm(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const dispatch = useDispatch();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      link: record.link,
      meta_keywords: record.meta_keywords,
      meta_description: record.meta_description,
      name: record.name,
      title: record.title,
      teaser: record.teaser,
      teaser_link: record.news_image
        ? record.news_image[0]?.link
        : null,
      teaser_title: record.news_image
        ? record.news_image[0]?.linkTitle
        : null,
      body: record.body,
      target: record.target,
      sort: record.sort ?? 0,
      activated: record.activated,
      pdf: record.pdf,
      frontpage: record.frontpage,
      news_image: record.news_image || [],
      created: record.created,
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
            <Grid xs={12} item>
              <FieldSetViewItem
                label={i18n(
                  'entities.news.fields.metadata',
                )}
              >
                <Grid spacing={2} container>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="link"
                      label={i18n(
                        'entities.news.fields.link',
                      )}
                      startAdornment={
                        <InputAdornment position="start">
                          <span>/aktuelles/</span>
                        </InputAdornment>
                      }
                      variant="standard"
                      required={true}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="title"
                      label={i18n(
                        'entities.news.fields.title',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="meta_keywords"
                      label={i18n(
                        'entities.news.fields.meta_keywords',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="meta_description"
                      label={i18n(
                        'entities.news.fields.meta_description',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePickerFormItem
                      name="created"
                      label={i18n(
                        'entities.news.fields.created',
                      )}
                      variant="standard"
                      showTime
                    />
                  </Grid>
                </Grid>
              </FieldSetViewItem>
            </Grid>
            <Grid xs={12} item>
              <FieldSetViewItem
                label={i18n('entities.news.fields.teaser')}
              >
                <Grid spacing={2} container>
                  <Grid item xs={12}>
                    <LogoFormItem
                      name="news_image"
                      label={i18n(
                        'entities.news.fields.teaser_upload',
                      )}
                      storage={Storage.values.news_image}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="teaser_link"
                      label={i18n(
                        'entities.news.fields.teaser_link',
                      )}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="teaser_title"
                      label={i18n(
                        'entities.news.fields.teaser_title',
                      )}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <HtmlEditorFormItem
                      name="teaser"
                      label={i18n(
                        'entities.news.fields.teaser',
                      )}
                      value={initialValues.teaser}
                    />
                  </Grid>
                </Grid>
              </FieldSetViewItem>
            </Grid>
            <Grid xs={12} item>
              <FieldSetViewItem
                label={i18n(
                  'entities.news.fields.page_content',
                )}
              >
                <Grid spacing={2} container>
                  <Grid item xs={12}>
                    <InputFormItem
                      name="name"
                      label={i18n(
                        'entities.news.fields.name',
                      )}
                      variant="standard"
                      required={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <HtmlEditorFormItem
                      name="body"
                      label={i18n(
                        'entities.news.fields.body',
                      )}
                      value={initialValues.body}
                      required={true}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <CheckboxFormItem
                      name="activated"
                      label={i18n(
                        'entities.news.fields.activated',
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <CheckboxFormItem
                      name="pdf"
                      label={i18n(
                        'entities.news.fields.pdf',
                      )}
                    />
                  </Grid>
                </Grid>
              </FieldSetViewItem>
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

export default NewsForm;
