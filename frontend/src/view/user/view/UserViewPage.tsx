import { Card } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/view/userViewActions';
import selectors from 'src/modules/user/view/userViewSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import UserView from 'src/view/user/view/UserView';
import UserViewToolbar from 'src/view/user/view/UserViewToolbar';

function UserViewPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const user = useSelector(selectors.selectUser);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Card>
        <MDBox px={3} pt={3}>
          <MDBox
            pb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3" mb={3}>
              {i18n('user.view.title')}
            </MDTypography>
            <UserViewToolbar match={match} />
          </MDBox>
          <UserView loading={loading} user={user} />
        </MDBox>
      </Card>
    </>
  );
}

export default UserViewPage;
