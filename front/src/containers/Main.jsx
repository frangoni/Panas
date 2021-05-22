import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { fetchMe } from '../../store/reducer/user';
import Logout from '../components/Logout';
import notAuthorized from '../components/notAuthorized';
import Checkin from './CheckinContainer';
import Dashboard from './DashboardContainer';
import Login from './LoginContainer';
import Station from './StationContainer';

export default function Main() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <>
      <Switch>
        <Route exact path='/login' render={({ history }) => <Login history={history} />} />
        <Route exact path='/checkin' component={Checkin} /* {user && user.rol == 'checkin' ? Checkin : notAuthorized} */ />
        <Route exact path='/admin' component={Dashboard} /* {user && user.rol == 'admin' ? Dashboard : notAuthorized} */ />
        <Route exact path='/:station' component={Station} /* {user && user.rol != ['checkin', 'admin'] ? Station : notAuthorized} */ />
        <Redirect from='/*' to={user && user.nombre ? `/${user.rol}` : '/login'} />
      </Switch>
      <Logout />
    </>
  );
}
