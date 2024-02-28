import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import affiliateLinkHomeActions from 'src/modules/affiliateLink/home/affiliateLinkHomeActions';
import Spinner from 'src/view/shared/Spinner';

function Redirect() {
  const dispatch = useDispatch();

  const match = useRouteMatch();

  useEffect(() => {
    dispatch(
      affiliateLinkHomeActions.doRedirect(match.url),
    );
  }, []);

  return <Spinner />;
}

export default Redirect;
