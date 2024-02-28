import actions from 'src/modules/auth/authActions';

export default (store) => {
  store.dispatch(actions.doInit());
};
