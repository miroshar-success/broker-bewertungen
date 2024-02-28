import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';

function PageContent({ children, ...rest }) {
  return (
    <Card
      sx={{
        display: rest.display,
      }}
    >
      <MDBox px={5} py={3} {...rest}>
        {children}
      </MDBox>
    </Card>
  );
}

export default PageContent;
