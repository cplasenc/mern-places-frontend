import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Users from './pages/Users';
import NewPlace from './pages/NewPlace';
import UpdatePlace from './pages/UpdatePlace';
import MainNavigation from './components/MainNavigation/MainNavigation';
import UserPlaces from './pages/UserPlaces';
import { AuthContext } from './context/auth-context';
import Auth from './pages/Auth/Auth';

let logoutTimer;

const App = () => {

  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000*60*60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({
      userId: uid, token: 
      token, 
      expiration: tokenExpirationDate.toISOString() 
    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if(token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(
      storedData && 
      storedData.token && 
      new Date(storedData.expiration) > new Date()
      ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact> <Users /> </Route>
        <Route path='/:userId/places' exact> <UserPlaces /> </Route>
        <Route path='/places/new' exact> <NewPlace /> </Route>
        <Route path='/places/:placeId'> <UpdatePlace /> </Route>
        <Redirect to='/' />
      </Switch>

    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact> <Users /> </Route>
        <Route path='/:userId/places' exact> <UserPlaces /> </Route>
        <Route path='/auth'> <Auth /> </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}>
      <BrowserRouter>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;