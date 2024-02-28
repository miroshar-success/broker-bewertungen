import { AppBar, Tabs, Tab } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';

interface BrokerTabsProps {
  orientation?: 'horizontal' | 'vertical';
  labels?: any[];
  value?: number;
  onChange?: any;
  broker?: number;
}

function BrokerTabs(props: BrokerTabsProps) {
  const { orientation, value, onChange, labels, broker } =
    props;
  const tabLabels = [
    ...(labels || [
      'broker',
      'overview',
      'characteristics',
      'platform',
      'markets',
      'spreads',
      'service',
      'test',
      'old',
    ]),
    broker && 'articles',
  ].filter(Boolean);
  return (
    <MDBox width="100%" overflow="auto">
      <MDBox
        minWidth={{
          xs: 'max-content',
          lg: 'unset',
        }}
        width="100%"
      >
        <AppBar position="static">
          <Tabs
            orientation={orientation}
            value={value}
            onChange={onChange}
          >
            {tabLabels.map((tabLabel) =>
              Boolean(tabLabel.raw) ? (
                <Tab
                  key={tabLabel}
                  label={tabLabel.label}
                />
              ) : (
                <Tab
                  key={tabLabel}
                  label={i18n(
                    `entities.broker.tabs.${tabLabel}`,
                  )}
                />
              ),
            )}
          </Tabs>
        </AppBar>
      </MDBox>
    </MDBox>
  );
}

BrokerTabs.defaultProps = {
  orientation: 'horizontal',
};

export default BrokerTabs;
