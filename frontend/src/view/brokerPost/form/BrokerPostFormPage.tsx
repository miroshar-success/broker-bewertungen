import { Card } from '@mui/material';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/brokerPost/form/brokerPostFormActions';
import BrokerPostEditForm from 'src/view/brokerPost/form/BrokerPostEditForm';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/brokerPost/form/brokerPostFormSelectors';
import Spinner from 'src/view/shared/Spinner';
import BrokerPostNewForm from 'src/view/brokerPost/form/BrokerPostNewForm';

function BrokerPostFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = /\/admin\/broker-post\/\d+\/edit/.test(
    match.url,
  );
  const title = isEditing
    ? i18n('entities.brokerPost.edit.title')
    : i18n('entities.brokerPost.new.title');

  useEffect(() => {
    if (isEditing) {
      dispatch(actions.doInit(match.params.id));
    }
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
          {initLoading && <Spinner />}

          {dispatched && !initLoading && (
            <MDBox p={3}>
              {isEditing ? (
                <BrokerPostEditForm
                  saveLoading={saveLoading}
                  initLoading={initLoading}
                  record={record}
                  onSubmit={doSubmit}
                  onCancel={() =>
                    getHistory().push('/admin/broker-post')
                  }
                />
              ) : (
                <BrokerPostNewForm
                  saveLoading={saveLoading}
                  initLoading={initLoading}
                  record={record}
                  onSubmit={doSubmit}
                  onCancel={() =>
                    getHistory().push('/admin/broker-post')
                  }
                  postId={match.params.id}
                />
              )}
            </MDBox>
          )}
        </MDBox>
      </Card>
    </>
  );
}

export default BrokerPostFormPage;
