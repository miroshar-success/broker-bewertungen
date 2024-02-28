import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { FormButtons } from 'src/view/shared/styles/FormWrapper';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRouteMatch } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/brokerPost/home/brokerPostHomeActions';
import brokerPostFormActions from 'src/modules/brokerPost/form/brokerPostFormActions';
import brokerPostFormSelectors from 'src/modules/brokerPost/form/brokerPostFormSelectors';
import brokerPostSelectors from 'src/modules/brokerPost/brokerPostSelectors';
import BugReportIcon from '@mui/icons-material/BugReport';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import HtmlView from 'src/view/shared/view/HtmlView';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import Pagination from 'src/view/shared/table/Pagination';
import postDestroyActions from 'src/modules/brokerPost/destroy/brokerPostDestroyActions';
import postReviewActions from 'src/modules/brokerPost/review/brokerPostReviewActions';
import postSpamActions from 'src/modules/brokerPost/spam/brokerPostSpamActions';
import RatingFormItem from 'src/view/shared/form/items/RatingFormItem';
import RatingViewItem from 'src/view/shared/view/RatingViewItem';
import ReCaptchaV2FormItem from 'src/view/shared/form/items/ReCaptchaV2FormItem';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SaveIcon from '@mui/icons-material/Save';
import selectors from 'src/modules/brokerPost/home/brokerPostHomeSelectors';
import Spinner from 'src/view/shared/Spinner';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import lColors from 'src/mui/assets/theme/base/colors';
import dColors from 'src/mui/assets/theme-dark/base/colors';
import formActions from 'src/modules/form/formActions';
import LazyLoad from 'react-lazy-load';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';

const schema = yup.object().shape({
  name: yupFormSchemas.string(i18n('common.name'), {
    required: true,
    min: 1,
    max: 255,
  }),
  email: yupFormSchemas.email(i18n('common.email'), {
    required: true,
  }),
  review: yupFormSchemas.string(i18n('common.review'), {
    required: true,
  }),
  rating: yupFormSchemas.integer(i18n('common.rating'), {}),
  recaptcha: yupFormSchemas.string(
    i18n('common.recaptcha'),
    { required: true },
  ),
});

