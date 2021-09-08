import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { fetchMe } from '../../store/reducer/user';
import Loading from '../components/Loading';
import Logout from '../components/Logout';
import notAuthorized from '../components/notAuthorized';
import Checkin from './CheckinContainer';
import Dashboard from './DashboardContainer';
import Login from './LoginContainer';
import Station from './StationContainer';
import Payment from './PaymentContainer';

export default function Main() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchMe()).then(({ payload }) => {
      setIsLoading(false);
      payload.rol ? null : history.push('/login');
    });
  }, []);

  return !isLoading ? (
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
          path='/caja'
          component={user && user.rol == 'caja' ? Payment : notAuthorized}
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
  ) : (
    <Loading />
  );
}
