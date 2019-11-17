import React, { useState } from 'react';
import logo from './logo.svg';
import { Row } from 'react-bootstrap';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Routes from '../../infrastructure/routes/routes';
import LoginPage from '../../slices/LogIn/LoginPage';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { getCookie, getJWTUser } from '../../infrastructure/login/sessions';


function App(props) {
  const jwt = getCookie('jwt');
  console.log(jwt);
  var loggedInUser = null;
  if (jwt !== 'null') {
    console.log(jwt)
    loggedInUser = getJWTUser(jwt);
  }
  const [user, setUser] = useState(loggedInUser);
  return (
      <Switch>
        <UserContext.Provider value={{user, setUser}}>
          <Route path='/' component={Routes} />
        </UserContext.Provider>
      </Switch>
  );
}

export default App;
