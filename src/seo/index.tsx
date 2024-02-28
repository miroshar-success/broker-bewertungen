import AuthorService from '../services/authorService';
import BlogDetailPage from './home/blog/BlogDetailPage';
import BlogListPage from './home/blog/BlogListPage';
import BlogService from '../services/blogService';
import BrokerArticleService from '../services/brokerArticleService';
import BrokerComparePage from './home/broker/BrokerComparisonPage';
import BrokerService from '../services/brokerService';
import BrokerViewPage from './home/broker/BrokerViewPage';
import CategoryService from '../services/categoryService';
import ComparisonPage from './home/broker/ComparisonPage';
import Contact from './home/Contact';
import GeneralPage from './home/GeneralPage';
import HomeViewPage from './home/HomeViewPage';
import isbot from 'isbot';
import NavigationService from '../services/navigationService';
import PageService from '../services/pageService';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const renderToString = (children) =>
  `<!DOCTYPE html>${ReactDOMServer.renderToString(
    children,
  )}`;

export const handleSEO = async (req, res) => {
  if (!isbot(req.get('user-agent'))) {
    return false;
  }

  const { rows: topBrokers } = await new BrokerService(
    req,
  ).findAndCountAll({
    filter: {
      activated: true,
      top_broker: true,
    },
    orderBy: 'broker_rating.overall_rating_desc',
  });

  const navigationItems = await new NavigationService(
    req,
  ).findForHome();

  const author = await new AuthorService(req).first();

  const url = req.url.replace(/\/$/, '');

  const props = {
    navigationItems,
    topBrokers,
    url,
    author,
    brokers: [],
    categories: [],
  };

  if (url === '') {
    return res.send(
      renderToString(<HomeViewPage {...props} url="/" />),
    );
  } else if (url === '/kontakt') {
    return res.send(renderToString(<Contact {...props} />));
  } else if (url === '/broker-vergleich') {
    const category = await new CategoryService(
      req,
    ).findByURL(url);
    return res.send(
      renderToString(
        <ComparisonPage category={category} {...props} />,
      ),
    );
  } else if (/^\/forex-cfd-broker-vergleich\//.test(url)) {
    const extracts =
      /^\/forex-cfd-broker-vergleich\/([\w-]+)-versus-([\w-]+)$/.exec(
        url,
      );
    const [, valueA, valueB] = extracts || [];
    const brokerA =
      valueA ??
      (topBrokers && topBrokers[0]?.name_normalized);
    const brokerB =
      valueB ??
      (topBrokers && topBrokers[1]?.name_normalized);
    const recordA = await new BrokerService(req).findByURL(
      brokerA,
    );
    const recordB = await new BrokerService(req).findByURL(
      brokerB,
    );
    return res.send(
      renderToString(
        <BrokerComparePage
          recordA={recordA}
          recordB={recordB}
          {...props}
        />,
      ),
    );
  } else if (req.url === '/blog') {
    const { rows: blogs } = await new BlogService(
      req,
    ).findBlogList({ limit: 10 });
    return res.send(
      renderToString(
        <BlogListPage records={blogs} {...props} />,
      ),
    );
  } else if (/^\/blog\//.test(url)) {
    const blog = await new BlogService(req).findByURL(url);
    return res.send(
      renderToString(
        <BlogDetailPage record={blog} {...props} />,
      ),
    );
  } else if (/^\/erfahrungsberichte\//.test(url)) {
    const broker = await new BrokerService(req).findByURL(
      url.replace(/^\/erfahrungsberichte\//g, ''),
    );
    return res.send(
      renderToString(
        <BrokerViewPage record={broker} {...props} />,
      ),
    );
  } else {
    let category = await new CategoryService(req).findByURL(
      url,
    );
    if (category) {
      props.brokers = (
        await new BrokerService(req).findAndCountAll({
          filter: {
            activated: true,
            category: category.id,
          },
        })
      ).rows;
      props.categories = (
        await new CategoryService(req).findAndCountAll({
          filter: {
            activated: true,
            show_in_navigation: true,
          },
          orderBy: 'sort_asc',
        })
      ).rows;
    }
    let page = category
      ? null
      : await new PageService(req).findByURL(url);
    let brokerArticle =
      category || page
        ? null
        : await new BrokerArticleService(req).findByURL(
            url,
          );
    if (category || page || brokerArticle) {
      return res.send(
        renderToString(
          <GeneralPage
            category={category}
            page={page}
            brokerArticle={brokerArticle}
            {...props}
          />,
        ),
      );
    }
  }

  return false;
};
