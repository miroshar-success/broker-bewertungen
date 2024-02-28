import React from 'react';
import Meta from './Meta';
import PropTypes from 'prop-types';

function Layout({
  title,
  keywords,
  description,
  author,
  children,
  url = '',
  noIndex = false,
  noArticle = false,
}) {
  return (
    <>
      <html lang="de">
        <head>
          <Meta
            title={title}
            keywords={keywords}
            description={description}
            author={author}
            url={url}
            noIndex={noIndex}
            noArticle={noArticle}
          />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  author: PropTypes.any,
  children: PropTypes.any,
  url: PropTypes.string,
  noIndex: PropTypes.bool,
  noArticle: PropTypes.bool,
};

export default Layout;
