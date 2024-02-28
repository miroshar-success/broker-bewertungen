import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBox from 'src/mui/components/MDBox';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';

function PromotionView(props) {
  const renderView = () => {
    const { record } = props;
    return (
      <>
        <Grid spacing={2} container>
          <Grid item md={12} xs={12}>
            <TextViewItem
              label={i18n('entities.promotion.fields.name')}
              value={record.name}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextViewItem
              label={i18n('entities.promotion.fields.link')}
              value={record.link}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <MDBox pt={7}>
              <LogoViewItem
                label={i18n(
                  'entities.promotion.fields.uploadfile',
                )}
                value={record.promotion_image}
              />
            </MDBox>
          </Grid>
          <Grid item md={6} xs={12}>
            <CheckboxViewItem
              label={i18n(
                'entities.promotion.fields.activated',
              )}
              checked={record.activated}
            />
          </Grid>
        </Grid>
      </>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default PromotionView;
