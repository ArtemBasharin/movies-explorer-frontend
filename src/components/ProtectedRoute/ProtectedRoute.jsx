import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function ProtectedRoute({ component: Component, ...props }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Route>
      {() => Boolean(currentUser) ? <Component {...props} /> : <Redirect to='/' />}
    </Route>
  )
}
