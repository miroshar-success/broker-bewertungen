import { i18n } from 'src/i18n';
import BrokerArticleListFilter from 'src/view/brokerArticle/list/BrokerArticleListFilter';
import BrokerArticleListTable from 'src/view/brokerArticle/list/BrokerArticleListTable';
import BrokerArticleListToolbar from 'src/view/brokerArticle/list/BrokerArticleListToolbar';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/brokerArticle/list/brokerArticleListActions';
import selectors from 'src/modules/brokerArticle/list/brokerArticleListSelectors';

function BrokerArticleListPage(props) {
  const rawFilter = useSelector(selectors.selectRawFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.doFetch(
        {
          broker: props.broker || 0,
        },
        rawFilter,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <MDTypography variant="h5" color="text">
          {i18n('entities.brokerArticle.list.title')}
        </MDTypography>
        <BrokerArticleListToolbar {...props} />
      </MDBox>
      {/* <BrokerArticleListFilter {...props} /> */}
      <BrokerArticleListTable {...props} />
    </>
  );
}

export default BrokerArticleListPage;
