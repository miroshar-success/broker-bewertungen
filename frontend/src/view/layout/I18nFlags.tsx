import { Tooltip } from '@mui/material';
import { getLanguages } from 'src/i18n';
import actions from 'src/modules/layout/layoutActions';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';

function I18nFlags(props) {
  const doChangeLanguage = (language) => {
    actions.doChangeLanguage(language);
  };

  return (
    <MDBox display="flex" justifyContent="center" gap={1}>
      {getLanguages().map((language) => (
        <Tooltip key={language.id} title={language.label}>
          <MDButton
            variant="text"
            onClick={() => doChangeLanguage(language.id)}
            size="small"
            iconOnly
          >
            <img alt={language.label} src={language.flag} />
          </MDButton>
        </Tooltip>
      ))}
    </MDBox>
  );
}

export default I18nFlags;
