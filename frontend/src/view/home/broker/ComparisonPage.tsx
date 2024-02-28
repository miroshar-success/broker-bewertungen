import { HtmlViewWrapper } from 'src/view/shared/view/HtmlView';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Breadcrumb from 'src/view/home/Breadcrumb';
import BrokerListTable from 'src/view/home/broker/BrokerListTable';
import categoryHomeActions from 'src/modules/category/home/categoryHomeActions';
import categoryHomeSelectors from 'src/modules/category/home/categoryHomeSelectors';
import Layout from 'src/view/home/Layout';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import PageContent from 'src/view/shared/view/PageContent';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import Spinner from 'src/view/shared/Spinner';
import authorHomeSelectors from 'src/modules/author/home/authorHomeSelectors';
import authorHomeActions from 'src/modules/author/home/authorHomeActions';
import AuthorView from 'src/view/shared/view/AuthorView';
import MDBox from 'src/mui/components/MDBox';
import DefaultCategoryDescription from 'src/view/home/DefaultCategoryDescription';
import DashBorder from 'src/view/home/shared/DashBorder';

const ComparisonPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loading = useSelector(
    categoryHomeSelectors.selectLoading,
  );
  const category = useSelector(
    categoryHomeSelectors.selectRecord,
  );

  const authorLoading = useSelector(
    authorHomeSelectors.selectLoading,
  );
  const author = useSelector(
    authorHomeSelectors.selectRecord,
  );

  useEffect(() => {
    dispatch(categoryHomeActions.doFind(match.url));
    dispatch(authorHomeActions.doFind());
    setDispatched(true);
  }, [match.url]);

  return (
    <Layout
      title={`Broker Vergleich ${moment().year()} » 100% unabhängiger Test`}
      keywords={[
        'broker bewertung',
        'broker erfahrungen',
        'broker bewertungen',
      ]}
      description={`100% unabhängiger Broker Vergleich ✚✚ Über ${
        category?.count ?? 0
      } Broker Vergleich im Test mit Erfahrungsberichten von Tradern ➔ Jetzt lesen!`}
    >
      <MDBox display="flex" flexDirection="column" gap={2}>
        {loading && <Spinner />}
        {dispatched && !loading && category && (
          <PageContent>
            <Breadcrumb
              items={[
                {
                  name: 'Online Broker Vergleich',
                  route: '/broker-vergleich',
                },
              ]}
            />
            <MDTypography variant="h1" pb={2}>
              Broker Vergleich
            </MDTypography>
            <HtmlViewWrapper>
              <p>
                {i18n(
                  'entities.broker.text.broker_comparison_teaser',
                )}
              </p>
            </HtmlViewWrapper>
            <DashBorder
              my={2}
              pb={2}
              borderTop
              borderBottom
            >
              <MDTypography
                display="block"
                variant="h3"
                my={2}
              >
                {i18n('entities.home.top_brokers')}
              </MDTypography>
              <TopBrokersView />
            </DashBorder>
            <BrokerListTable category={0} />
            <DefaultCategoryDescription />
          </PageContent>
        )}
        {dispatched && !authorLoading && author && (
          <AuthorView value={author} />
        )}
      </MDBox>
    </Layout>
  );
};

export default ComparisonPage;
