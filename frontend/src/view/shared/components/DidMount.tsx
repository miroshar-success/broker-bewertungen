import { useEffect } from 'react';

function DidMount(props) {
  const { children, onMount } = props;
  useEffect(() => {
    onMount && onMount();
  }, []);
  return children;
}

export default DidMount;
