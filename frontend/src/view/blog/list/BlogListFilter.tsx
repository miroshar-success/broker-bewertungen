import {
  AccordionDetails,
  AccordionSummary,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UndoIcon from '@mui/icons-material/Undo';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/blog/list/blogListActions';
import selectors from 'src/modules/blog/list/blogListSelectors';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import InputNumberRangeFormItem from 'src/view/shared/form/items/InputNumberRangeFormItem';
import BlogAutocompleteFormItem from 'src/view/blog/autocomplete/BlogAutocompleteFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import { filterBooleanOptions } from 'src/modules/utils';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import NavigationAutocompleteFormItem from 'src/view/navigation/autocomplete/NavigationAutocompleteFormItem';
import AuthorAutocompleteFormItem from 'src/view/author/autocomplete/AuthorAutocompleteFormItem';
import formActions from 'src/modules/form/formActions';

const schema = yup.object().shape({
  idRange: yupFilterSchemas.integerRange(
    i18n('entities.blog.fields.idRange'),
  ),
  link: yupFilterSchemas.string(
    i18n('entities.blog.fields.link'),
  ),
  pagetitle: yupFilterSchemas.string(
    i18n('entities.blog.fields.pagetitle'),
  ),
  metakeywords: yupFilterSchemas.string(
    i18n('entities.blog.fields.metakeywords'),
  ),
  metadescription: yupFilterSchemas.string(
    i18n('entities.blog.fields.metadescription'),
  ),
  name: yupFilterSchemas.string(
    i18n('entities.blog.fields.name'),
  ),
  activated: yupFilterSchemas.boolean(
    i18n('entities.blog.fields.activated'),
  ),
});

const emptyValues = {
  idRange: [],
  name: null,
  author: null,
  pagetitle: null,
  link: null,
  metakeywords: null,
  metadescription: null,
  activated: null,
};

const previewRenders = {
  idRange: {
    label: i18n('entities.blog.fields.idRange'),
    render: filterRenders.decimalRange(),
  },
  link: {
    label: i18n('entities.blog.fields.link'),
    render: filterRenders.generic(),
  },
  pagetitle: {
    label: i18n('entities.blog.fields.pagetitle'),
    render: filterRenders.generic(),
  },
  metakeywords: {
    label: i18n('entities.blog.fields.metakeywords'),
    render: filterRenders.generic(),
  },
  metadescription: {
    label: i18n('entities.blog.fields.metadescription'),
    render: filterRenders.generic(),
  },
  name: {
    label: i18n('entities.blog.fields.name'),
    render: filterRenders.generic(),
  },
  activated: {
    label: i18n('entities.blog.fields.activated'),
    render: filterRenders.boolean(),
  },
  author: {
    label: i18n('entities.blog.fields.author'),
    render: filterRenders.relationToOne(),
  },
};

function BlogListFilter(props) {
  const { sidenavColor } = selectMuiSettings();
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        initialValues,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues, false));
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
    dispatch(formActions.doRefresh());
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  return (
    <FilterWrapper>
      <FilterAccordion
        expanded={expanded}
        onChange={(event, isExpanded) =>
          setExpanded(isExpanded)
        }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="secondary" />}
        >
          <FilterPreview
            values={rawFilter}
            renders={previewRenders}
            expanded={expanded}
            onRemove={onRemove}
          />
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <InputNumberRangeFormItem
                    name="idRange"
                    label={i18n(
                      'entities.blog.fields.idRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="name"
                    label={i18n(
                      'entities.blog.fields.name',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="link"
                    label={i18n(
                      'entities.blog.fields.link',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="metakeywords"
                    label={i18n(
                      'entities.blog.fields.metakeywords',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="metadescription"
                    label={i18n(
                      'entities.blog.fields.metadescription',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputFormItem
                    name="pagetitle"
                    label={i18n(
                      'entities.blog.fields.pagetitle',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <AuthorAutocompleteFormItem
                    name="author"
                    label={i18n(
                      'entities.blog.fields.author',
                    )}
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <SelectFormItem
                    name="activated"
                    label={i18n(
                      'entities.blog.fields.activated',
                    )}
                    options={filterBooleanOptions}
                    variant="standard"
                  />
                </Grid>
              </Grid>

              <FilterButtons>
                <MDButton
                  variant="gradient"
                  color={sidenavColor}
                  type="submit"
                  disabled={props.loading}
                  startIcon={<SearchIcon />}
                  size="small"
                >
                  {i18n('common.search')}
                </MDButton>

                <MDButton
                  variant="outlined"
                  color={sidenavColor}
                  type="button"
                  onClick={onReset}
                  disabled={props.loading}
                  startIcon={<UndoIcon />}
                  size="small"
                >
                  {i18n('common.reset')}
                </MDButton>
              </FilterButtons>
            </form>
          </FormProvider>
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default BlogListFilter;
