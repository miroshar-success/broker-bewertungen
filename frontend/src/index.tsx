import './assets/scrollbar.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthToken } from './modules/auth/authToken';
import { BrowserRouter } from 'react-router-dom';
import { i18n, init as i18nInit } from 'src/i18n';
import AuthService from './modules/auth/authService';
import GlobalDndContext from 'src/dnd-context';
import ReactDOM from 'react-dom';
import TenantService from './modules/tenant/tenantService';
// document.getElementById('root').style.visibility = 'hidden';
// document.getElementById('loading').style.display = 'block';
// window.addEventListener('load', function() {
//   document.getElementById('root').style.visibility = 'visible';
//   document.getElementById('loading').style.display = 'none';
// });
(async function () {
  const isSocialOnboardRequested =
    AuthService.isSocialOnboardRequested();
  AuthToken.applyFromLocationUrlIfExists();
  await TenantService.fetchAndApply();
  if (isSocialOnboardRequested) {
    await AuthService.socialOnboard();
  }
  await i18nInit();

  const App = require('./App').default;
  document.title = i18n('app.title');
  ReactDOM.render(
    <GlobalDndContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalDndContext>,
    document.getElementById('root'),
  );
})();
