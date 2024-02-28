import BrokerArticlePage from './BrokerArticlePage';
import CategoryPage from './CategoryPage';
import Layout from './Layout';
import moment from 'moment';
import NormalPage from './NormalPage';
import React from 'react';

const GeneralPage = ({
  category,
  page,
  brokerArticle,
  ...props
}) => {
  let title = '';
  let keywords: any[] = [];
  let description = '';

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

  return (
    <Layout
      title={title}
      keywords={keywords}
      description={description}
    >
      {category && (
        <CategoryPage category={category} {...props} />
      )}
      {!category && page && (
        <NormalPage page={page} {...props} />
      )}
      {!category && !page && brokerArticle && (
        <BrokerArticlePage
          brokerArticle={brokerArticle}
          {...props}
        />
      )}
    </Layout>
  );
};

export default GeneralPage;
