import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch } from 'react-redux';
import Breadcrumb from 'src/view/home/Breadcrumb';
import dColors from 'src/mui/assets/theme-dark/base/colors';
import HtmlView from 'src/view/shared/view/HtmlView';
import lColors from 'src/mui/assets/theme/base/colors';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';
import pageHomeActions from 'src/modules/page/home/pageHomeActions';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import AuthorView from 'src/view/shared/view/AuthorView';

function NormalPage({ page }) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const colors = darkMode ? dColors : lColors;
  const dispatch = useDispatch();

  const handleDownloadPagePDF = () => {
    if (page?.navigation || page.link !== '') {
      dispatch(
        pageHomeActions.doDownload(
          `${page.navigation?.link || page.link}.pdf`,
        ),
      );
    }
  };

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
        <Breadcrumb />
        <HtmlView value={page.body} />
        {Boolean(page.related_links.length) && (
          <MDBox
            py={2}
            my={2}
            borderTop={`1px dashed ${colors.inputBorderColor}`}
            borderBottom={`1px dashed ${colors.inputBorderColor}`}
          >
            <MDTypography variant="h3">
              {page.navigation.type === 'FOREX_STRATEGY'
                ? 'Weitere Forex Strategien'
                : page.navigation.type === 'DOWNLOADS'
                ? 'Weitere MetaTrader Indikatoren'
                : 'Weiterführende Links'}
            </MDTypography>
            {page.related_links.map(
              ({ name, url }, idx) => (
                <MDTypography
                  key={idx}
                  variant="body2"
                  color={sidenavColor}
                  fontWeight="regular"
                >
                  <MaterialLink href={url}>
                    {name}
                  </MaterialLink>
                </MDTypography>
              ),
            )}
          </MDBox>
        )}
        {Boolean(page.page_warning) && (
          <>
            <MDTypography variant="h3">
              Warnung
            </MDTypography>
            <HtmlView value={page.page_warning.body} />
          </>
        )}
        {Boolean(page.pdf) && (
          <MDTypography
            variant="body2"
            color={sidenavColor}
            fontWeight="regular"
            mt={2}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <img src="/images/files/pdf.png" />
            <MaterialLink
              onClick={handleDownloadPagePDF}
              underline="hover"
              style={{ cursor: 'pointer' }}
            >
              {`${page.name} als PDF speichern`}
            </MaterialLink>
          </MDTypography>
        )}
      </PageContent>
      <AuthorView value={page.author} />
      <PageContent
        display={{
          xs: 'none',
          lg: 'block',
        }}
      >
        <MDTypography display="block" variant="h3" mb={2}>
          {i18n('entities.home.top_brokers')}
        </MDTypography>
        <TopBrokersView />
      </PageContent>
    </MDBox>
  );
}

export default NormalPage;
