import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function useAuthenticated() {
  const history = useHistory();
  // const token = useSelector(state => state.Auth.token);
  const currentUser = useSelector(state => state.Auth.currentUser);
  // const isLogin = token && currentUser;
  const isLogin = currentUser;
  
  useEffect(() => {
    if (!isLogin) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin])

  return isLogin;
}