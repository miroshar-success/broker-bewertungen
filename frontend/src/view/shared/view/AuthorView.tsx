import { Avatar } from '@mui/material';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import MDBox from 'src/mui/components/MDBox';
import MaterialLink from '@mui/material/Link';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';

function AuthorView(props) {
  const { value } = props;
  if (!value) {
    return null;
  }
  return (
    <PageContent>
      <Helmet>
        <link href={value.link} rel="author" />
      </Helmet>
      <MDBox
        display="flex"
        sx={{
          '& > * + *': {
            ml: 3,
          },
        }}
      >
        {value.author_image && value.author_image[0] && (
          <Avatar
            alt={value.name}
            src={value.author_image[0]?.downloadUrl}
            sx={{ width: 96, height: 96 }}
          />
        )}
        <MDBox>
          <MDTypography variant="body1" fontWeight="bold">
            {`Über ${value.name}`}
          </MDTypography>
          <MDTypography
            variant="body2"
            color="text"
            fontWeight="regular"
          >
            {value.description}
          </MDTypography>
          <MDTypography
            variant="body2"
            color="text"
            fontWeight="bold"
          >
            <MaterialLink
              href={value.link}
              target="_blank"
              underline="hover"
            >
              {`Mehr über ${value.name}`}
            </MaterialLink>
          </MDTypography>
        </MDBox>
      </MDBox>
    </PageContent>
  );
}

AuthorView.propTypes = {
  value: PropTypes.object,
};

export default AuthorView;
