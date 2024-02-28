import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import actions from 'src/modules/blog/home/blogHomeActions';
import HtmlView from 'src/view/shared/view/HtmlView';
import Layout from 'src/view/home/Layout';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';
import Pagination from 'src/view/shared/table/Pagination';
import selectors from 'src/modules/blog/home/blogHomeSelectors';
import Spinner from 'src/view/shared/Spinner';
import Breadcrumb from 'src/view/home/Breadcrumb';
import ImageView from 'src/view/home/ImageView';
import LazyLoad from 'react-lazy-load';

const BlogListPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);

  const records = useSelector(selectors.selectRows);

  const pagination = useSelector(
    selectors.selectPagination,
  );

  useEffect(() => {
    dispatch(actions.doFetch());
    setDispatched(true);
  }, [dispatched]);

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  return (
    <Layout title="Broker-Bewertungen Blog">
      <PageContent id="list-top-4-pagination">
        <MDBox display="none">
          <Breadcrumb
            items={[
              {
                name: i18n('entities.blog.title'),
                route: '/blog',
              },
            ]}
          />
        </MDBox>
        <MDTypography variant="h1" pb={5}>
          {i18n('entities.blog.title')}
        </MDTypography>
        {loading && <Spinner />}
        {dispatched && !loading && records && (
          <>
            <MDBox
              display="flex"
              flexDirection="column"
              gap={5}
            >
              {records.map((record) => (
                // <LazyLoad key={record.id}>
                <MDBox
                  key={record.id}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="start"
                  gap={5}
                >
                  {record.blog_image[0]?.downloadUrl && (
                    <ImageView
                      value={record.blog_image}
                      sx={{
                        objectFit: 'contain',
                        width: '150px',
                      }}
                    />
                  )}

                  <MDBox color="text">
                    <MDTypography
                      variant="body1"
                      fontWeight="bold"
                    >
                      <MaterialLink
                        component={Link}
                        to={`/blog/${record.name_normalized}`}
                        underline="hover"
                      >
                        {record.name}
                      </MaterialLink>
                    </MDTypography>
                    <HtmlView value={record.teaser} />
                  </MDBox>
                </MDBox>
                // </LazyLoad>
              ))}
            </MDBox>

            <MDBox mt={2}>
              <Pagination
                onChange={doChangePagination}
                disabled={loading}
                pagination={pagination}
                noPadding
                entriesPerPage
                showTotalEntries
              />
            </MDBox>
          </>
        )}
      </PageContent>
    </Layout>
  );
};

export default BlogListPage;
