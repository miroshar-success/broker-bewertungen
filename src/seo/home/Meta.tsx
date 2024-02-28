import { getConfig } from '../../config';
import PropTypes from 'prop-types';
import React from 'react';

function Meta({
  title,
  keywords,
  description,
  author,
  url,
  noIndex,
  noArticle,
}) {
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=yes"
      />
      <meta
        httpEquiv="Content-Type"
        content="text/html; charset=utf-8"
      />
      <title>
        {[title, getConfig().FRONTEND_HOST]
          .filter(Boolean)
          .join(' | ')}
      </title>
      {Boolean(keywords && keywords.length) && (
        <meta
          name="keywords"
          content={keywords.join(', ')}
        />
      )}
      {Boolean(description) && (
        <meta name="description" content={description} />
      )}
      <meta
        name="google-site-verification"
        content="7VJfY7OIcOlKQG6IpURj9rYJhVsDv6v3D1gTdQSChpw"
      />
      {Boolean(noIndex) && (
        <meta name="robots" content="noindex" />
      )}
      {Boolean(noIndex) && (
        <meta name="googlebot" content="noindex" />
      )}
      {!noIndex && (
        <meta name="robots" content="index,follow" />
      )}
      {Boolean(author) && (
        <link href={author.link} rel="author" />
      )}
      {Boolean(url) && (
        <link
          rel="canonical"
          href={`${getConfig().FRONTEND_URL}${url}`}
        />
      )}
      <link
        rel="stylesheet"
        href={`${
          getConfig().FRONTEND_URL
        }/styles/material-icons/material-icons.css`}
      />
      <link
        rel="stylesheet"
        href={`${
          getConfig().FRONTEND_URL
        }/styles/material-icons/material-icons-outlined.css`}
      />
      <link
        rel="stylesheet"
        href={`${
          getConfig().FRONTEND_URL
        }/styles/material-icons/material-icons-two-tones.css`}
      />
      <link
        rel="stylesheet"
        href={`${
          getConfig().FRONTEND_URL
        }/styles/material-icons/material-icons-round.css`}
      />
      <link
        rel="stylesheet"
        href={`${
          getConfig().FRONTEND_URL
        }/styles/material-icons/material-icons-sharp.css`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            name: 'Broker Bewertungen',
            alternateName: 'Broker-Bewertungen',
            url: getConfig().FRONTEND_URL,
          }),
        }}
      />
      {!noArticle && Boolean(author) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'Article',
              headline: title || '',
              author: [
                {
                  '@type': 'Person',
                  name: author.name,
                  url: author.link,
                },
              ],
            }),
          }}
        />
      )}
    </>
  );
}

Meta.defaultProps = {
  keywords: null,
  description: null,
  noIndex: false,
  noArticle: false,
};

Meta.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  author: PropTypes.object,
  url: PropTypes.string,
  noIndex: PropTypes.bool,
  noArticle: PropTypes.bool,
};

export default Meta;