const BrokerPostPage = ({ brokerId, name, middle }) => {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const colors = darkMode ? dColors : lColors;
  const [dispatched, setDispatched] = useState(false);
  const [idToDestroy, setIdToDestroy] = useState(null);
  const [idToSpam, setIdToSpam] = useState(null);
  const [idToReview, setIdToReview] = useState(null);
  const [initialValues] = useState({
    name: '',
    email: '',
    rating: 0,
    review: '',
    recaptcha: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const match = useRouteMatch();

  const dispatch = useDispatch();
  const saveLoading = useSelector(
    brokerPostFormSelectors.selectSaveLoading,
  );
  const loading = useSelector(selectors.selectLoading);
  const hasRows = useSelector(selectors.selectHasRows);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasPermissionToCreate = useSelector(
    brokerPostSelectors.selectPermissionToCreate,
  );
  const hasPermissionToEdit = useSelector(
    brokerPostSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    brokerPostSelectors.selectPermissionToDestroy,
  );

  const recaptchaRef = useRef(null);

  const onSubmit = (values) => {
    values.broker_id = brokerId;
    dispatch(
      brokerPostFormActions.doCreate(values, name, () => {
        Object.keys(initialValues).forEach((key) => {
          form.register({ name: key });
          form.setValue(key, initialValues[key]);
        });
        dispatch(formActions.doRefresh());
      }),
    );
    recaptchaRef?.current?.reset();
    form.setValue('recaptcha', '', {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doOpenDestroyConfirmModal = (id) => {
    setIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setIdToDestroy(null);
  };

  const doOpenSpamConfirmModal = (id) => {
    setIdToSpam(id);
  };

  const doCloseSpamConfirmModal = () => {
    setIdToSpam(null);
  };

  const doOpenReviewConfirmModal = (id) => {
    setIdToReview(id);
  };

  const doCloseReviewConfirmModal = () => {
    setIdToReview(null);
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(postDestroyActions.doDestroy(id, match.url));
    setDispatched(!dispatched);
  };

  const doSpam = (id) => {
    doCloseSpamConfirmModal();
    dispatch(postSpamActions.doSpam(id, match.url));
    setDispatched(!dispatched);
  };

  const doReview = (id) => {
    doCloseReviewConfirmModal();
    dispatch(postReviewActions.doReview(id, match.url));
    setDispatched(!dispatched);
  };

  useEffect(() => {
    dispatch(
      actions.doFetch({
        spam: false,
        review_required: false,
        deleted: false,
        broker: brokerId,
      }),
    );
  }, [dispatched]);

  return (
    <>
      <MDTypography
        id="list-top-4-pagination"
        variant="h2"
        pb={3}
      >
        {`${name} Erfahrungen von Tradern`}
      </MDTypography>
      <MDBox
        display="flex"
        flexDirection="column"
        position="relative"
        color="text"
      >
        {hasRows &&
          rows.map((post, idx, arr) => (
            // <LazyLoad key={post.id}>
            <MDBox
              key={post.id}
              py={2}
              borderTop={`1px dashed ${colors.inputBorderColor}`}
            >
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems={{
                  md: 'center',
                  xs: 'flex-start',
                }}
              >
                <MDBox>
                  <MDTypography
                    variant="h4"
                    color="warning"
                    fontSize={{
                      lg: '1.25rem',
                      xs: '1rem',
                    }}
                  >
                    {`${name} Erfahrungen von: ${post.name}`}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    color="info"
                    fontWeight="bold"
                  >
                    {`Verfasst am: ${moment(
                      post.modified,
                    ).format(
                      DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                    )}`}
                  </MDTypography>
                </MDBox>
                <MDBox
                  display="inline-flex"
                  flexWrap="wrap"
                  justifyContent="flex-end"
                  lineHeight={0}
                  gap={1}
                >
                  <RatingViewItem
                    value={post.rating}
                    precision={0.1}
                    emptyIcon={
                      <img
                        src="/images/star-grey.png"
                        height="24px"
                        alt="star-grey"
                      />
                    }
                    icon={
                      <img
                        src="/images/star-fill.png"
                        height="24px"
                        alt="star-fill"
                      />
                    }
                  />
                  <MDBox>
                    {hasPermissionToEdit && (
                      <Tooltip
                        title={i18n('common.review')}
                      >
                        <IconButton
                          size="small"
                          color={sidenavColor}
                          onClick={() =>
                            doOpenReviewConfirmModal(
                              post.id,
                            )
                          }
                        >
                          <ReviewsIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {hasPermissionToDestroy && (
                      <Tooltip
                        title={i18n('common.destroy')}
                      >
                        <IconButton
                          size="small"
                          color={sidenavColor}
                          onClick={() =>
                            doOpenDestroyConfirmModal(
                              post.id,
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {!Boolean(post.parent_id) &&
                      hasPermissionToCreate && (
                        <Tooltip
                          title={i18n(
                            'common.writeComment',
                          )}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            component={Link}
                            to={`/admin/broker-post/new/${post.id}`}
                          >
                            <EmailIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    {hasPermissionToEdit && (
                      <>
                        <Tooltip
                          title={i18n('common.edit')}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            component={Link}
                            to={`/admin/broker-post/${post.id}/edit`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          title={i18n('common.spam')}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            onClick={() =>
                              doOpenSpamConfirmModal(
                                post.id,
                              )
                            }
                          >
                            <BugReportIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </MDBox>
                </MDBox>
              </MDBox>
              <MDBox
                color="text"
                fontSize="1rem"
                fontWeight="regular"
                pt={1}
              >
                <HtmlView value={post.review} />
              </MDBox>
              {post.children && post.children.length > 0 && (
                <MDBox
                  sx={{
                    '& > * + *': {
                      mt: 2,
                    },
                  }}
                >
                  {post.children.map((subPost) => (
                    <FieldSetViewItem key={subPost.id}>
                      <MDBox
                        mb={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <MDTypography
                          variant="body1"
                          fontWeight="regular"
                        >
                          Kommentar von: {subPost.name}
                        </MDTypography>
                        <MDBox>
                          {hasPermissionToDestroy && (
                            <Tooltip
                              title={i18n('common.destroy')}
                            >
                              <IconButton
                                size="small"
                                color={sidenavColor}
                                onClick={() =>
                                  doOpenDestroyConfirmModal(
                                    subPost.id,
                                  )
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {hasPermissionToEdit && (
                            <Tooltip
                              title={i18n('common.edit')}
                            >
                              <IconButton
                                size="small"
                                color={sidenavColor}
                                component={Link}
                                to={`/admin/broker-post/${subPost.id}/edit`}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </MDBox>
                      </MDBox>
                      <MDBox>
                        <HtmlView value={subPost.review} />
                      </MDBox>
                    </FieldSetViewItem>
                  ))}
                </MDBox>
              )}
              {idx + 1 ===
                Number((arr.length / 2).toFixed(0)) && (
                <MDBox
                  mt={2}
                  pb={1}
                  borderTop={`1px dashed ${colors.inputBorderColor}`}
                >
                  {middle}
                </MDBox>
              )}
            </MDBox>
            // </LazyLoad>
          ))}
        {!loading && !hasRows && (
          <MDTypography
            variant="body2"
            fontWeight="regular"
            mb={2}
          >
            {i18n('common.noReviews', name)}
          </MDTypography>
        )}
        {loading && (
          <MDBox
            position="absolute"
            left="0"
            right="0"
            top="0"
          >
            <Spinner />
          </MDBox>
        )}
      </MDBox>

      {!loading && hasRows && (
        <MDBox
          borderTop={`1px dashed ${colors.inputBorderColor}`}
          py={2}
        >
          <Pagination
            onChange={doChangePagination}
            disabled={loading}
            pagination={pagination}
            noPadding
            entriesPerPage
            showTotalEntries
          />
        </MDBox>
      )}

      <MDBox
        pb={2}
        borderTop={`1px dashed ${colors.inputBorderColor}`}
      >
        <MDTypography display="block" variant="h3" my={2}>
          {i18n('entities.home.top_brokers')}
        </MDTypography>
        <TopBrokersView />
      </MDBox>

      <MDBox
        pt={2}
        borderTop={`1px dashed ${colors.inputBorderColor}`}
      >
        <MDTypography
          variant="body1"
          fontWeight="bold"
          pb={2}
        >
          {i18n('common.writeReview')}
        </MDTypography>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Grid spacing={2} container>
              <Grid item md={6} xs={12}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                >
                  {i18n('common.name')} *
                </MDTypography>
                <InputFormItem
                  name="name"
                  variant="standard"
                  label={i18n('common.name')}
                  required={true}
                  hideLabel
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                >
                  {i18n('common.email')} *
                </MDTypography>
                <InputFormItem
                  name="email"
                  variant="standard"
                  label={i18n('common.email')}
                  required={true}
                  hideLabel
                />
              </Grid>
              <Grid item xs={12}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                >
                  {i18n('common.rating')}
                </MDTypography>
                <RatingFormItem
                  color={sidenavColor}
                  name="rating"
                  emptyIcon={
                    <img src="/images/star-grey.png" />
                  }
                  icon={<img src="/images/star-fill.png" />}
                  label={i18n('common.rating')}
                  hideLabel
                />
              </Grid>
              <Grid item xs={12}>
                <MDTypography
                  variant="body2"
                  fontWeight="regular"
                >
                  {i18n('common.review')} *
                </MDTypography>
                <HtmlEditorFormItem
                  name="review"
                  required={true}
                  label={i18n('common.review')}
                  toolbars={[
                    {
                      name: 'basicstyles',
                      groups: ['basicstyles'],
                    },
                    {
                      name: 'paragraph',
                      groups: ['list'],
                    },
                    { name: 'colors' },
                  ]}
                  hideLabel
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <ReCaptchaV2FormItem
                  recaptchaRef={recaptchaRef}
                />
              </Grid>
            </Grid>
            <FormButtons>
              <MDButton
                variant="gradient"
                color={sidenavColor}
                disabled={saveLoading}
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                startIcon={<SaveIcon />}
                size="small"
              >
                Erfahrungsbericht speichern
              </MDButton>
            </FormButtons>
          </form>
        </FormProvider>
      </MDBox>

      {idToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(idToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {idToSpam && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doSpam(idToSpam)}
          onClose={() => doCloseSpamConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {idToReview && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doReview(idToReview)}
          onClose={() => doCloseReviewConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
};

export default BrokerPostPage;
