import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { fetchMe } from '../../store/reducer/user';
import Logout from '../components/Logout';
import notAuthorized from '../components/notAuthorized';
import Checkin from './CheckinContainer';
import Dashboard from './DashboardContainer';
import Login from './LoginContainer';
import Station from './StationContainer';

export default function Main() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchMe());
    /*     user && user.rol ? null : history.push('/login');
     */
  }, []);

  return (
    <>
      <Switch>
        <Route exact path='/login' render={({ history }) => <Login history={history} />} />
        <Route
          exact
          path='/checkin'
          component={user && user.rol == 'checkin' ? Checkin : notAuthorized}
        />
        <Route
          exact
          path='/admin'
          component={user && user.rol == 'admin' ? Dashboard : notAuthorized}
        />
        <Route
          exact
          path='/:station'
          component={user && !['checkin', 'admin'].includes(user.rol) ? Station : notAuthorized}
        />
        <Redirect from='/*' to={user && user.nombre ? `/${user.rol}` : '/login'} />
      </Switch>
      <Logout />
    </>
  );
}
