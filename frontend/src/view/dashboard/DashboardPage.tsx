import { Grid } from '@mui/material';
import RecentComments from 'src/view/dashboard/RecentComments';
import RecentPosts from 'src/view/dashboard/RecentPosts';
import SitemapRefresh from 'src/view/dashboard/SitemapRefresh';

function DashboardPage() {
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <SitemapRefresh />
      </Grid>
      <Grid md={6} xs={12} item>
        <RecentComments />
      </Grid>
      <Grid md={6} xs={12} item>
        <RecentPosts />
      </Grid>
    </Grid>
  );
}

export default DashboardPage;
