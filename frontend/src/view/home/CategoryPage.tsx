import { i18n } from 'src/i18n';
import AuthorView from 'src/view/shared/view/AuthorView';
import Breadcrumb from 'src/view/home/Breadcrumb';
import BrokerListTable from 'src/view/home/broker/BrokerListTable';
import DefaultCategoryDescription from 'src/view/home/DefaultCategoryDescription';
import HtmlView from 'src/view/shared/view/HtmlView';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import DashBorder from 'src/view/home/shared/DashBorder';

function CategoryPage({ category }) {
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
          items={[
            {
              name: `${category.name} Vergleich`,
              route: category.link,
            },
          ]}
        />
        <MDTypography variant="h2">
          {category.title}
        </MDTypography>
        {category.teaser ? (
          <HtmlView value={category.teaser} />
        ) : (
          <HtmlView
            value={i18n(
              'entities.category.placeholders.description',
              category.name,
            )}
          />
        )}
        <DashBorder my={2} pb={2} borderTop borderBottom>
          <MDTypography display="block" variant="h3" my={2}>
            {i18n('entities.home.top_brokers')}
          </MDTypography>
          <TopBrokersView brokers={category.topBrokers} />
        </DashBorder>
        <BrokerListTable category={category.id} />
        {category.description ? (
          <HtmlView value={category.description} />
        ) : (
          <DefaultCategoryDescription />
        )}
      </PageContent>
      <AuthorView value={category.author} />
    </MDBox>
  );
}

export default CategoryPage;
