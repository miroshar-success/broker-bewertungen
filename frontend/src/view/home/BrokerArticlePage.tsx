import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import HtmlView from 'src/view/shared/view/HtmlView';
import PageContent from 'src/view/shared/view/PageContent';
import AuthorView from 'src/view/shared/view/AuthorView';
import {useState} from 'react'
import Breadcrumb from 'src/view/home/Breadcrumb';

function BrokerArticlePage({ brokerArticle }) {
  const [loaded, setLoaded] = useState(false);
  return (
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
           setLoaded={setLoaded}
            items={[
              {
                name: brokerArticle.broker.name,
                route: `/erfahrungsberichte/${brokerArticle.broker.name_normalized}`,
              },
              {
                name: brokerArticle.name,
                route: `/${brokerArticle.broker.name_normalized}/${brokerArticle.name_normalized}`,
              },
            ]}
          />
        {loaded && <HtmlView value={brokerArticle.content} />}
      </PageContent>
      {loaded && <AuthorView value={brokerArticle.author} />}
      {loaded && <PageContent
        display={{
          xs: 'none',
          lg: 'block',
        }}
      >
        <MDTypography display="block" variant="h3" mb={2}>
          {i18n('entities.home.top_brokers')}
        </MDTypography>
        <TopBrokersView />
      </PageContent>}
    </MDBox>
  );
}

export default BrokerArticlePage;
