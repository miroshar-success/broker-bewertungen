import invitation from 'src/modules/tenant/invitation/tenantInvitationReducers';
import list from 'src/modules/tenant/list/tenantListReducers';
import form from 'src/modules/tenant/form/tenantFormReducers';
import destroy from 'src/modules/tenant/destroy/tenantDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  invitation,
  list,
  form,
  destroy,
});
