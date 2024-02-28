import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AuthorView from 'src/view/shared/view/AuthorView';
import blogFindActions from 'src/modules/blog/find/blogFindActions';
import blogFindSelectors from 'src/modules/blog/find/blogFindSelectors';
import CommentPage from 'src/view/home/blog/CommentPage';
import HtmlView from 'src/view/shared/view/HtmlView';
import Layout from 'src/view/home/Layout';
import MDBox from 'src/mui/components/MDBox';
import PageContent from 'src/view/shared/view/PageContent';
import Spinner from 'src/view/shared/Spinner';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import Breadcrumb from 'src/view/home/Breadcrumb';
import urlParse from 'url-parse';
import ScrollTo from 'src/ScrollTo';
import MDTypography from 'src/mui/components/MDTypography';

const BlogDetailPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loading = useSelector(
    blogFindSelectors.selectLoading,
  );

  const record = useSelector(
    blogFindSelectors.selectRecord,
  );

  useEffect(() => {
    dispatch(blogFindActions.doFind(match.url));
    setDispatched(true);
    const handleOnClickA = (evt) => {
      if (evt.target.tagName.toLowerCase() === 'a') {
        const parsedUrl = urlParse(evt.target.href);
        if (
          parsedUrl.pathname === match.url &&
          parsedUrl.hash !== ''
        ) {
          evt.preventDefault();
          evt.stopPropagation();
          evt.stopImmediatePropagation();
          ScrollTo(
            decodeURI(
              parsedUrl.hash
                .substring(1)
                .replace(/\%\%/g, '%25%'),
            ),
          );
        }
      }
    };
    window.addEventListener('click', handleOnClickA);
    return () =>
      window.removeEventListener('click', handleOnClickA);
  }, [match.url]);

  return (
    <>
      <Layout
        title={record?.name}
        keywords={[record?.metakeywords]}
        description={record?.metadescription}
      >
        {loading && <Spinner />}
        {dispatched && !loading && record && (
          <MDBox
            display="flex"
            flexDirection="column"
            sx={{
              '& > * + *': {
                mt: 2,
              },
            }}
          >
            <PageContent>
              <Breadcrumb
                items={[
                  {
                    name: 'Broker Blog',
                    route: '/blog',
                  },
                  {
                    name: record.name,
                    route: `/blog/${record.name_normalized}`,
                  },
                ]}
              />
              <HtmlView value={record.content} />
              <CommentPage record={record} />
            </PageContent>
            <AuthorView value={record.author} />
            <PageContent
              display={{
                xs: 'none',
                lg: 'block',
              }}
            >
              <MDTypography
                display="block"
                variant="h3"
                mb={2}
              >
                {i18n('entities.home.top_brokers')}
              </MDTypography>
              <TopBrokersView />
            </PageContent>
          </MDBox>
        )}
      </Layout>
    </>
  );
};

export default BlogDetailPage;
