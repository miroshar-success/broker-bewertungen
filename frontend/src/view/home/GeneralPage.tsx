import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import brokerArticleHomeSelectors from 'src/modules/brokerArticle/home/brokerArticleHomeSelectors';
import BrokerArticlePage from 'src/view/home/BrokerArticlePage';
import categoryHomeActions from 'src/modules/category/home/categoryHomeActions';
import categoryHomeSelectors from 'src/modules/category/home/categoryHomeSelectors';
import CategoryPage from 'src/view/home/CategoryPage';
import Layout from 'src/view/home/Layout';
import moment from 'moment';
import NormalPage from 'src/view/home/NormalPage';
import pageHomeSelectors from 'src/modules/page/home/pageHomeSelectors';
import ScrollTo from 'src/ScrollTo';
import Spinner from 'src/view/shared/Spinner';
import urlParse from 'url-parse';

const GeneralPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loadingCategory = useSelector(
    categoryHomeSelectors.selectLoading,
  );
  const category = useSelector(
    categoryHomeSelectors.selectRecord,
  );

  const loadingPage = useSelector(
    pageHomeSelectors.selectLoading,
  );
  const page = useSelector(pageHomeSelectors.selectRecord);

  const loadingArticle = useSelector(
    brokerArticleHomeSelectors.selectLoading,
  );
  const brokerArticle = useSelector(
    brokerArticleHomeSelectors.selectRecord,
  );

  const loading =
    loadingCategory || loadingPage || loadingArticle;

  useEffect(() => {
    dispatch(categoryHomeActions.doFind(match.url));
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

  let title = '';
  let keywords = [];
  let description = '';

  if (dispatched && !loading) {
    if (category) {
      title = `${
        category.name
      } Vergleich ${moment().year()} » 100% unabhängiger Test`;
      keywords = [category.name, 'Vergleich', 'Test'];
      description = `100% unabhängiger ${
        category.name
      } Vergleich ✚✚ Über ${category.count ?? 0} ${
        category.name
      } im Test mit Erfahrungsberichten von Tradern ➔ Jetzt lesen!`;
    }

    if (!category && page) {
      title = page.title;
      keywords = [page.meta_keywords];
      description = page.meta_description;
    }

    if (!category && !page && brokerArticle) {
      title = brokerArticle.pagetitle;
      keywords = [brokerArticle.metakeywords];
      description = brokerArticle.metadescription;
    }
  }

  return (
    <>
      <Layout
        title={title}
        keywords={keywords}
        description={description}
      >
        {loading && <Spinner />}
        {dispatched && !loading && category && (
          <CategoryPage category={category} />
        )}
        {dispatched && !loading && !category && page && (
          <NormalPage page={page} />
        )}
        {dispatched &&
          !loading &&
          !category &&
          !page &&
          brokerArticle && (
            <BrokerArticlePage
              brokerArticle={brokerArticle}
            />
          )}
      </Layout>
    </>
  );
};

export default GeneralPage;
