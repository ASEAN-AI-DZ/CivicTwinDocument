import useBaseUrl from '@docusaurus/useBaseUrl';
import {useEffect} from 'react';
import {useHistory} from '@docusaurus/router';

export default function Home(): JSX.Element {
  const history = useHistory();
  const introUrl = useBaseUrl('/intro');

  useEffect(() => {
    history.replace(introUrl);
  }, [history, introUrl]);

  return null;
}
