import React, {useState, useCallback} from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Users from './pages/Users';
import NewPlace from './pages/NewPlace';
import UpdatePlace from './pages/UpdatePlace';
import MainNavigation from './components/MainNavigation/MainNavigation';
import UserPlaces from './pages/UserPlaces';
import Auth from './pages/Auth/Auth';
import { AuthContext } from './context/auth-context';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Switch>
            <Route path='/' exact> <Users /> </Route>
            <Route path='/:userId/places' exact> <UserPlaces /> </Route>
            <Route path='/places/new' exact> <NewPlace /> </Route>
            <Route path='/places/:placeId'> <UpdatePlace /> </Route>
            <Route path='/auth'> <Auth /> </Route>
            <Redirect to='/' />
          </Switch>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;