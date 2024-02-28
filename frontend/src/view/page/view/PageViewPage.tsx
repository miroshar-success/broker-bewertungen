import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/page/view/pageViewActions';
import selectors from 'src/modules/page/view/pageViewSelectors';
import PageView from 'src/view/page/view/PageView';
import PageViewToolbar from 'src/view/page/view/PageViewToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PagePage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Card>
        <MDBox py={3} px={3}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {i18n('entities.generalPage.view.title')}
            </MDTypography>
            <PageViewToolbar match={match} />
          </MDBox>
          <MDBox p={3}>
            <PageView loading={loading} record={record} />
          </MDBox>
        </MDBox>
      </Card>
    </>
  );
}

export default PagePage;
