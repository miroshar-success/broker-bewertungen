import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/broker/form/brokerFormActions';
import selectors from 'src/modules/broker/form/brokerFormSelectors';
import { getHistory } from 'src/modules/store';
import BrokerForm from 'src/view/broker/form/BrokerForm';
import Spinner from 'src/view/shared/Spinner';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import LazyLoad from 'react-lazy-load';

function BrokerFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const [contentLoading, setContentLoading] =
    useState(true);
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);
  const title = isEditing
    ? i18n('entities.broker.edit.title')
    : i18n('entities.broker.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  return (
    <>
      <Card>
        <MDBox py={3} px={3}>
          <MDBox
            pb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {title}
            </MDTypography>
          </MDBox>
          {(initLoading || contentLoading) && (
            <MDBox display="block" pt={3}>
              <Spinner />
              <MDTypography
                display="block"
                variant="button"
                fontWeight="regular"
                textAlign="center"
              >
                {initLoading
                  ? 'Loading Data...'
                  : 'Loading Data is completed.'}
                <br />
                {contentLoading
                  ? 'Preparing UI...'
                  : 'Preparing UI is completed.'}
              </MDTypography>
            </MDBox>
          )}

          {dispatched && !initLoading && (
            <MDBox p={3} pt={0}>
              <LazyLoad
                onContentVisible={() => {
                  setContentLoading(false);
                }}
              >
                <BrokerForm
                  saveLoading={saveLoading}
                  initLoading={initLoading}
                  record={record}
                  isEditing={isEditing}
                  onSubmit={doSubmit}
                  onCancel={() =>
                    getHistory().push('/admin/broker')
                  }
                />
              </LazyLoad>
            </MDBox>
          )}
        </MDBox>
      </Card>
    </>
  );
}

export default BrokerFormPage;
