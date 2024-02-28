import { i18n } from '../../i18n';
import { removeAllIframeTags } from '../../utils';
import Box from '@mui/material/Box';
import Breadcrumb from '../Breadcrumb';
import HtmlView from '../shared/HtmlView';
import Layout from '../Layout';
import MaterialLink from '@mui/material/Link';
import React from 'react';
import Typography from '@mui/material/Typography';

const BlogListPage = ({ records, ...props }) => {
  return (
    <Layout title="Broker-Bewertungen Blog" url={props.url}>
      <Box display="none">
        <Breadcrumb
          items={[
            {
              name: i18n('entities.blog.title'),
              route: '/blog',
            },
          ]}
          {...props}
        />
      </Box>
      <Typography variant="h1" pb={5}>
        {i18n('entities.blog.title')}
      </Typography>
      <>
        <Box display="flex" flexDirection="column" gap={5}>
          {records.map((record) => (
            <Box
              key={record.id}
              display="flex"
              justifyContent="flex-start"
              gap={5}
            >
              {record.blog_image[0]?.downloadUrl && (
                <img
                  src={record.blog_image[0].downloadUrl}
                  alt="blog-item-image"
                  width="150px"
                />
              )}

              <Box color="text">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                >
                  <MaterialLink
                    href={`/blog/${record.name_normalized}`}
                    underline="hover"
                  >
                    {record.name}
                  </MaterialLink>
                </Typography>
                <HtmlView
                  value={removeAllIframeTags(record.teaser)}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </>
    </Layout>
  );
};

export default BlogListPage;
