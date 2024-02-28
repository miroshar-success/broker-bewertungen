import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Plans from 'src/security/plans';
import PlanCardFree from 'src/view/plan/PlanCardFree';
import PlanCardPaid from 'src/view/plan/PlanCardPaid';

function PlanPage(props) {
  return (
    <>
      <Card>
        <MDBox pt={3} px={3}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {i18n('plan.title')}
            </MDTypography>
          </MDBox>
        </MDBox>
        <Grid container spacing={2} p={3}>
          <Grid item xs={12} md={6} lg={4}>
            <PlanCardFree
              shadow="lg"
              specifications={[
                { label: '2 team members', includes: true },
                {
                  label: '20GB Cloud storage',
                  includes: true,
                },
                {
                  label: 'Integration help',
                  includes: false,
                },
                { label: 'Sketch Files', includes: false },
                { label: 'API Access', includes: false },
                {
                  label: 'Complete documentation',
                  includes: false,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <PlanCardPaid
              darkMode
              shadow="lg"
              plan={Plans.values.growth}
              specifications={[
                {
                  label: '10 team members',
                  includes: true,
                },
                {
                  label: '40GB Cloud storage',
                  includes: true,
                },
                {
                  label: 'Integration help',
                  includes: true,
                },
                { label: 'Sketch Files', includes: true },
                { label: 'API Access', includes: false },
                {
                  label: 'Complete documentation',
                  includes: false,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <PlanCardPaid
              shadow="lg"
              plan={Plans.values.enterprise}
              specifications={[
                {
                  label: 'Unlimited team members',
                  includes: true,
                },
                {
                  label: '100GB Cloud storage',
                  includes: true,
                },
                {
                  label: 'Integration help',
                  includes: true,
                },
                { label: 'Sketch Files', includes: true },
                { label: 'API Access', includes: true },
                {
                  label: 'Complete documentation',
                  includes: true,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default PlanPage;
