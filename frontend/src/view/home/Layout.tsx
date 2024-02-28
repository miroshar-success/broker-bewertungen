import { useEffect } from 'react';
import Advisors from 'src/view/home/sidebar/Advisors';
import Category from 'src/view/home/sidebar/Category';
import ComparableBrokers from 'src/view/home/sidebar/ComparableBrokers';
import Container from '@mui/material/Container';
import FeaturedBrokers from 'src/view/home/sidebar/FeaturedBrokers';
import ForexSchool from 'src/view/home/sidebar/ForexSchool';
import ForexStrategy from 'src/view/home/sidebar/ForexStrategy';
import Grid from '@mui/material/Grid';
import Meta from 'src/view/home/Meta';
import MostRead from 'src/view/home/sidebar/MostRead';
import PageLayout from 'src/mui/shared/Layouts/PageLayout';
import Promotion from 'src/view/home/sidebar/Promotion';
import PropTypes from 'prop-types';
import TopBrokers from 'src/view/home/sidebar/TopBrokers';

function Layout({
  title,
  keywords,
  description,
  record,
  children,
  noIndex = false,
  noArticle = false,
}) {
  return (
    <PageLayout fixedNavBar={false}>
      <Meta
        title={title}
        keywords={keywords}
        description={description}
        noIndex={noIndex}
        noArticle={noArticle}
      />
      <Container>
        <Grid spacing={2} container>
          <Grid xl={9} lg={8} md={12} xs={12} item>
            {children}
          </Grid>
          <Grid xl={3} lg={4} md={12} xs={12} item>
              <Grid spacing={2} container>
                <TopBrokers />
                {Boolean(record) && (
                  <ComparableBrokers record={record} />
                )}
                {Boolean(record) && (
                  <Advisors record={record} />
                )}
                <Category />
                <FeaturedBrokers />
                <MostRead />
                <ForexSchool />
                <ForexStrategy />
                <Promotion />
              </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  record: PropTypes.any,
  children: PropTypes.any,
  noIndex: PropTypes.bool,
  noArticle: PropTypes.bool,
};

export default Layout;
