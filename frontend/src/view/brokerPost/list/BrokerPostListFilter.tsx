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
import actions from 'src/modules/brokerPost/list/brokerPostListActions';
import selectors from 'src/modules/brokerPost/list/brokerPostListSelectors';
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
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import { filterBooleanOptions } from 'src/modules/utils';
import formActions from 'src/modules/form/formActions';

const schema = yup.object().shape({
  idRange: yupFilterSchemas.integerRange(
    i18n('entities.brokerPost.fields.idRange'),
  ),
  name: yupFilterSchemas.string(
    i18n('entities.brokerPost.fields.name'),
  ),
  email: yupFilterSchemas.string(
    i18n('entities.brokerPost.fields.email'),
  ),
  rating: yupFilterSchemas.integer(
    i18n('entities.brokerPost.fields.rating'),
  ),
  deleted: yupFilterSchemas.boolean(
    i18n('entities.brokerPost.fields.deleted'),
  ),
  spam: yupFilterSchemas.boolean(
    i18n('entities.brokerPost.fields.spam'),
  ),
  review_required: yupFilterSchemas.boolean(
    i18n('entities.brokerPost.fields.review_required'),
  ),
});

const emptyValues = {
  idRange: [],
  name: null,
  email: null,
  rating: null,
  deleted: null,
  spam: null,
  review_required: null,
};

const previewRenders = {
  idRange: {
    label: i18n('entities.brokerPost.fields.idRange'),
    render: filterRenders.decimalRange(),
  },
  name: {
    label: i18n('entities.brokerPost.fields.name'),
    render: filterRenders.generic(),
  },
  email: {
    label: i18n('entities.brokerPost.fields.email'),
    render: filterRenders.generic(),
  },
  rating: {
    label: i18n('entities.brokerPost.fields.rating'),
    render: filterRenders.generic(),
  },
  deleted: {
    label: i18n('entities.brokerPost.fields.deleted'),
    render: filterRenders.boolean(),
  },
  spam: {
    label: i18n('entities.brokerPost.fields.spam'),
    render: filterRenders.boolean(),
  },
  review_required: {
    label: i18n(
      'entities.brokerPost.fields.review_required',
    ),
    render: filterRenders.boolean(),
  },
};

function BrokerPostListFilter(props) {
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
                <Grid item lg={6} xs={12}>
                  <InputNumberRangeFormItem
                    name="idRange"
                    label={i18n(
                      'entities.brokerPost.fields.idRange',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="name"
                    label={i18n(
                      'entities.brokerPost.fields.name',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name="email"
                    label={i18n(
                      'entities.brokerPost.fields.email',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <InputNumberFormItem
                    name="rating"
                    label={i18n(
                      'entities.brokerPost.fields.rating',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <SelectFormItem
                    name="deleted"
                    label={i18n(
                      'entities.brokerPost.fields.deleted',
                    )}
                    options={filterBooleanOptions}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <SelectFormItem
                    name="spam"
                    label={i18n(
                      'entities.brokerPost.fields.spam',
                    )}
                    options={filterBooleanOptions}
                    variant="standard"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <SelectFormItem
                    name="review_required"
                    label={i18n(
                      'entities.brokerPost.fields.review_required',
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

export default BrokerPostListFilter;
