import {
  Button,
  Card,
  CardActions,
  Icon,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import selectors from 'src/modules/plan/planSelectors';
import actions from 'src/modules/plan/planActions';
import { planCardStyles } from 'src/view/plan/styles/planCardStyles';
import authSelectors from 'src/modules/auth/authSelectors';
import Plans from 'src/security/plans';
import Tooltip from '@mui/material/Tooltip';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

const useStyles = makeStyles(planCardStyles as any);

export default function PlanCardPaid(props) {
  const dispatch = useDispatch();
  const { sidenavColor, darkMode } = selectMuiSettings();
  const { plan } = props;

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const loading = useSelector(selectors.selectLoading);

  const hasPermissionToEdit = useSelector(
    selectors.selectPermissionToEdit,
  );

  const isPlanUser = useSelector(
    selectors.selectIsPlanUser,
  );

  const isCurrentPlan = currentTenant.plan === plan;

  const buttonState = isCurrentPlan
    ? 'manage'
    : currentTenant.plan === Plans.values.free
    ? 'payment'
    : 'none';

  const doCheckout = () => {
    dispatch(actions.doCheckout(plan));
  };

  const doPortal = () => {
    dispatch(actions.doPortal());
  };

  const color = darkMode ? 'dark' : 'white';
  const badge = {
    color: sidenavColor,
    label: i18n(`plan.${plan}.label`),
  };
  const specifications = props.specifications || [];

  const renderSpecifications = specifications.map(
    ({ label, includes }) => (
      <MDBox
        key={label}
        display="flex"
        alignItems="center"
        p={1}
      >
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="1.5rem"
          height="1.5rem"
          mr={2}
          mt={-0.125}
        >
          <MDTypography
            variant="body1"
            color={color === 'white' ? 'text' : 'white'}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{includes ? 'done' : 'remove'}</Icon>
          </MDTypography>
        </MDBox>
        <MDTypography
          variant="body2"
          color={color === 'white' ? 'text' : 'white'}
          fontWeight="regular"
        >
          {label}
        </MDTypography>
      </MDBox>
    ),
  );

  return (
    <>
      <Card
        sx={{
          boxShadow: ({ boxShadows: { lg } }) =>
            props.shadow ? lg : 'none',
          height: '100%',
          display: 'flex',
        }}
      >
        <MDBox
          bgColor={color}
          variant={
            color === 'white' ? 'contained' : 'gradient'
          }
          borderRadius="xl"
        >
          <MDBox
            bgColor={badge.color}
            width="max-content"
            px={4}
            pt={0}
            pb={0.5}
            mx="auto"
            mt={-1.375}
            borderRadius="section"
            lineHeight={1}
          >
            <MDTypography
              variant="caption"
              textTransform="uppercase"
              fontWeight="medium"
              color={
                badge.color === 'light' ? 'dark' : 'white'
              }
            >
              {badge.label}
            </MDTypography>
          </MDBox>
          <MDBox pt={3} pb={2} px={2} textAlign="center">
            <MDBox my={1}>
              <MDTypography
                variant="h1"
                color={color === 'white' ? 'dark' : 'white'}
              >
                <MDTypography
                  display="inline"
                  component="small"
                  variant="h5"
                  color="inherit"
                  verticalAlign="top"
                >
                  {i18n(`plan.${plan}.unit`)}
                </MDTypography>
                {i18n(`plan.${plan}.price`)}
                <MDTypography
                  display="inline"
                  component="small"
                  variant="h5"
                  color="inherit"
                >
                  /{i18n('plan.pricingPeriod')}
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox pb={3} px={3}>
            {renderSpecifications}
            {isCurrentPlan &&
              currentTenant.planStatus ===
                'cancel_at_period_end' && (
                <MDTypography variant="p" fontSize="small">
                  {i18n('plan.cancelAtPeriodEnd')}
                </MDTypography>
              )}

            {isCurrentPlan &&
              currentTenant.planStatus === 'error' && (
                <MDTypography variant="p" fontSize="small">
                  {i18n('plan.somethingWrong')}
                </MDTypography>
              )}
            <MDBox mt={3} display="flex" alignItems="end">
              {buttonState === 'payment' && (
                <MDButton
                  fullWidth
                  color={sidenavColor}
                  variant="gradient"
                  disabled={
                    !hasPermissionToEdit ||
                    !isPlanUser ||
                    loading
                  }
                  onClick={doCheckout}
                >
                  {i18n('plan.subscribe')}&nbsp;
                  <Icon sx={{ fontWeight: 'bold' }}>
                    arrow_forward
                  </Icon>
                </MDButton>
              )}

              {buttonState === 'manage' && isPlanUser && (
                <MDButton
                  fullWidth
                  color={sidenavColor}
                  variant="gradient"
                  disabled={!hasPermissionToEdit || loading}
                  onClick={doPortal}
                >
                  {i18n('plan.manage')}&nbsp;
                  <Icon sx={{ fontWeight: 'bold' }}>
                    arrow_forward
                  </Icon>
                </MDButton>
              )}

              {buttonState === 'manage' && !isPlanUser && (
                <Tooltip title={i18n('plan.notPlanUser')}>
                  <span>
                    <MDButton
                      fullWidth
                      color={sidenavColor}
                      variant="gradient"
                      disabled={true}
                    >
                      {i18n('plan.manage')}
                    </MDButton>
                  </span>
                </Tooltip>
              )}
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </>
  );
}
