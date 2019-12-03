import React, { useState } from 'react';
import logo from './logo.svg';
import { Row } from 'react-bootstrap';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Routes from '../../infrastructure/routes/routes';
import LoginPage from '../../slices/LogIn/LoginPage';
import { UserContext } from '../../infrastructure/contexts/UserContext';
import { getCookie, getJWTUser } from '../../infrastructure/login/sessions';
import {ToastContainer} from 'react-toastr';


function App(props) {
  let jwt = getCookie('jwt');
  var loggedInUser = null;
  if (jwt !== 'null') {
    loggedInUser = getJWTUser(jwt);
  }
  const [user, setUser] = useState(loggedInUser);

  let toastr;
  return (
      <Switch>
        <UserContext.Provider value={{user, setUser}}>
          <Route path='' component={Routes} />
        </UserContext.Provider>
      </Switch>
  );
}

export default App;
